import { Component, Input, OnInit } from '@angular/core';
import { ComponentType } from '@angular/material';
import { Subject } from 'rxjs/Subject';

export class Column {
  key = '';
  name = '';
  sortable = true;
  renderComponent?: ComponentType<any>;
  renderSubject?: Subject<any> | Subject<any>[];
  //   component: ComponentType<any>,
  //   // handler: (value?: any, row?: any[], index?: number) => void
  // } = {
  //   component: null,
  //   handler: null
  // };
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()
  columns: Column[] = [];
  @Input()
  data: any[] = [];

  constructor() { }
  ngOnInit() { }
}
