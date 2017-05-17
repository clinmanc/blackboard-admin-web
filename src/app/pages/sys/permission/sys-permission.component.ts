import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { TableColumn } from '../../../components/table/table-column';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';
import { SysPermissionService } from './sys-permission.service';

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

    this.loadPage();
  }

  loadPage(pageable = this.pageable) {
    this.startQuery();
    this.sysPermissionService.query(this.pageable).$observable
      .subscribe((page) => {
        this.completeQuery();
        this.page = page;
      }, this.handleError.bind(this));
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
}
