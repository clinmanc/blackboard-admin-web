import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Pageable } from '../../shared/pageable';
import { Page } from '../../shared/page';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  pageable: Pageable;
  @Input()
  page: Page<any>;
  @Input()
  rowsPerPages: number[];
  @Output()
  pageableChange = new EventEmitter<Pageable>();

  constructor() { }

  ngOnInit() {
    if (!this.pageable) {
      this.pageable = new Pageable();
    }
    if (!this.page) {
      this.page = new Page();
    }
    if (!this.rowsPerPages) {
      this.rowsPerPages = [10, 20, 50, 100];
    }
  }

  goToFirstPage() {
    this.pageable.page = 0;
    this.pageableChange.emit(this.pageable);
  }

  goToLastPage() {
    if (this.page.totalPages > 0) {
      this.pageable.page = this.page.totalPages - 1;
    } else {
      this.pageable.page = 0;
    }

    this.pageableChange.emit(this.pageable);
  }

  goToPreviousPage() {
    this.pageable.page -= 1;
    if (this.pageable.page < 0) {
      this.pageable.page = 0;
    }

    this.pageableChange.emit(this.pageable);
  }

  goToNextPage() {
    this.pageable.page += 1;
    if (this.pageable.page < 0) {
      this.pageable.page = 0;
    }

    this.pageableChange.emit(this.pageable);
  }

  rowsPerPageChanged() {
    this.pageableChange.emit(this.pageable);
  }
}
