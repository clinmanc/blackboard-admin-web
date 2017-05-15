import {
  Component, HostBinding, Input, OnDestroy, OnInit, PipeTransform, ViewChild, ViewContainerRef
} from '@angular/core';
import { TableColumn } from '../table-column';

@Component({
  selector: 'app-table-body-cell',
  template: `
    <ng-template #cellTemplate
      *ngIf='column.cellTemplate; else cellTemplateElseBlock'
      [ngTemplateOutlet]='column.cellTemplate'
      [ngOutletContext]='{
        value: value,
        column: column,
        row: row,
        index: index
      }'>
    </ng-template>
    <ng-template #cellTemplateElseBlock>
      {{ value }}
    </ng-template>
  `
})
export class TableBodyCellComponent implements OnInit, OnDestroy {

  @Input() column: TableColumn;
  @Input() index: number;
  @Input() row: any;

  get value(): any {
    if (!this.row || !this.column || !this.column.key) { return ''; }

    const val = this.row[this.column.key];
    const userPipe: PipeTransform = this.column.pipe;

    if (userPipe) { return userPipe.transform(val); }
    if (val !== undefined) { return val; }
    return '';
  }

  @ViewChild('cellTemplate', { read: ViewContainerRef }) cellTemplate: ViewContainerRef;

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  @HostBinding('style.minWidth.px')
  get minWidth(): number {
    return this.column.width;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number {
    return this.column.minWidth;
  }

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
  }
}
