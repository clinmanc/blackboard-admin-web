import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view',
  template: `
    <a (click)="view.emit(value)">{{text}}</a>
  `
})
export class ViewComponent {
  @Input() text: any;
  @Input() value: any;
  @Output() view = new EventEmitter<any>();
}

