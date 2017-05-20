import { Component, OnInit } from '@angular/core';
import { SysRoleService } from './sys-role.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { TableColumn } from '../../../components/table/table-column';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sys-role',
  templateUrl: './sys-role.component.html',
  styleUrls: ['./sys-role.component.scss'],
  providers: [SysRoleService]
})
export class SysRoleComponent extends BasePage implements OnInit {
  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  selected = [];
  toolbar = {};

  constructor(protected snackBar: MdSnackBar, private sysRoleService: SysRoleService, private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '角色', sortable: true },
      { key: 'code', name: '权限码', sortable: true }
    ];
    this.toolbar = {
      persistentButtons: [{ name: '添加' }], iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '删除', icon: 'delete' }], menus: [{ name: '清空', icon: 'delete_sweep' }]
    };

    this.subscribeQuery(this.load());
  }

  load(pageable = this.pageable): Observable<Page<any>> {
    this.pageable = pageable;

    const observable = this.sysRoleService.query(this.pageable).$observable;

    observable.subscribe((page) => this.page = page);

    return observable;
  }

  reload(): Observable<Page<any>> {
    return this.subscribeQuery(this.load());
  }

  openConfirmDialog(event?: any) {
    let dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        alert(result);
      }
    });
  }

  select(selected) {
    this.selected = selected;
  }

  add() {

  }

  remove() {

  }
  removeAll() {

  }
}
