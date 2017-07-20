import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { UserLocationStatisticsService } from './user-location-statistics.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { AlertDialogComponent } from '../../../components/dialog/alert/alert-dialog.component';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';
import { LocalDateTimePipe } from 'app/pipes/local-date-time.pipe';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-location-statistics',
  templateUrl: './user-location-statistics.component.html',
  styleUrls: ['./user-location-statistics.component.scss'],
  providers: [UserLocationStatisticsService]
})
export class UserLocationStatisticsComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  exportType: string;
  exportTypes = [];
  toolbar = {};
  classroomIds: string;
  roles = [];
  boolOptions = [];
  messageDirections = [];
  createOrActive: string;
  types = []

  @ViewChild('actionImpl') actionImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private dialog: MdDialog,
    private formBuilder: FormBuilder,
    private userLocationStatisticsService: UserLocationStatisticsService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '日期范围', cellTemplate: this.viewImpl },
      { key: 'createTime', name: '创建时间', pipe: new LocalDateTimePipe() }
      // { key: 'action', name: '操作', numeric: true, cellTemplate: this.actionImpl }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };
    this.exportTypes = [
      { name: '用户归属地', value: 'LOCATION' },
      { name: '班级用户消息信息', value: 'CLASSROOM_USER_INFO'},
      { name: '用户消息信息', value: 'USER_INFO'}
    ];
    this.roles = [
      { name: '不限' },
      { name: '教师', value: 'TEACHER' },
      { name: '家长', value: 'PARENT' },
      { name: '学生', value: 'STUDENT' },
    ];
    this.boolOptions = [
      { name: '不限' },
      { name: '是', value: true },
      { name: '否', value: false }
    ];
    this.messageDirections = [
      { name: '全部' },
      { name: '收', value: 'INCOMING' },
      { name: '发', value: 'OUTGOING' }
    ];
    this.types = [
      { name: '手机号', value: 'MOBILE'},
      { name: '用户ID', value: 'USER_ID' },
      { name: '学校', value: 'SCHOOL'},
      // { name: '昵称', value: 'USERNAME'},
      { name: '真实名称', value: 'REALNAME'}
    ]
    this.exportType = 'LOCATION';
    this.buildForm();

    this.search();
  }

  buildForm() {
    const from = moment().startOf('year').format('YYYY-MM-DD');
    const to = moment().format('YYYY-MM-DD');
    this.searchForm = this.formBuilder.group({
      fromDate: [from, [Validators.required]],
      toDate: [to, [Validators.required]],
      exportType:  ['LOCATION'],
      classroomIds: [],
      role: ['TEACHER'],
      messageDirection: [],
      createdClassroom: [],
      joinedClassroom: [],
      keyword: [],
      createOrActive: false,
      type: ['MOBILE']
    });
  }

  search() {
    this.load(new Pageable());
  }
  load(pageable = this.pageable) {
    this.pageable = pageable;
    const inputInfo = Object.assign({}, this.pageable, {type: this.searchForm.value.exportType});
    this.withHandler(this.userLocationStatisticsService.query(inputInfo).$observable)
      .subscribe(page => this.page = page);
  }

  changeType($event) {
    this.exportType = $event.value;
    const inputInfo = Object.assign({}, this.pageable, {type: this.exportType});
    this.withHandler(this.userLocationStatisticsService.query(inputInfo).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  generateLocation(range) {
    const input = {from: range.fromDate, to: range.toDate}
    this.userLocationStatisticsService.queryStatus(input).$observable
      .switchMap(ret => {
        if (ret.status === '1') { // 正在生成数据
          const dialogRef: MdDialogRef<AlertDialogComponent> = this.dialog.open(AlertDialogComponent);
          dialogRef.componentInstance.content = ret.msg;

          return dialogRef.afterClosed();

        } else if (ret.status === '2') { // 生成数据
          const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
          dialogRef.componentInstance.content = ret.msg;

          return dialogRef.afterClosed()
            .filter(result => result === 'ok')
            .switchMap(() => this.userLocationStatisticsService.generate(range).$observable);
        }

        return Observable.of('ok');
      })
      .subscribe(this.reload.bind(this), this.handleError.bind(this));
  }

  generate() {
    const form = this.searchForm.value;
    const name = form.fromDate + '_' + form.toDate;
    // if (form.keyword != null ) {
    //   if (form.keyword.length > 30) {
    //     temp = form.keyword.substr(0, 30) + '....';
    //   } else {
    //     temp = form.keyword;
    //   }
    //    + '_' + temp;
    // } else {
    //   name = form.fromDate + '_' + form.toDate + '_';
    // }
    const input = Object.assign({}, form, {name: name});
    console.log(input);
    this.userLocationStatisticsService.exportUserInfo(input).$observable
      .switchMap(ret => {
        if (ret.status === '1') { // 正在生成数据
          const dialogRef: MdDialogRef<AlertDialogComponent> = this.dialog.open(AlertDialogComponent);
          dialogRef.componentInstance.content = ret.msg;

          return dialogRef.afterClosed();

        } else if (ret.status === '2') { // 生成数据
          const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
          dialogRef.componentInstance.content = ret.msg;

          return dialogRef.afterClosed()
            .filter(result => result === 'ok')
            .switchMap(() => this.userLocationStatisticsService.exportUserInfo(input).$observable);
        }

        return Observable.of('ok');
      })
      .subscribe(this.reload.bind(this), this.handleError.bind(this));
    // range = range || this.searchForm.value;
    // const  exportType = this.searchForm.value.exportType;
    // if (exportType === 'LOCATION') {
    //   this.generateLocation(range);
    // } else if (exportType === 'CLASSROOM_USER_INFO') {
    //   this.generateClassroomUserInfo(range);
    // } else {
    //   this.generateUserInfo(range);
    // }
  }

  openViewDialog({ row }) {
    const exportType = this.searchForm.value.exportType;
    if (exportType === 'LOCATION') {
      this.userLocationStatisticsService.preview({name: row.name});
    } else if (exportType === 'CLASSROOM_USER_INFO') {
      this.userLocationStatisticsService.download({name: row.name + '.xlsx', exportType: 'classroomUserInfo'})
    } else {
      this.userLocationStatisticsService.download({name: row.name + '.xls', exportType: 'userInfo'});
    }
  }

  private generateClassroomUserInfo(range) {
    const classroomNum = this.searchForm.value.classroomIds.split(',');
    console.log('classroomNum', classroomNum);
    const inputInfo = Object.assign({}, range, { classroomNum: classroomNum });
    this.userLocationStatisticsService.queryClassroomUserInfoStatus(inputInfo).$observable
      .switchMap(ret => {
        if (ret.status === '1') { // 正在生成数据
          const dialogRef: MdDialogRef<AlertDialogComponent> = this.dialog.open(AlertDialogComponent);
          dialogRef.componentInstance.content = ret.msg;
          return dialogRef.afterClosed();
        } else if (ret.status === '2') { // 生成数据
          const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
          dialogRef.componentInstance.content = ret.msg;
          return dialogRef.afterClosed()
            .filter(result => result === 'ok')
            .switchMap(() => this.userLocationStatisticsService.queryClassroomUserInfoStatus(inputInfo).$observable);
        }
        return Observable.of('ok');
      })
      .subscribe(this.reload.bind(this), this.handleError.bind(this));
  }

  private generateUserInfo(range: { fromDate: string; toDate: string }) {
    console.log(range);
    this.userLocationStatisticsService.exportUserInfo(range).$observable
      .switchMap(ret => {
        if (ret.status === '1') { // 正在生成数据
          const dialogRef: MdDialogRef<AlertDialogComponent> = this.dialog.open(AlertDialogComponent);
          dialogRef.componentInstance.content = ret.msg;

          return dialogRef.afterClosed();

        } else if (ret.status === '2') { // 生成数据
          const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
          dialogRef.componentInstance.content = ret.msg;

          return dialogRef.afterClosed()
            .filter(result => result === 'ok')
            .switchMap(() => this.userLocationStatisticsService.exportUserInfo(range).$observable);
        }

        return Observable.of('ok');
      })
      .subscribe(this.reload.bind(this), this.handleError.bind(this));
  }
}
