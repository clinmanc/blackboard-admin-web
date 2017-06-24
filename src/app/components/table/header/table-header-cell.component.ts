import {
  Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TableColumn } from '../table-column';

@Component({
  selector: 'app-table-header-cell',
  template: `
    <span [ngClass]="{ 'sorted-column': sort === column.key }">
      <span *ngIf="column.sortable" class="sort-icon-container">
        <md-icon *ngIf="(mouseover &&  sort !== column.key && peekDirection == 'asc')
         || (sort === column.key && direction === 'asc')" [ngClass]="{ 'sort-icon-hover':
         mouseover && sort !== column.key && peekDirection == 'asc' }">arrow_upward</md-icon>
        <md-icon *ngIf="(mouseover && sort !== column.key &&  peekDirection == 'desc')
         || (sort === column.key && direction === 'desc')" [ngClass]="{ 'sort-icon-hover':
         mouseover && sort !== column.key && peekDirection == 'desc' }">arrow_downward</md-icon>
      </span>
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    md-icon {
      vertical-align: middle;
      margin-top: -2px;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .sort-icon-container {
      display: inline-block;
      width: 18px;
      height: 18px;
    }

    .sorted-column {
      color: rgba(0, 0, 0, .87)
    }

    .sort-icon-hover {
      color: rgba(0, 0, 0, .38)
    }
  `]
})
export class TableHeaderCellComponent implements OnInit, OnDestroy {
  @Input() column: TableColumn;
  @Input() sort: string;
  @Input() direction: string;
  @Output() sortChange = new EventEmitter<string>();
  @Output() directionChange = new EventEmitter<string>();

  mouseover: boolean;
  peekDirection = 'desc';

  @ViewChild('cellTemplate', {read: ViewContainerRef}) cellTemplate: ViewContainerRef;

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
  }

  @HostListener('click')
  onClick() {
    if (this.column.sortable) {
      if (this.sort === this.column.key) {
        if (this.direction === 'desc') {
          this.direction = 'asc';
          this.peekDirection = this.direction;
        } else {
          this.direction = 'desc';
          this.peekDirection = this.direction;
        }
      } else {
        this.sort = this.column.key;
        this.direction = this.peekDirection;
      }
      this.sortChange.emit(this.sort);
      this.directionChange.emit(this.direction);
    }
  }

  @HostListener('mouseover')
  onMouseover() {
    this.mouseover = true;
  }

  @HostListener('mouseleave')
  onMouseleave() {
    this.mouseover = false;
  }
}
