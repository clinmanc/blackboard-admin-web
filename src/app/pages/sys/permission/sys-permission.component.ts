import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { TableColumn } from '../../../components/table/table-column';
import { SysPermissionService } from './sys-permission.service';
import { SysPermissionCreateDialogComponent } from './create/sys-permission-create-dialog.component';
import { SysPermission } from '../../../shared/sys-permission';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';
import { SysPermissionUpdateDialogComponent } from './update/sys-permission-update-dialog.component';

@Component({
  selector: 'app-sys-permission',
  templateUrl: './sys-permission.component.html',
  styleUrls: ['./sys-permission.component.scss'],
  providers: [SysPermissionService]
})
export class SysPermissionComponent extends BasePage implements OnInit {

  columns: TableColumn[] = [];
  page = new Page<SysPermission>();
  pageable = new Pageable();
  selected: SysPermission[] = [];
  toolbar = {};

  @ViewChild('editImpl') editImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private dialog: MdDialog,
    private sysPermissionService: SysPermissionService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '权限' },
      { key: 'description', name: '描述' },
      { key: 'url', name: '地址' },
      { name: '操作', numeric: true, cellTemplate: this.editImpl }
    ];
    this.toolbar = {
      persistentButtons: [{ name: '添加', action: this.add.bind(this) }],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '删除', icon: 'delete', action: this.remove.bind(this) }],
      menus: [{ name: '清空', icon: 'delete_sweep', action: this.removeAll.bind(this) }]
    };

    this.search();
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.sysPermissionService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  select(selected) {
    this.selected = selected;
  }

  add() {
    const dialogRef: MdDialogRef<SysPermissionCreateDialogComponent> = this.dialog.open(SysPermissionCreateDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.reload();
      }
    });
  }

  edit(permission: SysPermission) {
    const dialogRef = this.dialog.open(SysPermissionUpdateDialogComponent);
    dialogRef.componentInstance.permission = permission;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this.reload();
      }
    });
  }

  remove() {
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.sysPermissionService.removeInBatch({
          method: 'DELETE',
          data: this.selected.map(permission => permission.permissionId)
        }).$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }

  removeAll() {
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '清空后不可恢复，确认清空吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.sysPermissionService.removeAll().$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }
}
