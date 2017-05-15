import { PipeTransform, TemplateRef } from '@angular/core';

export class TableColumn {
  key?= '';
  name?= '';
  numeric?= false;
  sortable?= false;
  pipe?: PipeTransform;
  cellTemplate?: TemplateRef<any>;
  width?= 150;
  minWidth?= 100;
  maxWidth?: number;
}
