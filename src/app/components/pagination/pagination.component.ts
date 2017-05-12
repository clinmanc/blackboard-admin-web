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
  pageable: Pageable = new Pageable();
  @Input()
  page: Page<any> = new Page();
  @Input()
  rowsPerPages: number[] = [10, 20, 50, 100];
  @Output()
  change = new EventEmitter<Pageable>();

  constructor() { }

  ngOnInit() { }

  goToPreviousPage() {
    this.pageable.page -= 1;
    if (this.pageable.page < 0) {
      this.pageable.page = 0;
    }

    this.change.emit(this.pageable);
  }

  goToNextPage() {
    this.pageable.page += 1;
    if (this.pageable.page < 0) {
      this.pageable.page = 0;
    }

    this.change.emit(this.pageable);
  }

  rowsPerPageChanged() {
    this.change.emit(this.pageable);
  }
}
