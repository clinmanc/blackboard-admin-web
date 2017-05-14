import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { TableColumnHeaderDirective } from './table-column-header.directive';
import { TableColumnCellDirective } from './table-column-cell.directive';

@Directive({
  selector: 'app-table-column',
})
export class TableColumnDirective {

  @Input() key: string;
  @Input() name: string;
  @Input() sortable: boolean;

  @Input()
  @ContentChild(TableColumnHeaderDirective, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  @Input()
  @ContentChild(TableColumnCellDirective, { read: TemplateRef })
  cellTemplate: TemplateRef<any>;

  constructor() { }
}
