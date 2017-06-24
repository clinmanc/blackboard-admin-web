import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { TableColumnDirective } from './column/table-column.directive';
import { translateTemplates } from './column/column-helper';
import { TableColumn } from './table-column';

const ADD_ROW = 'ADD_ROW';
const REMOVE_ROW = 'REMOVE_ROW';
const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
const TOGGLE_ALL = 'TOGGLE_ALL';
const FETCH_FROM_API = 'FETCH_FROM_API';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input()
  columns: TableColumn[] = [];
  @Input()
  selectable: false;
  @Output()
  select = new EventEmitter<any>();

  store = [];
  selected = [];

  _sort: string;
  @Input()
  set sort(sort: string) {
    if (this._sort) {
      const dir = this.direction && (',' + this.direction) || '';
      this.sortChange.emit(sort + dir);
    }
    this._sort = sort;
  }
  get sort() {
    return this._sort;
  }
  @Output()
  sortChange = new EventEmitter<string>();

  @Input()
  direction: string;

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

  _data: any[] = [];
  @Input()
  set data(data: any[]) {
    this._data = data || [];
    this.store = this._data.map(row => {
      return {
        selected: false,
        reference: row
      };
    });
    this.selected = [];
    this.select.emit(this.selected);
  }
  get data() {
    return this._data;
  }

  constructor() { }

  onSelectAll(event) {
    if (event.checked) {
      this.store.forEach(row => row.selected = true);
      this.selected = this.store.filter(row => row.selected).map(row => row.reference);
    } else {
      this.store.forEach(row => row.selected = false);
      this.selected = [];
    }

    this.select.emit(this.selected);
  }

  onRowSelect(event, changedRow) {
    changedRow.selected = event.checked;
    this.selected = this.store.filter(row => row.selected).map(row => row.reference);

    this.select.emit(this.selected);
  }
}
