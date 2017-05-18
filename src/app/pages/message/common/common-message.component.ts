import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { CommonMessageService } from './common-message.service';
import { Page } from '../../../shared/page';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';

@Component({
  selector: 'app-common-message',
  templateUrl: './common-message.component.html',
  styleUrls: ['./common-message.component.scss'],
  providers: [CommonMessageService]
})
export class CommonMessageComponent extends BasePage implements OnInit {

  searchForm: FormGroup;

  page = new Page<any>();
  pageable: Pageable = Object.assign(new Pageable(), { size: 50 });
  columns: TableColumn[] = [];

  constructor(protected snackBar: MdSnackBar,
    private commonMessageService: CommonMessageService,
    private formBuilder: FormBuilder) {
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
    const formModel = this.searchForm.value;

    this.startQuery();
    return this.commonMessageService.query(this.pageable).$observable
      .subscribe((page) => {
        this.page = page;
        this.completeQuery();
      }, this.handleError.bind(this));
  }

  loadPage(pageable = new Pageable()) {
    this.pageable = pageable;
    this.search();
  }
}