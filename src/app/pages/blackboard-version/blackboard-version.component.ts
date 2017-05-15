import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../base-page';
import { TableColumn } from '../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { Observable } from 'rxjs/Observable';
import { BlackboardVersionService } from './blackboard-version.service';

@Component({
  selector: 'app-blackboard-version',
  templateUrl: './blackboard-version.component.html',
  styleUrls: ['./blackboard-version.component.scss'],
  providers: [BlackboardVersionService]
})
export class BlackboardVersionComponent extends BasePage implements OnInit {
  columns: TableColumn[] = [];
  data = [];

  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(protected snackBar: MdSnackBar,
    private blackboardVersionService: BlackboardVersionService,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.search();

    this.columns = [
      { key: 'name', name: '当前版本', sortable: true },
      { key: 'downloadUrl', name: '下载地址', sortable: true, cellTemplate: this.viewImpl },
      { key: 'description', name: '版本描述', sortable: true },
      { key: 'mandatoryUpdate', name: '强制更新', sortable: true },
      { key: 'createTime', name: '创建时间', sortable: true }
    ];
  }

  search() {

    this.startQuery();
    return this.blackboardVersionService.query().$observable
      .subscribe((data) => {
        this.completeQuery();
        this.data = [data];
      }, this.handleError.bind(this));
  }

  openViewDialog(event) {
    const type = event.column.key;

    let result: Observable<any>;
    let title;
    if (type === 'members') {
      result = this.blackboardVersionService.query().$observable;
      title = '成员列表';
    } else if (type === 'messages') {
      result = this.blackboardVersionService.query().$observable;
      title = '消息列表';
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

