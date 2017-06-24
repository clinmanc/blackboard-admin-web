import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../base-page';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { TableColumn } from '../../components/table/table-column';
import { PromotersInfoService } from './promoter-info.service';
import {ConfirmDialogComponent} from '../../components/dialog/confirm/confirm-dialog.component';
import {PromoterInfoCreateComponent} from './create/promoter-info-create.component';

@Component({
  selector: 'app-promoter-info',
  templateUrl: './promoter-info.component.html',
  styleUrls: ['./promoter-info.component.scss'],
  providers: [PromotersInfoService]
})
export class PromoterInfoComponent extends BasePage implements OnInit {
  page = new Page<any>();
  pageable = new Pageable();
  columns: TableColumn[] = [];
  toolbar = {};
  createForm: FormGroup;

  @ViewChild('actionImpl') actionImpl: TemplateRef<any>;
  @ViewChild('confirm') confirm: MdDialogRef<any>;

  constructor(
    snackBar: MdSnackBar,
    private dialog: MdDialog,
    private promotersInfoService: PromotersInfoService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      {key: 'realname', name: '用户名称'},
      {key: 'mobile', name: '手机号'},
      {key: 'province', name: '省'},
      {key: 'city', name: '城市'},
      {key: 'invitedNumber', name: '邀请码'},
      {key: 'operation', name: '操作', cellTemplate: this.actionImpl }
    ];
    this.toolbar = {
      persistentButtons: [{name: '添加', action: this.add.bind(this)}],
      iconButtons: [{icon: 'refresh', action: this.reload.bind(this)}],
      contextualIconButtons: [],
      menus: []
    };

    this.search();
  }

  search() {
    this.load(new Pageable());
  }

  add() {
    const dialogRef: MdDialogRef<PromoterInfoCreateComponent> = this.dialog.open(PromoterInfoCreateComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.reload();
      }
    });
  }

  clear(id) {
    const comfirmDialog: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    comfirmDialog.componentInstance.content = '删除后不可恢复，确认删除吗？';
    comfirmDialog.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.promotersInfoService.remove({id: id}).$observable
          .subscribe(this.reload.bind(this), this.handleError.bind(this));
      }
    })
  }

  edit(row) {
    alert(row);
  }

  load(pageable = this.pageable) {
    this.pageable = pageable;
    const input = Object.assign({}, this.pageable);

    this.withHandler(this.promotersInfoService.query(input).$observable)
      .subscribe(page => this.page = page);
  }

  private reload() {
    this.load();
  }
}
