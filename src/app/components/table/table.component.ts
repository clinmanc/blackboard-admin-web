import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentType } from '@angular/material';

export class Column {
  key?= '';
  name?= '';
  sortable?= false;
  numeric?= false;
  renderComponent?: ComponentType<any>;
  // renderViewFunction?: (value?: any, row?: any[], index?: number) => void;
  //   component: ComponentType<any>,
}
export class CellInfo {
  value = {};
  column: Column = {};
  row = {};
  index = 0;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  columns: Column[] = [];
  @Input()
  data: any[] = [];
  @Output()
  view = new EventEmitter<any>();
  @Output()
  edit = new EventEmitter<any>();

  constructor() { }

  onView(value) {
    this.view.emit(value);
  }

  onEdit(value) {
    this.edit.emit(value);
  }
}
