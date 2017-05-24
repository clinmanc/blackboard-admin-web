import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { UserService } from './user.service';
import { TableColumn } from '../../components/table/table-column';
import * as moment from 'moment';

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
  toolbar = {};

  queryType = 'info';

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '姓名（电话）', sortable: true, cellTemplate: this.previewImpl },
      { key: 'status', name: '状态', sortable: true },
      { key: 'role', name: '角色', sortable: true },
      { key: 'school', name: '学校', sortable: true },
      { key: 'messages', name: '用户消息', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'createTime', name: '注册时间', sortable: true, numeric: true }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.buildForm();

    this.initForm();

    this.search();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      keyword: [''],
      from: [''],
      to: ['']
    });
  }

  initForm() {
    this.route.params.subscribe((params: Params) => {
      this.queryType = params && params['queryType'] || 'info';
      if (this.queryType !== 'info') {
        const formModel = this.searchForm.value;
        if (!formModel.from && !formModel.to) {
          const from = moment().subtract(7, 'days').format('YYYY-MM-DD');
          const to = moment().format('YYYY-MM-DD');
          this.searchForm.patchValue({
            from: from,
            to: to
          });
        }
      }
    });
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;
    const formModel = this.searchForm.value;

    const method = 'query' + this.queryType.slice(0, 1).toUpperCase() + this.queryType.slice(1);
    this.withHandler(this.userService[method](Object.assign({
      keyword: formModel.keyword,
      from: formModel.from,
      to: formModel.to
    }, this.pageable)).$observable)
      .map(res => res as Page<any>)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  openViewDialog(event) {
    const type = event.column.key;

    let result: Observable<any>;
    let title;
    if (type === 'messages') {
      if (!event.row.userId) { alert('数据有误'); }

      result = this.userService.queryTeacherMessages({
        from: '2015-01-12',
        ownerId: event.row.userId
      }).$observable;
      title = '用户消息列表';
    } else {
      return;
    }

    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.withHandler(result).subscribe(items => dialogRef.componentInstance.items = items);
  }
}
