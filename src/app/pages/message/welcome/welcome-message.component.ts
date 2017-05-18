import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../../base-page';
import { TableColumn } from '../../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';
import { WelcomeMessageService } from './welcome-message.service';
import {ConfirmDialogComponent} from "../../../components/dialog/confirm/confirm-dialog.component";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

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

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private router: Router,
    private dialog: MdDialog,
    private messageService: WelcomeMessageService) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'order', name: '序号', sortable: true },
      { key: 'receiveType', name: '接收类型', sortable: true },
      { key: 'title', name: '标题', sortable: true },
      { key: 'content', name: '内容', cellTemplate: this.viewImpl },
      { key: 'createTime', name: '创建时间', sortable: true, numeric: true }
    ];
    this.toolbar = { persistentButtons: [{ name: '添加', action: this.add.bind(this) }],  iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '删除', icon: 'delete' }], menus: [{ name: '清空', icon: 'delete_sweep'}]};

    this.subscribeQuery(this.load());
  }

  load(): Observable<any[]> {
    const observable = this.messageService.query().$observable;

    observable.subscribe((data) => this.data = data);

    return observable;
  }

  reload(): Observable<any[]>{
    return this.subscribeQuery(this.load());
  }

  openViewDialog(event) {
    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);

  }

  openRemoveAllConfirmDialog(event?: any) {
    let dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '清空后不可恢复，确认清空吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        // alert(result);
      }
    });
  }

  select(selected){
    this.selected = selected;
  }

  add(){
    this.router.navigate(['/message/welcome/create']);
  }
  remove(){
    let dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = '删除后不可恢复，确认删除吗？';
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        // this.announcementMessageService.remove({ permissionId: row.permissionId }).$observable
        //   .subscribe(() => this.reload());
      }
    });
  }
  removeAll(){

  }
}
