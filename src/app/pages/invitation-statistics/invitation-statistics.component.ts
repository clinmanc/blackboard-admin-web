import { Component, OnInit } from '@angular/core';
import { Page } from '../../components/page';
import { Pageable } from '../../components/pageable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvitationStatisticsService } from './invitation-statistics.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../base-page';
import { ItemListDialogComponent } from '../../components/item-list-dialog/item-list-dialog.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-invitation-statistics',
  templateUrl: './invitation-statistics.component.html',
  styleUrls: ['./invitation-statistics.component.scss'],
  providers: [InvitationStatisticsService]
})
export class InvitationStatisticsComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  source: any[];
  page: Page<any>;
  pageable: Pageable;
  settings = {
    columns: [
      { key: 'inviter', name: '邀请人', sortable: true },
      { key: 'invitationCode', name: '邀请码', sortable: true },
      { key: 'inviteeNum', name: '邀请的老师数量', sortable: true, numeric: true },
      { key: 'classroomNum', name: '邀请的老师创建的班级数量', sortable: true, numeric: true },
      { key: 'userNum', name: '申请加入班级的人员数量', sortable: true, numeric: true }
    ]
  };

  constructor(private invitationStatisticsService: InvitationStatisticsService, private formBuilder: FormBuilder
    , protected snackBar: MdSnackBar, private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();

    // const from: string = `${year}-${month}-01`;
    const from: string = `${year}-01-01`;
    const to: string = `${year}-${month}-${day}`;

    this.searchForm = this.formBuilder.group({
      invitationCodes: ['150608', [Validators.required, Validators.minLength(6)]],
      from: [from, [Validators.required]],
      to: [to, [Validators.required]]
    });
  }

  search() {
    const formModel = this.searchForm.value;

    this.startQuery();
    this.invitationStatisticsService.searchStatistics(formModel.invitationCodes, formModel.from, formModel.to, this.pageable)
      .subscribe(page => {
        this.source = page.content;
        this.page = page;
        this.completeQuery();
      }, this.handleError.bind(this));
  }

  onSwitchPage(pageable: Pageable) {
    this.pageable = pageable;

    this.search();
  }

  openDialog(type: string, invitationCode: string) {
    const formModel = this.searchForm.value;

    let result: Observable<any>;
    let title;
    if (type === 'invitees') {
      result = this.invitationStatisticsService.listTeachers(invitationCode, formModel.from, formModel.to);
      title = '老师列表';
    } else if (type === 'classrooms') {
      result = this.invitationStatisticsService.listClassrooms(invitationCode, formModel.from, formModel.to);
      title = '班级列表';
    } else if (type === 'users') {
      result = this.invitationStatisticsService.listMembers(invitationCode, formModel.from, formModel.to);
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
