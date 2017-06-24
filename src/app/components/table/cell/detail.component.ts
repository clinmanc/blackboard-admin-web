import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  template: `
    <span class="app-detail-src">{{value}}</span>
    <!--<md-card class="app-detail-tar">-->
      <!--<md-card-content>-->
        <!--<md-list>-->
          <!--<md-list-item *ngFor="let key of getKeys(items)">-->
            <!--{{key}} : {{items[key]}}-->
          <!--</md-list-item>-->
        <!--</md-list>-->
      <!--</md-card-content>-->
    <!--</md-card>-->
  `,
  styles: [`
    .app-detail-src:hover .app-detail-tar {
      visibility: visible;
    }

    .app-detail-tar {
      visibility: hidden;
    }
  `]
})
export class DetailComponent implements OnInit {
  @Input()
  value: any;
  @Input()
  items: any;

  constructor() { }

  ngOnInit() { }

  getKeys(items = {}) {
    return Object.keys(items);
  }
}
