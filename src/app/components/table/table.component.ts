import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IMdlTableColumn, IMdlTableModel, IMdlTableModelItem, MdlDefaultTableModel } from "@angular-mdl/core";
import { isArray, isNullOrUndefined } from "util";

export class Column implements IMdlTableColumn {
  key: string;
  name: string;
  sortable?: boolean;
  numeric?: boolean;
  formatter?: (value?: any, row?: number, index?: number) => string;
}

export class Settings {
  columns: Column[];
}

export class TableItem implements IMdlTableModelItem {
  selected: boolean;

  constructor(selected: boolean = false) {
    this.selected = selected;
  }
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private _settings: Settings;
  private _source: any;

  @Input()
  selectable: boolean;

  @Input() set settings(settings: Settings) {
    this._settings = settings;

    this.tableModel = new MdlDefaultTableModel(this.settings.columns);
  }

  get settings() {
    return this._settings;
  }

  @Input() set source(source: any[]) {
    this._source = source || [];

    this.tableModel.data = this._source.map(item => {
      if (!isNullOrUndefined(this.settings) && isArray(this.settings.columns)) {
        for (let column of this.settings.columns) {
          if (!isNullOrUndefined(column.formatter)) {
            item[column.key] = column.formatter(item[column.key], item);
          }
        }
      }
      return Object.assign(new TableItem(), item);
    }) || [];
    this.selected = this.tableModel.data.filter(data => data.selected);
  }

  get source() {
    return this._source;
  }

  tableModel: IMdlTableModel;
  selected: IMdlTableModelItem[] = [];

  constructor() {
  }

  ngOnInit() {
    if (isNullOrUndefined(this.selectable)) {
      this.selectable = false;
    }
  }

  selectionChanged($event) {
    this.selected = $event.value;
  }
}
