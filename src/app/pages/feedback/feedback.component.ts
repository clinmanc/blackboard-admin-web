import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
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

  constructor(
    snackBar: MdSnackBar,
    private feedbackService: FeedbackService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '用户', cellTemplate: this.previewImpl },
      { key: 'role', name: '角色' },
      { key: 'advice', name: '反馈意见', maxWidth: 400 },
      { key: 'createTime', name: '反馈时间', numeric: true }
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
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.feedbackService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    return this.load();
  }
}
