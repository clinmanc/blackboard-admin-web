import {
  Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList,
  SimpleChanges
} from '@angular/core';
import { TableColumnDirective } from './column/table-column.directive';
import { translateTemplates } from './column/column-helper';
import { TableColumn } from './table-column';
import * as _ from "lodash";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges{

  @Input()
  columns: TableColumn[] = [];
  @Input()
  data: any[] = [];
  @Input()
  selectable: false;
  @Output()
  select = new EventEmitter<any>();

  _selectAll = false;
  selected = [];

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

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data){
      this.selectAll = false;
    }
  }

  set selectAll(selectedAll: boolean){
    this._selectAll = selectedAll;
    if(selectedAll){
      this.selected = (this.data || []).concat();
    } else {
      this.selected = [];
    }

    this.select.emit(this.selected);
  }

  get selectAll(): boolean{
    return this._selectAll;
  }

  isRowSelected(row): boolean{
    return this.selected.includes(row);
  }

  onRowSelect(event, row){
    if(event.checked){
      this.selected.push(row);
      if(this.selected.length === (this.data || []).length){
        this._selectAll = true;
      }
    } else {
      _.remove(this.selected, row);
      this._selectAll = false;
    }

    this.select.emit(this.selected);
  }
}
