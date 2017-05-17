import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { MdSnackBar } from '@angular/material';
import { UserLocationStatisticsService } from './user-location-statistics.service';

@Component({
  selector: 'app-user-location-statistics',
  templateUrl: './user-location-statistics.component.html',
  styleUrls: ['./user-location-statistics.component.scss'],
  providers: [UserLocationStatisticsService]
})
export class UserLocationStatisticsComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    protected snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private userLocationStatisticsService: UserLocationStatisticsService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '时间范围', sortable: true }
    ];

    this.buildForm();
    this.search();
  }

  buildForm(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();

    // const from: string = `${year}-${month}-01`;
    const from = `${year}-01-01`;
    const to = `${year}-${month}-${day}`;

    this.searchForm = this.formBuilder.group({
      from: [from, [Validators.required]],
      to: [to, [Validators.required]]
    });
  }

  search() {
    this.startQuery();
    return this.userLocationStatisticsService.query().$observable
      .subscribe((page) => {
        this.page = page;
        this.completeQuery();
      }, this.handleError.bind(this));
  }

  onSwitchPage(pageable: Pageable = new Pageable()) {
    this.pageable = pageable;

    this.search();
  }
}
