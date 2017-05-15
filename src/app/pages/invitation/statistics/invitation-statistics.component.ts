import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { InvitationStatisticsService } from './invitation-statistics.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../base-page';
import { Page } from '../../../shared/page';
import { Pageable } from '../../../shared/pageable';
import { TableColumn } from '../../../components/table/table-column';
import { ItemListDialogComponent } from '../../../components/dialog/item-list/item-list-dialog.component';
import { ViewComponent } from '../../../components/table/cell/view.component';

@Component({
  selector: 'app-invitation-statistics',
  templateUrl: './invitation-statistics.component.html',
  styleUrls: ['./invitation-statistics.component.scss'],
  providers: [InvitationStatisticsService]
})
export class InvitationStatisticsComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];

  @ViewChild('inviterDisplay') inviterDisplay: TemplateRef<any>;
  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    protected snackBar: MdSnackBar,
    private invitationStatisticsService: InvitationStatisticsService,
    private formBuilder: FormBuilder,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();

    this.columns = [
      { key: 'inviter', name: '邀请人', sortable: true, cellTemplate: this.inviterDisplay },
      { key: 'invitationCode', name: '邀请码', sortable: true },
      { key: 'inviteeNum', name: '邀请的老师数量', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'classroomNum', name: '邀请的老师创建的班级数量', sortable: true, numeric: true, cellTemplate: this.viewImpl },
      { key: 'userNum', name: '申请加入班级的人员数量', sortable: true, numeric: true, cellTemplate: this.viewImpl }
    ];
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
      invitationCodes: ['150608', [Validators.required, Validators.minLength(6)]],
      from: [from, [Validators.required]],
      to: [to, [Validators.required]]
    });
  }

  search() {
    const formModel = this.searchForm.value;
    const queryInput = {
      invitationCodes: formModel.invitationCodes,
      from: formModel.from,
      to: formModel.to
    };

    this.startQuery();
    this.invitationStatisticsService.queryStatistics(Object.assign(queryInput, this.pageable)).$observable
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
      result = this.invitationStatisticsService.queryTeachers(queryInput).$observable;
      title = '老师列表';
    } else if (type === 'classroomNum') {
      result = this.invitationStatisticsService.queryClassrooms(queryInput).$observable;
      title = '班级列表';
    } else if (type === 'userNum') {
      result = this.invitationStatisticsService.queryMembers(queryInput).$observable;
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
