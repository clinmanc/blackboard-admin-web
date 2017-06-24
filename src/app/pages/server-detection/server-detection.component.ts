import { Component, OnInit } from '@angular/core';
import { BasePage } from '../base-page';
import { TableColumn } from '../../components/table/table-column';
import { MdSnackBar } from '@angular/material';
import { ServerDetectionService } from './server-detection.service';

@Component({
  selector: 'app-server-detection',
  templateUrl: './server-detection.component.html',
  styleUrls: ['./server-detection.component.scss'],
  providers: [ServerDetectionService]
})
export class ServerDetectionComponent extends BasePage implements OnInit {

  columns: TableColumn[] = [];
  data = [];
  toolbar = {};

  constructor(protected snackBar: MdSnackBar,
    private serverDetectionService: ServerDetectionService) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '服务器' },
      { key: 'url', name: '访问链接' },
      { key: 'status', name: '状态' }
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
    this.withHandler(this.serverDetectionService.query().$observable)
      .subscribe(data => this.data = data);
  }

  reload() {
    this.load();
  }
}
