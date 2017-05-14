import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableColumnCell]'
})
export class TableColumnCellDirective {

  constructor(public template: TemplateRef<any>) { }

}
