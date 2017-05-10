import { Component, OnDestroy, OnInit } from '@angular/core';
import { SysRoleService } from './sys-role.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Column } from '../../../components/table/table.component';
import { Pageable } from '../../../components/pageable';
import { Page } from '../../../components/page';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ViewComponent } from '../../../components/table/view.component';

@Component({
  selector: 'app-sys-role',
  templateUrl: './sys-role.component.html',
  styleUrls: ['./sys-role.component.scss'],
  providers: [SysRoleService]
})
export class SysRoleComponent extends BasePage implements OnInit, OnDestroy {
  viewDetailSubject: Subject<any> = new Subject();
  viewDetailObservable: Observable<any> = this.viewDetailSubject.asObservable();
  viewDetailSubscription: Subscription;

  columns: Column[] = [
    {
      key: 'name', name: '角色', sortable: true, renderComponent: ViewComponent, renderSubject: this.viewDetailSubject
    },
    { key: 'code', name: '权限码', sortable: true }
  ];
  page: Page<any> = new Page();
  pageable: Pageable = new Pageable();

  selected = [];

  constructor(private sysRoleService: SysRoleService, protected snackBar: MdSnackBar, private dialog: MdDialog) {
    super(snackBar);
    this.viewDetailSubscription = this.viewDetailObservable.subscribe((value) => {
      this.openConfirmDialog(value);
    });
  }

  ngOnInit() {
    this.loadPage();
  }

  ngOnDestroy() {
    if (this.viewDetailSubscription) {
      this.viewDetailSubscription.unsubscribe();
    }
  }

  loadPage(pageable: Pageable = new Pageable) {
    this.pageable = pageable;
    this.startQuery();
    this.sysRoleService.listAll(pageable)
      .subscribe((page) => {
        this.completeQuery();
        this.page = page;
      }, this.handleError.bind(this));
  }

  openConfirmDialog(value?: any) {
    let dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？' + value;
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        alert(result);
      }
    });
  }
}
