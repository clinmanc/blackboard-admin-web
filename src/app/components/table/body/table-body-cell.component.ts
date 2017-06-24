import {
  Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, PipeTransform, ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { TableColumn } from '../table-column';
import { TableColumnPipe } from '../column/table-column.pipe';

@Component({
  encapsulation: ViewEncapsulation.None,
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
  `,
  styles: [`
    .app-line-limit-length {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `]
})
export class TableBodyCellComponent implements OnInit, OnDestroy {

  @Input() column: TableColumn;
  @Input() index: number;
  @Input() row: any;

  tableColumnPipe = new TableColumnPipe();

  get value(): any {
    if (!this.row || !this.column || !this.column.key) { return ''; }

    const val = this.tableColumnPipe.transform(this.column.key, this.row);
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
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number {
    if (this.column.maxWidth) {
      this.ele.nativeElement.parentNode.title = this.value;
      this.ele.nativeElement.parentNode.style.maxWidth = this.column.maxWidth + 'px';
      this.ele.nativeElement.parentNode.classList.add('app-line-limit-length');
    }
    return this.column.maxWidth;
  }

  constructor(private ele: ElementRef) { }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
  }
}
