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
  toolbar = {};

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
      { key: 'createTime', name: '创建时间', pipe: new LocalDateTimePipe() },
      { key: 'action', name: '操作', numeric: true, cellTemplate: this.actionImpl }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };
    this.buildForm();

    this.search();
  }

  buildForm() {
    const from = moment().startOf('year').format('YYYY-MM-DD');
    const to = moment().format('YYYY-MM-DD');

    this.searchForm = this.formBuilder.group({
      from: [from, [Validators.required]],
      to: [to, [Validators.required]]
    });
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.userLocationStatisticsService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  generate(range?: { from: string, to: string }) {
    range = range || this.searchForm.value;

    this.userLocationStatisticsService.queryStatus(range).$observable
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

  regenerate(name: string) {
    const rangeArray: string[] = name.split('_');

    this.generate({ from: rangeArray[0], to: rangeArray[1] });
  }

  openViewDialog({ row }) {
    this.userLocationStatisticsService.preview({ name: row.name });
  }
}
