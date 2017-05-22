import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
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
    private formBuilder: FormBuilder,
    private exportService: ExportService,
    private dialog: MdDialog
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

  regenerate() {
    // for (const item of this.selected) {
    //   this.exportService.generate({
    //     startTime: formModel.from,
    //     endTime: formModel.to,
    //     name: ret.data.msg,
    //     type: formModel.exportType
    //   });
    // }
  }

  load(pageable = this.pageable): Observable<Page<any>> {
    this.pageable = pageable;

    const observable = this.exportService.query(this.pageable).$observable;

    observable.subscribe(page => this.page = page, () => { });

    return observable;
  }

  reload(): Observable<Page<any>> {
    return this.subscribeQuery(this.load());
  }
}
