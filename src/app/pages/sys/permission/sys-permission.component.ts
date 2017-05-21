import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { TableColumn } from '../../../components/table/table-column';
import { SysPermissionService } from './sys-permission.service';
import { SysPermissionCreateComponent } from './create/sys-permission-create.component';
import { SysPermission } from '../../../shared/sys-permission';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';

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

  constructor(
    snackBar: MdSnackBar,
    private dialog: MdDialog,
    private sysPermissionService: SysPermissionService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '权限', sortable: true },
      { key: 'description', name: '描述', sortable: true },
      { key: 'url', name: '地址', sortable: true }
    ];
    this.toolbar = {
      persistentButtons: [{ name: '添加', action: this.add.bind(this) }],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '删除', icon: 'delete', action: this.remove.bind(this) }],
      menus: [{ name: '清空', icon: 'delete_sweep', action: this.removeAll.bind(this) }]
    };

    this.subscribeQuery(this.load());
  }

  load(pageable = this.pageable): Observable<Page<SysPermission>> {
    this.pageable = pageable;

    const observable = this.sysPermissionService.query(this.pageable).$observable;

    observable.subscribe((page) => this.page = page);

    return observable;
  }

  reload(): Observable<Page<SysPermission>> {
    return this.subscribeQuery(this.load());
  }

  select(selected) {
    this.selected = selected;
  }

  add() {
    const dialogRef: MdDialogRef<SysPermissionCreateComponent> = this.dialog.open(SysPermissionCreateComponent);
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
