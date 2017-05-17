import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { TipsService } from './tips.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
  providers: [TipsService]
})
export class TipsComponent extends BasePage implements OnInit {

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;
  @ViewChild('weightImpl') weightImpl: TemplateRef<any>;

  constructor(
    protected snackBar: MdSnackBar,
    private dialog: MdDialog,
    private tipsService: TipsService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'tipUrl', name: '图片地址', sortable: true, cellTemplate: this.previewImpl },
      { key: 'deviceType', name: '设备类型', cellTemplate: this.viewImpl },
      { key: 'priority', name: '权重', sortable: true, numeric: true, cellTemplate: this.weightImpl },
      { key: 'version', name: '版本号', sortable: true, numeric: true }
    ];

    this.search();
  }

  search() {
    this.startQuery();
    return this.tipsService.query(this.pageable).$observable
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
