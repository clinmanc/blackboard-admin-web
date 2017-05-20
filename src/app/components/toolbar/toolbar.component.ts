import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface ToolbarActionButton {
  name?: string;
  icon?: string,
  routerLink?: any;
  action?: (event) => void;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  toolbar: {
    persistentButtons?: ToolbarActionButton [], iconButtons?: ToolbarActionButton [],
    contextualIconButtons?: ToolbarActionButton [], menus?: ToolbarActionButton []};
  @Input()
  selected: any[] = [];

  noop = function () {};

  constructor() { }

  ngOnInit() { }
}
