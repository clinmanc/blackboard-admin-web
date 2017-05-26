import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
import { ExportService } from './export.service';
import { ConfirmDialogComponent } from '../../components/dialog/confirm/confirm-dialog.component';
import { AlertDialogComponent } from '../../components/dialog/alert/alert-dialog.component';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
  providers: [ExportService]
})
export class ExportComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  selected: any[] = [];
  toolbar = {};
  exportTypes = [];

  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private dialog: MdDialog,
    private formBuilder: FormBuilder,
    private exportService: ExportService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '日期范围', sortable: true }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '重新生成', icon: 'autorenew', action: this.regenerate.bind(this) }],
      menus: []
    };
    this.exportTypes = [
      { name: '活跃班级信息', value: 'activeClassroom' },
      { name: '最近创建班级信息', value: 'createdClassroom' },
      { name: '用户信息', value: 'userInfo' },
      { name: '活跃用户信息', value: 'activeUser' },
    ];
    this.buildForm();

    this.search();
  }

  buildForm(): void {
    this.searchForm = this.formBuilder.group({
      from: ['2017-02-01', [Validators.required]],
      to: ['2017-02-25', [Validators.required]],
      exportType: ['activeClassroom', [Validators.required]]
    });
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.exportService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  generate() {
    const formModel = this.searchForm.value;

    this.exportService.checkStatus({
      startTime: formModel.from,
      endTime: formModel.to,
      type: formModel.exportType
    }).$observable.switchMap((ret) => {

      console.log(ret);
      if (ret.status === '1') { // 正在生成数据
        const dialogRef: MdDialogRef<AlertDialogComponent> = this.dialog.open(AlertDialogComponent);
        dialogRef.componentInstance.content = ret.msg;

        return Observable.of();
      } else if (ret.status === '2') { // 生成数据

        const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.content = ret.msg;

        return dialogRef.afterClosed().switchMap((result) => {
          if (result === 'ok') {
            return this.exportService.generate({
              startTime: formModel.from,
              endTime: formModel.to,
              name: ret.data.msg,
              type: formModel.exportType
            }).$observable;
          }
        });
      }

      return Observable.of();
    }).subscribe(this.reload.bind(this), err => console.log(err));
  }

  regenerate(name: string) {
    this.generate();
  }
}
