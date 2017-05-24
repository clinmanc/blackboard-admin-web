import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { TipService } from './tip.service';
import { TipCreateComponent } from './create/tip-create.component';
import { ConfirmDialogComponent } from '../../components/dialog/confirm/confirm-dialog.component';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss'],
  providers: [TipService]
})
export class TipComponent extends BasePage implements OnInit {

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  selected = [];
  toolbar = {};

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;
  @ViewChild('weightImpl') weightImpl: TemplateRef<any>;

  constructor(
    protected snackBar: MdSnackBar,
    private dialog: MdDialog,
    private tipService: TipService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'tipUrl', name: '图片', sortable: true, cellTemplate: this.previewImpl },
      { key: 'deviceType', name: '设备类型', cellTemplate: this.viewImpl },
      { key: 'priority', name: '权重', sortable: true, numeric: true, cellTemplate: this.weightImpl },
      { key: 'version', name: '版本号', sortable: true, numeric: true }
    ];
    this.toolbar = {
      persistentButtons: [{ name: '添加', action: this.add.bind(this) }],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '删除', icon: 'delete', action: this.remove.bind(this) }],
      menus: [{ name: '清空', icon: 'delete_sweep', action: this.removeAll.bind(this) }]
    };

    this.search();
  }

  search() {
    this.load();
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.tipService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  select(selected) {
    this.selected = selected;
  }

  add() {
    const dialogRef: MdDialogRef<TipCreateComponent> = this.dialog.open(TipCreateComponent);
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
        this.tipService.removeInBatch({
          method: 'DELETE',
          data: this.selected.map(tip => tip.id)
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
        this.tipService.removeAll().$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }
}
