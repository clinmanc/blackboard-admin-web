import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../../base-page';
import { TableColumn } from '../../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';
import { WelcomeMessageService } from './welcome-message.service';

@Component({
  selector: 'app-welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss'],
  providers: [WelcomeMessageService]
})
export class WelcomeMessageComponent extends BasePage implements OnInit {

  data = [];
  columns: TableColumn[] = [];

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(protected snackBar: MdSnackBar,
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

    this.search();
  }

  search() {
    this.startQuery();
    return this.messageService.query().$observable
      .subscribe((data) => {
        this.data = data;
        this.completeQuery();
      }, this.handleError.bind(this));
  }

  openViewDialog(event) {
    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);

  }
}
