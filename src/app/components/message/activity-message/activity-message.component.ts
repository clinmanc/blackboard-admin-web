import { Component, Input, OnInit } from '@angular/core';
import { ResourceHelper } from '../../../helper/resource-helper';
import { ActivityMessageService } from './activity-message.service';
import { shrinkInOutAnimation } from '../../../animations/shrink-in-out.animation';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';

@Component({
  selector: 'app-activity-message',
  templateUrl: './activity-message.component.html',
  styleUrls: ['./activity-message.component.scss'],
  animations: [shrinkInOutAnimation],
  providers: [ActivityMessageService]
})
export class ActivityMessageComponent implements OnInit {
  page = new Page<any>();
  pageable = new Pageable();

  @Input()
  message: any;

  showResults = false;

  resourceHelper = ResourceHelper;

  constructor(private activityMessageService: ActivityMessageService) { }

  ngOnInit() {
  }

  toggleShowResults() {
    this.showResults = !this.showResults;
    if (this.showResults) {

      const queryInput = Object.assign({
        userId: this.message.sender.id,
        messageId: this.message.id,
        category: 'ACTIVITY_RESULT',
        fromDate: '2015-01-01',
        toDate: '2018-08-08'
      }, this.pageable);
      this.activityMessageService.query(queryInput).$observable
        .map(res => {
          const page = res as Page<any>;
          page.numberOfElements = page.content.length;
          page.number = this.pageable.page;
          page.size = this.pageable.size;

          page.totalElements = page.content.length !== 0 && this.pageable.page * this.pageable.size + this.pageable.size >
          this.message.feedbacked ? this.pageable.page * this.pageable.size + page.content.length : this.message.feedbacked;
          page.totalPages = this.pageable.size === 0 ? 1 : page.totalElements / page.size;
          page.first = page.number === 0;
          page.last = page.number + 1 >= page.totalPages;
          return page;
        }).subscribe(page => this.page = page);
    }
  }
}
