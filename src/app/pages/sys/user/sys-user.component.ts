import { Component, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SysUserService } from './sys-user.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { SysUser } from '../../../shared/sys-user';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { TableColumn } from '../../../components/table/table-column';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';

@Component({
  selector: 'app-sys-user',
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.scss'],
})
export class SysUserComponent extends BasePage implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  columns: TableColumn[] = [];
  page = new Page<SysUser>();
  pageable = new Pageable();

  @ViewChild('chipListImpl') chipListImpl: TemplateRef<any>;

  constructor(private sysUserService: SysUserService, protected snackBar: MdSnackBar,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'username', name: '用户', sortable: true },
      { key: 'roles', name: '角色', sortable: true, cellTemplate: this.chipListImpl }
    ];

    this.loadPage();
  }

  loadPage(pageable: Pageable = this.pageable) {
    this.pageable = pageable;
    this.startQuery();
    this.sysUserService.query(pageable).$observable
      .subscribe((page) => {
        this.completeQuery();
        this.page = page;
      }, this.handleError.bind(this));
  }

  openConfirmDialog(action: string = '', options: any = {}) {
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.sysUserService.remove({ userId: options.userId }).$observable
          .subscribe(
          () => this.loadPage(),
          (err) => this.handleError.bind(this)
          );
      }
    });
  }
}
