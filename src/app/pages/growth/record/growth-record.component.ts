import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { GrowthRecordService } from './growth-record.service';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from 'app/components/table/table-column';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';

@Component({
  selector: 'app-growth-record',
  templateUrl: './growth-record.component.html',
  styleUrls: ['./growth-record.component.scss'],
  providers: [GrowthRecordService]
})
export class GrowthRecordComponent extends BasePage implements OnInit {

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  toolbar = {};

  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;
  @ViewChild('statusImpl') statusImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private dialog: MdDialog,
    private growthRecordService: GrowthRecordService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'content', name: '内容', sortable: true },
      { key: 'createBy', name: '创建人', cellTemplate: this.viewImpl },
      { key: 'createTime', name: '创建时间', sortable: true },
      { key: 'praiseNum', name: '点赞数', sortable: true },
      { key: 'commentsNum', name: '评论数', sortable: true },
      { key: 'status', name: '状态', sortable: true, cellTemplate: this.statusImpl }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.subscribeQuery(this.load(new Pageable()));
  }


  load(pageable = this.pageable): Observable<Page<any>> {
    this.pageable = pageable;

    const observable = this.growthRecordService.query(this.pageable).$observable;

    observable.subscribe(page => this.page = page, () => {});

    return observable;
  }

  reload(): Observable<Page<any>> {
    return this.subscribeQuery(this.load());
  }

  openViewDialog(event) {
    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);

  }
}
