import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
      { key: 'status', name: '状态', sortable: true }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.subscribeQuery(this.load());
  }

  load(): Observable<any[]> {

    const observable = this.serverDetectionService.query().$observable;

    observable.subscribe(data => this.data = data, () => {});

    return observable;
  }

  reload(): Observable<any[]> {
    return this.subscribeQuery(this.load());
  }
}
