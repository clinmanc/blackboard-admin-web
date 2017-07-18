import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { InvitationStatisticsService } from './invitation-statistics.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-invitation-statistics',
  templateUrl: './invitation-statistics.component.html',
  styleUrls: ['./invitation-statistics.component.scss'],
  providers: [InvitationStatisticsService]
})
export class InvitationStatisticsComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  toolbar = {};

  @ViewChild('inviterDisplay') inviterDisplay: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    protected snackBar: MdSnackBar,
    private invitationStatisticsService: InvitationStatisticsService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();

    this.columns = [
      { key: 'inviterName', name: '邀请人', sortable: true, cellTemplate: this.inviterDisplay },
      { key: 'invitationCode', name: '邀请码', sortable: true },
      { key: 'inviteeNum', name: '邀请的老师数量', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'classroomNum', name: '邀请的老师创建的班级数量', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'userNum', name: '申请加入班级的人员数量', sortable: true, numeric: true, cellTemplate: this.viewImpl }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'help_outline', name: '统计数据有一天延迟' }, { icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: [
        { icon: 'pie_chart_outlined', name: '导出统计数据', action: this.exportStatistics.bind(this) },
        { icon: 'details', name: '导出详情数据', action: this.exportDetail.bind(this) }
      ]
    };
  }

  buildForm(): void {
    const from = moment().startOf('month').format('YYYY-MM-DD');
    const to = moment().format('YYYY-MM-DD');

    this.searchForm = this.formBuilder.group({
      invitationCodes: ['', [Validators.required, Validators.minLength(6)]],
      from: [from, [Validators.required]],
      to: [to, [Validators.required]]
    });
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;
    const formModel = this.searchForm.value;
    const invitationCodes = formModel.invitationCodes.split(',');

    const input = Object.assign({
      invitationCodes: invitationCodes,
      from: formModel.from,
      to: formModel.to
    }, this.pageable);

    this.withHandler(this.invitationStatisticsService.queryStatistics(input, pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  exportStatistics() {
    const formModel = this.searchForm.value;

    this.invitationStatisticsService.exportRecords({
      invitationCodes: formModel.invitationCodes,
      exportType: 'TOTAL',
      fromDate: formModel.from,
      toDate: formModel.to
    });
  }

  exportDetail() {
    const formModel = this.searchForm.value;

    this.invitationStatisticsService.exportRecords({
      invitationCodes: formModel.invitationCodes,
      exportType: 'DETAIL',
      fromDate: formModel.from,
      toDate: formModel.to
    });
  }

  openViewDialog(event) {
    const type = event.column.key;

    const formModel = this.searchForm.value;
    const queryInput = {
      invitationCode: event.row.invitationCode,
      from: formModel.from,
      to: formModel.to
    };

    let result: Observable<any>;
    let title;
    if (type === 'inviteeNum') {
      result = this.invitationStatisticsService.queryTeachers(queryInput).$observable;
      title = '老师列表';
    } else if (type === 'classroomNum') {
      result = this.invitationStatisticsService.queryClassrooms(queryInput).$observable;
      title = '班级列表';
    } else if (type === 'userNum') {
      result = this.invitationStatisticsService.queryMembers(queryInput).$observable;
      title = '用户列表';
    } else {
      return;
    }

    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.withHandler(result)
      .map((items) => {
        return items.map(item => {
          return {
            id: item.inviteeId || item.classroomId || item.userId,
            name: item.inviteeName || (item.classroomName && `(${item.membersCount}人) ${item.classroomName}`) || item.userName
          };
        });
      }).subscribe(items => dialogRef.componentInstance.items = items);
  }
}
