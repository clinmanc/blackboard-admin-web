import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ClassroomAssociatedService } from './classroom-associated.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-classroom-associated',
  templateUrl: './classroom-associated.component.html',
  styleUrls: ['./classroom-associated.component.scss'],
  providers: [ClassroomAssociatedService]
})
export class ClassroomAssociatedComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  toolbar = {};

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private classroomAssociatedService: ClassroomAssociatedService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();

    this.columns = [
      { key: 'name', name: '班级', sortable: true, cellTemplate: this.previewImpl },
      { key: 'code', name: '班级号', sortable: true },
      { key: 'createBy', name: '创建人', sortable: true },
      { key: 'memberNum', name: '班级成员数量', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'associatedClassroomNum', name: '成员创建班级数量', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'associatedPeopleNum', name: '关联人员数量', sortable: true, numeric: true }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };
  }

  buildForm(): void {
    const from = moment().startOf('month').format('YYYY-MM-DD');
    const to = moment().format('YYYY-MM-DD');

    this.searchForm = this.formBuilder.group({
      classroomCodes: ['', [Validators.required, Validators.minLength(6)]],
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

    const input = Object.assign({
      keyword: formModel.classroomCodes,
      from: formModel.from,
      to: formModel.to
    }, this.pageable);

    this.withHandler(this.classroomAssociatedService.queryAssociatedStatistics(input).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  openViewDialog(event) {

    const type = event.column.key;
    let result: Observable<any>;
    let title;
    if (!event.row.classroomId) { alert('数据有误'); }
    if (type === 'memberNum') {
      result = this.classroomAssociatedService.queryClassroomMembers({
        classroomId: event.row.classroomId,
      }).$observable;
      title = '成员列表';
    } else if (type === 'associatedClassroomNum') {
      result = this.classroomAssociatedService.queryAssociatedClassrooms({
        memberIds: event.row.memberIds
      }, {
          classroomId: event.row.classroomId,
        }).$observable;
      title = '班级列表';
    } else {
      return;
    }

    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.withHandler(result).map((items) => {
      return items.map(item => {
        return {
          id: item.classroomId || item.userId,
          name: item.userName || (item.classroomName && `(${item.membersCount}人) ${item.classroomName}`)
        };
      });
    }).subscribe(items => dialogRef.componentInstance.items = items);
  }
}
