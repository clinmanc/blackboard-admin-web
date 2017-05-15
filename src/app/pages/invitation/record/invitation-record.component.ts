import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { BasePage } from '../../base-page';
import { TableColumn } from '../../../components/table/table-column';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';
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

  constructor(
    protected snackBar: MdSnackBar,
    private invitationRecordService: InvitationRecordService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog) {
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
  }

  buildForm(): void {

    this.searchForm = this.formBuilder.group({
      invitationCode: ['150608', [Validators.maxLength(6)]]
    });
  }


  search() {
    const formModel = this.searchForm.value;
    const queryInput = {
      keyword: formModel.invitationCode
    };

    this.startQuery();
    this.invitationRecordService.query(Object.assign(queryInput, this.pageable)).$observable
      .subscribe(page => {
        this.page = page;
        this.completeQuery();
      }, this.handleError.bind(this));
  }

  onSwitchPage(pageable: Pageable = new Pageable()) {
    this.pageable = pageable;

    this.search();
  }

  openViewDialog(event) {
    this.openDialog(event.column.key, event.row.invitationCode);
  }

  openDialog(type: string, invitationCode: string) {
    const formModel = this.searchForm.value;
    const queryInput = {
      invitationCode: invitationCode,
      from: formModel.from,
      to: formModel.to
    };

    let result: Observable<any>;
    let title;
    if (type === 'inviteeNum') {
      result = this.invitationRecordService.query(queryInput).$observable;
      title = '老师列表';
    } else if (type === 'classroomNum') {
      result = this.invitationRecordService.query(queryInput).$observable;
      title = '班级列表';
    } else if (type === 'userNum') {
      result = this.invitationRecordService.query(queryInput).$observable;
      title = '用户列表';
    } else {
      return;
    }

    let dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.startQuery();

    result.map((items) => {
      let result = [];
      items.forEach((item) => result.push([
        item.inviteeId || item.classroomId || item.userId,
        item.inviteeName || (item.classroomName && `(${item.membersCount}人) ${item.classroomName}`) || item.userName
      ]));
      return result
    }).subscribe((items) => {
      dialogRef.componentInstance.completeQuery();
      dialogRef.componentInstance.items = items;
    }, () => {
      dialogRef.componentInstance.completeQuery();
      this.handleError.bind(this);
    })
  }
}
