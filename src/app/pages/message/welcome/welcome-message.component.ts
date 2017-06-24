import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../base-page';
import { TableColumn } from '../../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { WelcomeMessageService } from './welcome-message.service';
import { ConfirmDialogComponent } from '../../../components/dialog/confirm/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss'],
  providers: [WelcomeMessageService]
})
export class WelcomeMessageComponent extends BasePage implements OnInit {

  data = [];
  columns: TableColumn[] = [];
  selected = [];
  toolbar = {};

  constructor(
    snackBar: MdSnackBar,
    private router: Router,
    private dialog: MdDialog,
    private welcomeMessageService: WelcomeMessageService) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'order', name: '序号' },
      { key: 'receiveType', name: '接收类型' },
      { key: 'title', name: '标题' },
      { key: 'content', name: '内容', maxWidth: 400 },
      { key: 'createTime', name: '创建时间', numeric: true }
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
    this.withHandler(this.welcomeMessageService.query().$observable)
      .subscribe(data => this.data = data);
  }

  reload() {
    this.load();
  }

  select(selected) {
    this.selected = selected;
  }

  add() {
    this.router.navigate(['/message/welcome/create']);
  }

  remove() {
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.welcomeMessageService.removeInBatch({
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
        this.welcomeMessageService.removeAll().$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    });
  }
}
