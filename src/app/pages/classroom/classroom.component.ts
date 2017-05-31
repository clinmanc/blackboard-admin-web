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
import * as moment from 'moment';

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
  columns: TableColumn[] = [];
  toolbar = {};

  queryType = 'info';

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private route: ActivatedRoute,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe((params: Params) => {
      this.queryType = params && params['queryType'] || 'info';
      this.page = new Page<any>();
      this.pageable = new Pageable();
    });

    this.columns = [
      { key: 'name', name: '班级', sortable: true, cellTemplate: this.previewImpl },
      { key: 'code', name: '班级号', sortable: true },
      { key: 'createBy', name: '创建人姓名（电话）', sortable: true, numeric: true },
      { key: 'createTime', name: '创建时间', sortable: true, numeric: true },
      { key: 'members', name: '班级成员', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'messages', name: '班级消息', sortable: true, numeric: true, cellTemplate: this.viewImpl }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.search();
  }

  buildForm(): void {
    const from = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const to = moment().format('YYYY-MM-DD');

    this.searchForm = this.formBuilder.group({
      from: [from],
      to: [to],
      keyword: ['']
    });
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;
    const formModel = this.searchForm.value;

    const method = 'query' + this.queryType.slice(0, 1).toUpperCase() + this.queryType.slice(1);
    const input = Object.assign({
      from: formModel.from,
      to: formModel.to,
      keyword: formModel.keyword
    }, this.pageable);

    this.withHandler(this.classroomService[method](input).$observable)
      .map(res => res as Page<any>)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  openViewDialog(event) {
    if (!event.row.classroomId) {
      alert('数据有误');
    }

    const type = event.column.key;

    let result: Observable<any>;
    let title;
    if (type === 'members') {
      result = this.classroomService.queryClassroomMembers({ classroomId: event.row.classroomId }).$observable;
      title = '成员列表';
    } else if (type === 'messages') {
      if (!event.row.ownerId) {
        alert('数据有误');
      }
      result = this.classroomService.queryClassroomMessages({
        classroomId: event.row.classroomId,
        ownerId: event.row.ownerId,
        from: '2015-01-12'
      }).$observable;
      title = '最近消息列表';
    } else {
      return;
    }

    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.withHandler(result).subscribe(items => dialogRef.componentInstance.items = items);
  }
}
