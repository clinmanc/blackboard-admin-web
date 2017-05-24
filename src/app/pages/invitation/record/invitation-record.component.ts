import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { BasePage } from '../../base-page';
import { TableColumn } from '../../../components/table/table-column';
import { InvitationRecordService } from './invitation-record.service';

@Component({
  selector: 'app-invitation-record',
  templateUrl: './invitation-record.component.html',
  styleUrls: ['./invitation-record.component.scss'],
  providers: [InvitationRecordService]
})
export class InvitationRecordComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  toolbar = {};

  constructor(
    snackBar: MdSnackBar,
    private invitationRecordService: InvitationRecordService,
    private formBuilder: FormBuilder
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();

    this.columns = [
      { key: 'inviter', name: '邀请老师（电话）' },
      { key: 'invitationCode', name: '邀请码', sortable: true },
      { key: 'invitee', name: '被邀请老师（电话）', sortable: true },
      { key: 'invitationTime', name: '邀请时间', sortable: true, numeric: true }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.search();
  }

  buildForm() {

    this.searchForm = this.formBuilder.group({
      invitationCode: ['', [Validators.maxLength(6)]]
    });
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;
    const formModel = this.searchForm.value;

    const input = Object.assign({
      keyword: formModel.invitationCode
    }, this.pageable);

    this.withHandler(this.invitationRecordService.query(input).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }
}
