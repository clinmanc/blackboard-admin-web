import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { MdSnackBar } from '@angular/material';
import { UserLocationStatisticsService } from './user-location-statistics.service';
import { Observable } from 'rxjs/Observable';

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

    this.subscribeQuery(this.load(new Pageable()));
  }

  buildForm(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();

    const from = `${year}-01-01`;
    const to = `${year}-${month}-${day}`;

    this.searchForm = this.formBuilder.group({
      from: [from, [Validators.required]],
      to: [to, [Validators.required]]
    });
  }

  load(pageable = this.pageable): Observable<Page<any>> {
    this.pageable = pageable;

    const observable = this.userLocationStatisticsService.query().$observable;

    observable.subscribe(page => this.page = page, () => {});

    return observable;
  }

  reload(): Observable<Page<any>> {
    return this.subscribeQuery(this.load());
  }

  select(selected) {
    this.selected = selected;
  }
}
