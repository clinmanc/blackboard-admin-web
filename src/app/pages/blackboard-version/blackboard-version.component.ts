import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { BasePage } from '../base-page';
import { TableColumn } from '../../components/table/table-column';
import { BlackboardVersionService } from './blackboard-version.service';

@Component({
  selector: 'app-blackboard-version',
  templateUrl: './blackboard-version.component.html',
  styleUrls: ['./blackboard-version.component.scss'],
  providers: [BlackboardVersionService]
})
export class BlackboardVersionComponent extends BasePage implements OnInit {
  columns: TableColumn[] = [];
  data = [];
  toolbar = {};

  @ViewChild('statusImpl') statusImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private blackboardVersionService: BlackboardVersionService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '当前版本' },
      { key: 'downloadUrl', name: '下载地址', cellTemplate: this.viewImpl },
      { key: 'description', name: '版本描述' },
      { key: 'mandatoryUpdate', name: '强制更新', cellTemplate: this.statusImpl },
      { key: 'createTime', name: '创建时间' }
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
    this.load();
  }

  load() {
    this.withHandler(this.blackboardVersionService.query().$observable)
      .subscribe(data => this.data = [data]);
  }

  reload() {
    this.load();
  }

  download(event) {
    window.open(event.value);
  }
}

