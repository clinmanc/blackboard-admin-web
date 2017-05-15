import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  providers: [FeedbackService]
})
export class FeedbackComponent extends BasePage implements OnInit {

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(protected snackBar: MdSnackBar,
    private dialog: MdDialog,
    private feedbackService: FeedbackService) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '用户', sortable: true, cellTemplate: this.previewImpl },
      { key: 'role', name: '角色', sortable: true },
      { key: 'advice', name: '反馈意见', cellTemplate: this.viewImpl, maxWidth: 160 },
      { key: 'createTime', name: '反馈时间', sortable: true, numeric: true }
    ];

    this.search();
  }

  search() {
    this.startQuery();
    return this.feedbackService.query(this.pageable).$observable
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
