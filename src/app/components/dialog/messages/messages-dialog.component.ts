import { Component, OnInit } from '@angular/core';
import { BasePage } from '../../../pages/base-page';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-messages-dialog',
  templateUrl: './messages-dialog.component.html',
  styleUrls: ['./messages-dialog.component.scss']
})
export class MessagesDialogComponent extends BasePage implements OnInit {
  defaultPageable = new Pageable();
  environment = environment;

  page = new Page<any>();
  pageable: Pageable;
  title = '消息列表';

  constructor(
    snackBar: MdSnackBar,
    public dialogRef: MdDialogRef<MessagesDialogComponent>
  ) {
    super(snackBar);
    this.completeQueryDelay = 250;
  }

  ngOnInit() {
    this.pageable = Object.assign(new Pageable(), this.defaultPageable);
    this.buildForm();
    this.search();
  }

  buildForm(): void {
    // this.searchForm = this.formBuilder.group({});
  }

  search() {
    this.load(Object.assign(this.pageable, { page: 0 }));
  }

  load(pageable?: Pageable) { }

  reload() {
    this.load();
  }

  getSortedKeys(item) {
    return Object.keys(item).sort();
  }
}
