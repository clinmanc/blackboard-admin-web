import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-sys-role-view',
  template: `
    <a (click)="renderViewSubject.next(renderValue)">{{renderValue.value}}</a>
  `
})
export class ViewComponent {
  renderValue: any = {};
  renderViewSubject: Subject<any>;
}
