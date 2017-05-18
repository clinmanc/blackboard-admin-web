import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { TableColumn } from '../../../components/table/table-column';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';
import { SysPermissionService } from './sys-permission.service';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-sys-permission',
  templateUrl: './sys-permission.component.html',
  styleUrls: ['./sys-permission.component.scss'],
  providers: [SysPermissionService]
})
export class SysPermissionComponent extends BasePage implements OnInit {

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  selected = [];
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
    this.toolbar = { persistentButtons: [{ name: '添加' }],  iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '删除', icon: 'delete' }], menus: [{ name: '清空', icon: 'delete_sweep'}]};

    this.subscribeQuery(this.load());
  }

  load(pageable = this.pageable): Observable<Page<any>> {
    this.pageable = pageable;

    const observable = this.sysPermissionService.query(this.pageable).$observable;

    observable.subscribe((page) => this.page = page);

    return observable;
  }

  reload(): Observable<Page<any>>{
    return this.subscribeQuery(this.load());
  }

  openRemoveAllConfirmDialog(event?: any) {
    let dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '清空后不可恢复，确认清空吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        // alert(result);
      }
    });
  }

  select(selected){
    this.selected = selected;
  }

  add(){

  }
  remove(row){
    let dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.sysPermissionService.remove({ permissionId: row.permissionId }).$observable
          .subscribe(() => this.reload());
      }
    });
  }
  removeAll(){

  }
}
