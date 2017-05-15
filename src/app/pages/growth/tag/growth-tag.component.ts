import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';
import { GrowthTagService } from './growth-tag.service';

@Component({
  selector: 'app-growth-tag',
  templateUrl: './growth-tag.component.html',
  styleUrls: ['./growth-tag.component.scss'],
  providers: [GrowthTagService]
})
export class GrowthTagComponent extends BasePage implements OnInit {

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];

  @ViewChild('weightImpl') weightImpl: TemplateRef<any>;


  constructor(protected snackBar: MdSnackBar,
    private dialog: MdDialog,
    private growthTagsService: GrowthTagService) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '名称', sortable: true },
      { key: 'usages', name: '使用次数', numeric: true },
      { key: 'weight', name: '权重', sortable: true, numeric: true, cellTemplate: this.weightImpl }
    ];

    this.search();
  }

  search() {
    this.startQuery();
    return this.growthTagsService.query(this.pageable).$observable
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
