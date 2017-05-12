import { Component, OnInit } from '@angular/core';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { CellInfo, Column } from '../../components/table/table.component';
import { ViewComponent } from '../../components/table/view.component';
import { BasePage } from '../base-page';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
import { Observable } from 'rxjs/Observable';
import { SchoolService } from './school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  providers: [SchoolService]
})
export class SchoolComponent extends BasePage implements OnInit {
  page = new Page<any>();
  pageable = new Pageable();
  columns: Column[] = [
    { key: 'name', name: '学校', sortable: true },
    { key: 'members', name: '注册用户', sortable: true, numeric: true, renderComponent: ViewComponent }
  ];

  constructor(protected snackBar: MdSnackBar,
    private schoolService: SchoolService,
    private dialog: MdDialog) {
    super(snackBar);
  }

  ngOnInit() {
    this.search();
  }

  search() {

    this.startQuery();
    return this.schoolService.query(this.pageable).$observable
      .subscribe((page) => {
        this.page = page;
        this.completeQuery();
      }, this.handleError.bind(this));
  }

  openViewDialog(event: CellInfo) {
    const type = event.column.key;

    let result: Observable<any>;
    let title;
    if (type === 'members') {
      result = this.schoolService.query().$observable;
      title = '成员列表';
    } else if (type === 'messages') {
      result = this.schoolService.query().$observable;
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

  switchPage(pageable: Pageable) {
    this.pageable = pageable;
    this.search();
  }
}
