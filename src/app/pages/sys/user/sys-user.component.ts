import { Component, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SysUserService } from './sys-user.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { SysUser } from '../../../shared/sys-user';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { TableColumn } from '../../../components/table/table-column';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';
import { SysUserCreateDialogComponent } from './create/sys-user-create-dialog.component';

@Component({
  selector: 'app-sys-user',
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.scss']
})
export class SysUserComponent extends BasePage implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  columns: TableColumn[] = [];
  page = new Page<SysUser>();
  pageable = new Pageable();
  selected: SysUser[] = [];
  toolbar = {};

  @ViewChild('chipListImpl') chipListImpl: TemplateRef<any>;
  @ViewChild('editImpl') editImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private dialog: MdDialog,
    private sysUserService: SysUserService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'username', name: '用户', sortable: true },
      { key: 'roles', name: '角色', sortable: true, cellTemplate: this.chipListImpl }
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
    this.load();
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.sysUserService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  select(selected) {
    this.selected = selected;
  }

  add() {
    const dialogRef: MdDialogRef<SysUserCreateDialogComponent> = this.dialog.open(SysUserCreateDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
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
        this.sysUserService.removeInBatch({
          method: 'DELETE',
          data: this.selected.map(user => user.userId)
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
        this.sysUserService.removeAll().$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }
}
