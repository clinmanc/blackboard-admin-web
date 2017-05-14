import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableColumnHeader]'
})
export class TableColumnHeaderDirective {

  constructor(public template: TemplateRef<any>) { }

}
