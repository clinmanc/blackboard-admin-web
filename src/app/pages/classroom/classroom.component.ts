import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { BasePage } from '../base-page';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ClassroomService } from './classroom.service';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { TableColumn } from '../../components/table/table-column';
import * as moment from 'moment';
import { MessagesDialogComponent } from '../../components/dialog/messages/messages-dialog.component';
import { UserHelper } from '../../helper/user-helper';
import { noUndefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
  providers: [ClassroomService]
})
export class ClassroomComponent extends BasePage implements OnInit {
  defaultPageable: Pageable = {
    sort: ['messageCount,desc']
  };

  searchForm: FormGroup;

  page = new Page<any>();
  pageable: Pageable;
  columns: TableColumn[] = [];
  toolbar = {};

  total = {};

  lastFromDate: string;
  lastToDate: string;

  @ViewChild('userFieldImpl') userFieldImpl: TemplateRef<any>;
  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;
  @ViewChild('detailImpl') detailImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.pageable = Object.assign(new Pageable(), this.defaultPageable);
    this.columns = [
      { key: 'name', name: '班级', cellTemplate: this.previewImpl, maxWidth: 200 },
      { key: 'code', name: '班级号' },
      { key: 'memberCount', name: '人数', numeric: true, sortable: true, cellTemplate: this.viewImpl },
      { key: 'createBy', name: '创建人（电话）', cellTemplate: this.userFieldImpl, maxWidth: 200 },
      { key: 'invitationCode', name: '邀请码', cellTemplate: this.detailImpl },
      { key: 'createTime', name: '创建时间', sortable: true, numeric: true },
      { key: 'noticeCount', name: '通知', numeric: true, sortable: true, cellTemplate: this.viewImpl },
      { key: 'topicMessageCount', name: '讨论', numeric: true, sortable: true, cellTemplate: this.viewImpl },
      { key: 'surveyCount', name: '调查', numeric: true, sortable: true, cellTemplate: this.viewImpl },
      { key: 'videoCount', name: '视频', numeric: true, sortable: true, cellTemplate: this.viewImpl },
      { key: 'activityCount', name: '活动', numeric: true, sortable: true, cellTemplate: this.viewImpl },
      { key: 'messageCount', name: '总数', numeric: true, sortable: true },
      { key: 'growthCount', name: '成长', numeric: true, cellTemplate: this.viewImpl }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'help_outline', name: '统计数据有一天延迟' }, { icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: [{ icon: 'open_in_browser', name: '导出数据', action: this.exportStatistics.bind(this) }]
    };

    this.buildForm();

    this.search();
  }

  buildForm(): void {
    const fromDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const toDate = moment().format('YYYY-MM-DD');

    this.searchForm = this.formBuilder.group({
      createOrActive: ['false', Validators.required],
      fromDate: [fromDate],
      toDate: [toDate],
      keyword: []
    });

    this.lastFromDate = fromDate;
    this.lastToDate = toDate;
  }

  search() {
    this.load(Object.assign(this.pageable, { page: 0 }));
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;
    const formModel = this.searchForm.value;

    this.withHandler(this.classroomService.queryStatistics(Object.assign(formModel, this.pageable)).$observable)
      .subscribe(page => this.page = page);

    this.classroomService.queryMessageCount(formModel).$observable.subscribe(total => this.total = total);
  }

  reload() {
    this.load();
  }

  sort(sort: string) {
    this.load(Object.assign(this.pageable, { page: 0, sort: [sort] }));
  }

  exportStatistics() {

  }

  openViewDialog(event) {
    if (!event.row.classroomId) { alert('数据有误'); }
    const formModel = this.searchForm.value;

    let title: string;
    if (event.column.key === 'memberCount') {
      title = '成员列表';

      const queryInput = {
        classroomId: event.row.classroomId
      };
      const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.withHandler(this.classroomService.queryClassroomMembers(queryInput).$observable)
        .subscribe(items => dialogRef.componentInstance.items = items);
    } else {
      let category: string;
      if (event.column.key === 'noticeCount') {
        title = '晓通知列表';
        category = 'NOTICE';
      } else if (event.column.key === 'topicMessageCount') {
        title = '晓讨论列表';
        category = 'TOPIC_MESSAGE';
      } else if (event.column.key === 'surveyCount') {
        title = '晓调查列表';
        category = 'SURVEY';
      } else if (event.column.key === 'videoCount') {
        title = '晓视频列表';
        category = 'VIDEO';
      } else if (event.column.key === 'activityCount') {
        title = '晓活动列表';
        category = 'ACTIVITY';
      } else if (event.column.key === 'growthCount') {
        title = '晓成长列表';
        category = 'GROWTH';
      } else if (event.column.key === 'paperSlipCount') {
        title = '晓纸条列表';
        category = 'PAPER_SLIP';
      }

      const dialogRef: MdDialogRef<MessagesDialogComponent> = this.dialog.open(MessagesDialogComponent);
      dialogRef.componentInstance.title = title;
      dialogRef.componentInstance.load = function (pageable = new Pageable()) {

        dialogRef.componentInstance.pageable = pageable;

        const queryInput = Object.assign({
          classroomId: event.row.classroomId,
          category: category,
          fromDate: formModel.createOrActive === 'true' ? '2015-01-01' : formModel.fromDate,
          toDate: formModel.createOrActive === 'true' ? moment().add(1, 'days').format('YYYY-MM-DD') : formModel.toDate
        }, dialogRef.componentInstance.pageable);

        dialogRef.componentInstance.withHandler(this.classroomService.queryClassroomMessages(queryInput).$observable)
          .map(res => {
            const page = res as Page<any>;
            if (category === 'GROWTH') {
              page.numberOfElements = page.content.length;
              page.number = pageable.page;
              page.size = pageable.size;

              page.totalElements = page.content.length !== 0 && pageable.page * pageable.size + pageable.size > event.row.growthsNum
                ? pageable.page * pageable.size + page.content.length : event.row.growthsNum;
              page.totalPages = pageable.size === 0 ? 1 : page.totalElements / page.size;
              page.first = page.number === 0;
              page.last = page.number + 1 >= page.totalPages;
            }
            return page;
          })
          .subscribe(page => dialogRef.componentInstance.page = page );
      }.bind(this);
    }
  }

  getInvitedUserName(user) {
    return UserHelper.getDisplayName(user);
  }

  onCreateOrActiveChange() {
    const tmpFromDate = this.searchForm.value.fromDate;
    const tmpToDate = this.searchForm.value.toDate;
    this.searchForm.patchValue({
      fromDate: this.lastFromDate,
      toDate: this.lastToDate
    });
    this.lastFromDate = tmpFromDate;
    this.lastToDate = tmpToDate;
  }
}
