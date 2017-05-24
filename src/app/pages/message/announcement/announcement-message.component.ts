import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../../base-page';
import { TableColumn } from '../../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';
import { AnnouncementMessageService } from './announcement-message.service';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement-message',
  templateUrl: './announcement-message.component.html',
  styleUrls: ['./announcement-message.component.scss'],
  providers: [AnnouncementMessageService]
})
export class AnnouncementMessageComponent extends BasePage implements OnInit {

  data = [];
  columns: TableColumn[] = [];
  selected = [];
  toolbar = {};

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private router: Router,
    private dialog: MdDialog,
    private announcementMessageService: AnnouncementMessageService) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'receiveType', name: '接收类型', sortable: true },
      { key: 'title', name: '标题', sortable: true },
      { key: 'content', name: '内容', cellTemplate: this.viewImpl },
      { key: 'createTime', name: '创建时间', sortable: true, numeric: true }
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

  load() {
    this.withHandler(this.announcementMessageService.query().$observable)
      .subscribe(data => this.data = data, () => { });
  }

  reload() {
    this.load();
  }

  openViewDialog(event) {
    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);

  }

  select(selected) {
    this.selected = selected;
  }

  add() {
    this.router.navigate(['/message/announcement/create']);
  }

  remove() {
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.announcementMessageService.removeInBatch({
          method: 'DELETE',
          data: this.selected.map(message => message.messageId)
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
        this.announcementMessageService.removeAll().$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }
}
