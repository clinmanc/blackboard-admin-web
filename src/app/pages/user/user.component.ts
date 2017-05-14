import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { UserService } from './user.service';
import { TableColumn } from '../../components/table/table-column';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})
export class UserComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(protected snackBar: MdSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();

    this.columns = [
      { key: 'name', name: '姓名（电话）', sortable: true, cellTemplate: this.previewImpl },
      { key: 'status', name: '状态', sortable: true },
      { key: 'role', name: '角色', sortable: true },
      { key: 'school', name: '学校', sortable: true },
      { key: 'messages', name: '用户消息', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'createTime', name: '注册时间', sortable: true, numeric: true }
    ];
  }

  buildForm(): void {

    const dateTo = new Date();
    const yearTo = dateTo.getFullYear();
    const monthTo = dateTo.getMonth() + 1 < 10 ? '0' + (dateTo.getMonth() + 1) : dateTo.getMonth();
    const dayTo = dateTo.getDate() < 10 ? '0' + dateTo.getDate() : dateTo.getDate();

    const dateFrom = new Date(dateTo.getTime() - 7 * 24 * 3600 * 1000);
    const yearFrom = dateFrom.getFullYear();
    const monthFrom = dateFrom.getMonth() + 1 < 10 ? '0' + (dateFrom.getMonth() + 1) : dateFrom.getMonth();
    const dayFrom = dateFrom.getDate() < 10 ? '0' + dateFrom.getDate() : dateFrom.getDate();

    const from = `${yearFrom}-${monthFrom}-${dayFrom}`;
    const to = `${yearTo}-${monthTo}-${dayTo}`;

    this.searchForm = this.formBuilder.group({
      from: [from],
      to: [to],
      keyword: ['']
    });
  }

  search() {
    const formModel = this.searchForm.value;

    this.startQuery();
    return this.userService.query(Object.assign({
      from: formModel.from,
      to: formModel.to,
      keyword: formModel.keyword
    }, this.pageable)).$observable
      .subscribe((page) => {
        this.page = page;
        this.completeQuery();
      }, this.handleError.bind(this));
  }

  openViewDialog(event) {
    const type = event.column.key;
    const formModel = this.searchForm.value;

    let result: Observable<any>;
    let title;
    if (type === 'members') {
      result = this.userService.query().$observable;
      title = '成员列表';
    } else if (type === 'messages') {
      result = this.userService.query().$observable;
      title = '消息列表';
    } else {
      return;
    }

    let dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.startQuery();

    result.map((items) => {
      let result = [];
      items.forEach((item) => result.push([
        item.inviteeId || item.classroomId || item.userId,
        item.inviteeName || (item.classroomName && `(${item.membersCount}人) ${item.classroomName}`) || item.userName
      ]));
      return result
    }).subscribe((items) => {
      dialogRef.componentInstance.completeQuery();
      dialogRef.componentInstance.items = items;
    }, () => {
      dialogRef.componentInstance.completeQuery();
      this.handleError.bind(this);
    })
  }

  switchPage(pageable: Pageable) {
    this.pageable = pageable;
    this.search();
  }
}
