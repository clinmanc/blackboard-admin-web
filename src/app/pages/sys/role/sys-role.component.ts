import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { TableColumn } from '../../../components/table/table-column';
import { SysRole } from '../../../shared/sys-role';
import { SysRoleService } from './sys-role.service';
import { SysRoleCreateComponent } from './create/sys-role-create.component';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';

@Component({
  selector: 'app-sys-role',
  templateUrl: './sys-role.component.html',
  styleUrls: ['./sys-role.component.scss'],
  providers: [SysRoleService]
})
export class SysRoleComponent extends BasePage implements OnInit {
  page = new Page<SysRole>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  selected: SysRole[] = [];
  toolbar = {};

  @ViewChild('chipListImpl') chipListImpl: TemplateRef<any>;

  constructor(protected snackBar: MdSnackBar, private sysRoleService: SysRoleService, private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '角色' },
      { key: 'code', name: '权限码' },
      { key: 'permissions', name: '权限', cellTemplate: this.chipListImpl }
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

    this.withHandler(this.sysRoleService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  select(selected) {
    this.selected = selected;
  }

  add() {
    const dialogRef: MdDialogRef<SysRoleCreateComponent> = this.dialog.open(SysRoleCreateComponent);
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
        this.sysRoleService.removeInBatch({
          method: 'DELETE',
          data: this.selected.map(role => role.roleId)
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
        this.sysRoleService.removeAll().$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }
}
