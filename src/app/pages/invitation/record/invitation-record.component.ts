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
  toolbar = {};

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
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.search();
  }

  buildForm(): void {

    this.searchForm = this.formBuilder.group({
      invitationCode: ['', [Validators.maxLength(6)]]
    });
  }

  search() {
    this.subscribeQuery(this.load(new Pageable()));
  }

  load(pageable = this.pageable): Observable<Page<any>> {
    this.pageable = pageable;
    const formModel = this.searchForm.value;
    const queryInput = {
      keyword: formModel.invitationCode
    };

    const observable = this.invitationRecordService.query(Object.assign(queryInput, this.pageable)).$observable;

    observable.subscribe((page) => this.page = page);

    return observable;
  }

  reload(): Observable<Page<any>> {
    return this.subscribeQuery(this.load());
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

    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.startQuery();

    result.map((items) => {
      return items.map(item => {
        return {
          id: item.inviteeId || item.classroomId || item.userId,
          name: item.inviteeName || (item.classroomName && `(${item.membersCount}人) ${item.classroomName}`) || item.userName
        };
      });
    }).subscribe((items) => {
      dialogRef.componentInstance.completeQuery();
      dialogRef.componentInstance.items = items;
    }, () => {
      dialogRef.componentInstance.completeQuery();
      this.handleError.bind(this);
    })
  }
}
