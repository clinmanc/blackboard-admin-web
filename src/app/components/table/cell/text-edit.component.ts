import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-edit',
  template: `
    <a *ngIf="!isEdit" (click)="statusChange();">{{value}}</a>
    <md-input-container *ngIf="isEdit">
      <input autofocus="autofocus" mdInput [(ngModel)]="value" [maxlength]="maxlength" (blur)="saveDate()">
    </md-input-container>

  `
})


export class TextEditComponent implements OnInit {

  @Output() edit = new EventEmitter<any>();
  @Input() extra: any;
  @Input() maxlength: number;
  @Input() value: any;

  originalValue: any;
  isEdit = false;

  constructor() {}

  saveDate() {
    if (this.originalValue === this.value) {
      this.isEdit = false;
      return;
    }
    this.edit.emit({value: this.value, extra: this.extra});
    this.isEdit = false;
  }

  statusChange() {
    this.originalValue = this.value;
    this.isEdit = true;
    // this.vc.nativeElement.focus();
  }

  ngOnInit() { }

}
