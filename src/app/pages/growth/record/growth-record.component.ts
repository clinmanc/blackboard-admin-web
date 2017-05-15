import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
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

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(protected snackBar: MdSnackBar,
    private dialog: MdDialog,
    private growthRecordService: GrowthRecordService) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'content', name: '内容', sortable: true, cellTemplate: this.previewImpl },
      { key: 'createBy', name: '创建人', cellTemplate: this.viewImpl },
      { key: 'createTime', name: '创建时间', sortable: true },
      { key: 'praiseNum', name: '点赞数', sortable: true },
      { key: 'commentsNum', name: '评论数', sortable: true }
    ];

    this.search();
  }

  search() {
    this.startQuery();
    return this.growthRecordService.query(this.pageable).$observable
      .subscribe((page) => {
        this.page = page;
        this.completeQuery();
      }, this.handleError.bind(this));
  }

  loadPage(pageable: Pageable) {
    this.pageable = pageable;
    this.search();
  }

  openViewDialog(event) {
    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);

  }
}
