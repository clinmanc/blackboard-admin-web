import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-avatar-preview',
  template: `
    <div class="app-avatar">
      <img class="app-avatar-thumbnail" width="24px" height="24px" [src]="renderValue.row?.avatar?.small"/>
      <img class="app-avatar-preview" width="160px" height="160px" [src]="renderValue.row?.avatar?.big"/>
      <span>{{renderValue.value}}</span>
    </div>
  `,
  styleUrls: ['./avatar-preview.component.scss']
})
export class AvatarPreviewComponent {
  renderValue: any = {};

  constructor() { }
}
