import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview',
  template: `
    <div class="app-preview-container">
      <img class="app-thumbnail" width="24px" [src]="thumbnail"/>
      <img class="app-preview" width="160px" [src]="preview"/>
      <span>{{text}}</span>
    </div>
  `,
  styleUrls: ['./preview.component.scss']
})
export class AvatarPreviewComponent {
  @Input() thumbnail: any;
  @Input() preview: any;
  @Input() text: any;

  constructor() { }
}
