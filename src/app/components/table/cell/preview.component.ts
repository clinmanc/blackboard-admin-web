import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as Drop from 'tether-drop';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-preview',
  template: `
    <span class="app-thumbnail-container">
        <img #thumbnailEle height="24" [src]="thumbnail">
    </span>
    <span>{{text}}</span>
  `,
  styles: [`
    .app-thumbnail-container {
      display: inline-block;
      min-width: 24px;
      text-align: center;
    }

    .drop-element {
      margin-left: 80px;
      border: 10px solid #fff;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
      z-index: 1000;
      opacity: 0;
    }

    .drop-element.drop-after-open {
      transition: opacity .5s ease-in-out;
      opacity: 1;
    }
  `]
})
export class PreviewComponent implements OnInit, OnDestroy {

  @Input() thumbnail: any;
  @Input() original: any;

  @Input() text: any;

  @ViewChild('thumbnailEle') thumbnailRef: ElementRef;

  dropInstance: Drop;

  constructor() { }

  ngOnInit() {
    this.dropInstance = new Drop({
      target: this.thumbnailRef.nativeElement,
      content: `<img width="240" src="${this.original}" alt="图片">`,
      position: 'right middle',
      openOn: 'hover',
      remove: true
    });
  }

  ngOnDestroy() {
    if (this.dropInstance) {
      this.dropInstance.destroy();
    }
  }
}
