import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { BasePage } from '../base-page';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ClassroomService } from './classroom.service';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { TableColumn } from '../../components/table/table-column';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
  providers: [ClassroomService]
})
export class ClassroomComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();

  queryType = 'info';

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  columns: TableColumn[] = [];

  constructor(protected snackBar: MdSnackBar,
    private route: ActivatedRoute,
    private classroomInfoService: ClassroomService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe((params: Params) => this.queryType = params && params['queryType'] || '');

    this.columns = [
      { key: 'name', name: '班级', sortable: true, cellTemplate: this.previewImpl },
      { key: 'code', name: '班级号', sortable: true },
      { key: 'createBy', name: '创建人姓名（电话）', sortable: true, numeric: true },
      { key: 'createTime', name: '创建时间', sortable: true, numeric: true },
      { key: 'members', name: '班级成员', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'messages', name: '班级消息', sortable: true, numeric: true, cellTemplate: this.viewImpl }
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
    let method = 'query' + this.queryType.slice(0, 1).toUpperCase() + this.queryType.slice(1)
    return this.classroomInfoService[method](Object.assign({
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
      result = this.classroomInfoService.queryInfo().$observable;
      title = '成员列表';
    } else if (type === 'messages') {
      result = this.classroomInfoService.queryInfo().$observable;
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
