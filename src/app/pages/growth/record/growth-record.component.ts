import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { GrowthRecordService } from './growth-record.service';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from 'app/components/table/table-column';

@Component({
  selector: 'app-growth-record',
  templateUrl: './growth-record.component.html',
  styleUrls: ['./growth-record.component.scss'],
  providers: [GrowthRecordService]
})
export class GrowthRecordComponent extends BasePage implements OnInit {

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  toolbar = {};

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('statusImpl') statusImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private growthRecordService: GrowthRecordService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'content', name: '内容' },
      { key: 'createBy', name: '创建人', cellTemplate: this.previewImpl },
      { key: 'createTime', name: '创建时间' },
      { key: 'praiseNum', name: '点赞数' },
      { key: 'commentsNum', name: '评论数' },
      { key: 'status', name: '状态', cellTemplate: this.statusImpl }
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

    this.withHandler(this.growthRecordService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    return this.load();
  }
}
