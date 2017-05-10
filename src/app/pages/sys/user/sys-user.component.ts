import { Component, HostBinding, OnInit } from '@angular/core';
import { SysUserService } from './sys-user.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { SysUser } from './sys-user';
import { Page } from '../../../components/page';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../components/pageable';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.scss'],
})
export class SysUserComponent extends BasePage implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  pageable: Pageable;
  page: Page<SysUser>;

  settings = {
    columns: [
      { key: 'username', name: '用户', sortable: true },
      { key: 'role', name: '角色', sortable: true },
      { name: '操作' }
    ]
  };

  selected = [];

  constructor(private sysUserService: SysUserService, protected snackBar: MdSnackBar,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.loadPage(new Pageable);
  }

  loadPage(pageable: Pageable = new Pageable()) {
    this.pageable = pageable;
    this.startQuery();
    this.sysUserService.listAll(pageable)
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
        this.sysUserService.delete(options.userId).subscribe(
          () => this.loadPage(),
          (err) => this.handleError.bind(this)
        );
      }
    });
  }

  deleteOne() {

  }

  deleteAll() {

  }
}
