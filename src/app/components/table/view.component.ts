import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sys-role-view',
  template: `
    <a (click)="renderSubject.next(renderValue.value, renderValue.row, renderValue.index)">{{renderValue.value}}</a>
  `
})
export class ViewComponent {
  renderValue: any = {};

  renderSubject: Subject<any>;
}
