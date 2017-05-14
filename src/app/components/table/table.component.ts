import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { TableColumnDirective } from './column/table-column.directive';
import { translateTemplates } from './column/column-helper';
import { TableColumn } from './table-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  columns: TableColumn[] = [];
  @Input()
  data: any[] = [];
  @Input()
  selectable: false;
  @Input()
  paging: true;
  @Output()
  view = new EventEmitter<any>();
  @Output()
  edit = new EventEmitter<any>();
  @Output()
  select = new EventEmitter<any>();

  _columnTemplates: QueryList<TableColumnDirective>;

  @ContentChildren(TableColumnDirective)
  set columnTemplates(val: QueryList<TableColumnDirective>) {
    this._columnTemplates = val;

    if (val) {
      // only set this if results were brought back
      const arr = val.toArray();

      if (arr.length) {
        // translate them to normal objects
        this.columns = translateTemplates(arr);
      }
    }
  }

  selectedAll = false;
  selected = [];

  constructor() { }

  onView(value) {
    this.view.emit(value);
  }

  onEdit(value) {
    this.edit.emit(value);
  }
}
