import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { ItemListDialogComponent } from '../../components/dialog/item-list/item-list-dialog.component';
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
  columns: TableColumn[] = [];
  toolbar = {};

  @ViewChild('viewImpl') viewImpl: TemplateRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private schoolService: SchoolService,
    private dialog: MdDialog
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'name', name: '学校' },
      { key: 'members', name: '注册人员', cellTemplate: this.viewImpl }
    ];
    this.toolbar = {
      persistentButtons: [],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.search();
  }

  search() {
    this.load(new Pageable());
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;

    this.withHandler(this.schoolService.query(this.pageable).$observable)
      .subscribe(page => this.page = page);
  }

  reload() {
    this.load();
  }

  openViewDialog(event) {
    const dialogRef: MdDialogRef<ItemListDialogComponent> = this.dialog.open(ItemListDialogComponent);
    dialogRef.componentInstance.title = '人员列表';
    dialogRef.componentInstance
      .withHandler(this.schoolService.queryMembers({
        school: event.row.name
      }).$observable)
      .subscribe(items => dialogRef.componentInstance.items = items);
  }
}
