import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
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
  toolbar = {};

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private dialog: MdDialog,
    private feedbackService: FeedbackService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '用户', sortable: true, cellTemplate: this.previewImpl },
      { key: 'role', name: '角色', sortable: true },
      { key: 'advice', name: '反馈意见', cellTemplate: this.viewImpl, maxWidth: 160 },
      { key: 'createTime', name: '反馈时间', sortable: true, numeric: true }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.search();
  }

  search() {
    this.subscribeQuery(this.load(new Pageable()));
  }

  load(pageable = this.pageable): Observable<Page<any>> {
    this.pageable = pageable;

    const observable = this.feedbackService.query(this.pageable).$observable;

    observable.subscribe((page) => this.page = page);

    return observable;
  }

  reload(): Observable<Page<any>> {
    return this.subscribeQuery(this.load());
  }

  openViewDialog(event) {
    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);

  }
}
