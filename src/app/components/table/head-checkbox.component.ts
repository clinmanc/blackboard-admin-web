import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-table-head-checkbox',
  template: `
    <md-checkbox [(ngModel)]="selectAll"></md-checkbox>
  `
})
export class HeadCheckboxComponent {
  selectAll = false;
}
