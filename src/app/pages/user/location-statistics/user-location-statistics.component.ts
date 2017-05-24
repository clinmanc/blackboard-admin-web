import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { MdSnackBar } from '@angular/material';
import { UserLocationStatisticsService } from './user-location-statistics.service';
import * as moment from 'moment';

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
  selected: any[] = [];
  toolbar = {};

  @ViewChild('previewImpl') previewImpl: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private userLocationStatisticsService: UserLocationStatisticsService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '日期范围', sortable: true }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [{ name: '重新生成', icon: 'autorenew' }],
      menus: []
    };
    this.buildForm();

    this.search();
  }

  buildForm() {
    const from = moment().startOf('year').format('YYYY-MM-DD');
    const to = moment().format('YYYY-MM-DD');

    this.searchForm = this.formBuilder.group({
      from: [from, [Validators.required]],
      to: [to, [Validators.required]]
    });
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.userLocationStatisticsService.query().$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  select(selected) {
    this.selected = selected;
  }
}
