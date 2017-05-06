import { Component, EventEmitter, Input, OnInit, Optional, Output, ViewEncapsulation } from '@angular/core';
import { isUndefined } from "util";
import { Pageable } from "../pageable";
import { Page } from "../page";

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
  onSwitchPage = new EventEmitter<Pageable>();

  constructor() {
  }

  ngOnInit() {
    if (isUndefined(this.pageable)) {
      this.pageable = new Pageable();
    }
    if (isUndefined(this.page)) {
      this.page = new Page();
    }
    if (isUndefined(this.rowsPerPages)) {
      this.rowsPerPages = [10, 20, 50, 100];
    }
  }

  goToPreviousPage() {
    this.pageable.page -= 1;
    if (this.pageable.page < 0) {
      this.pageable.page = 0;
    }

    this.onSwitchPage.emit(this.pageable);
  }

  goToNextPage() {
    this.pageable.page += 1;
    if (this.pageable.page < 0) {
      this.pageable.page = 0;
    }

    this.onSwitchPage.emit(this.pageable);
  }

  rowsPerPageChanged() {
    this.onSwitchPage.emit(this.pageable);
  }
}
