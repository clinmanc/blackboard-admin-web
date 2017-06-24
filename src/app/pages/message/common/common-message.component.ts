import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { CommonMessageService } from './common-message.service';
import { Page } from '../../../shared/page';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-common-message',
  templateUrl: './common-message.component.html',
  styleUrls: ['./common-message.component.scss'],
  providers: [CommonMessageService]
})
export class CommonMessageComponent extends BasePage implements OnInit {
  defaultPageable = Object.assign(new Pageable(), { size: 25 });
  environment = environment;

  searchForm: FormGroup;

  page = new Page<any>();
  pageable: Pageable = this.defaultPageable;
  columns: TableColumn[] = [];

  constructor(
    snackBar: MdSnackBar,
    private commonMessageService: CommonMessageService,
    private formBuilder: FormBuilder
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
    this.search();
  }

  buildForm(): void {
    this.searchForm = this.formBuilder.group({});
  }

  search() {
    this.load();
  }

  load(pageable = this.defaultPageable) {
    this.pageable = pageable;

    this.withHandler(this.commonMessageService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load(this.defaultPageable);
  }
}
