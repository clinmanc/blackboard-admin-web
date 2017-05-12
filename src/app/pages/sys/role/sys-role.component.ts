import { Component, OnInit } from '@angular/core';
import { SysRoleService } from './sys-role.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Column } from '../../../components/table/table.component';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';

@Component({
  selector: 'app-sys-role',
  templateUrl: './sys-role.component.html',
  styleUrls: ['./sys-role.component.scss'],
  providers: [SysRoleService]
})
export class SysRoleComponent extends BasePage implements OnInit {
  columns: Column[] = [
    { key: 'name', name: '角色', sortable: true },
    { key: 'code', name: '权限码', sortable: true }
  ];
  page = new Page<any>();
  pageable = new Pageable();

  constructor(private sysRoleService: SysRoleService, protected snackBar: MdSnackBar, private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage(pageable: Pageable = new Pageable) {
    this.pageable = pageable;
    this.startQuery();
    this.sysRoleService.query(pageable).$observable
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
