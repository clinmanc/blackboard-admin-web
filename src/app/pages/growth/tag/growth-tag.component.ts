import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { GrowthTagService } from './growth-tag.service';
import { GrowthTagCreateComponent } from './create/growth-tag-create.component';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';

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
  selected = [];
  toolbar = {};

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
    this.toolbar = {
      persistentButtons: [{ name: '添加', action: this.add.bind(this) }],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '删除', icon: 'delete' }],
      menus: [{ name: '清空', icon: 'delete_sweep' }]
    };
  }

  search() {
    this.load();
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.growthTagsService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    return this.load();
  }

  select(selected) {
    this.selected = selected;
  }

  add() {
    const dialogRef: MdDialogRef<GrowthTagCreateComponent> = this.dialog.open(GrowthTagCreateComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.reload();
      }
    });
  }

  remove() {
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.growthTagsService.removeInBatch({
          method: 'DELETE',
          data: this.selected.map(tip => tip.tagId)
        }).$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }

  removeAll() {
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '清空后不可恢复，确认清空吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.growthTagsService.removeAll().$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }
}
