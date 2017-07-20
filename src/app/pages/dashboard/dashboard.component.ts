import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BasePage } from '../base-page';
import { DashboardService } from './dashboard-service.service';
import { AuthHelper } from '../../helper/authorization-helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent extends BasePage implements OnInit {
  developmentLogs: Observable<any[]>;
  writeLog = false;
  hasWriteLogPermission = false;
  editingLog: any;

  constructor(
    snackBar: MdSnackBar,
    private dashboardService: DashboardService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.hasWriteLogPermission = AuthHelper.hasPermission('写开发日志');
    this.search();
  }
  search() {
    this.load();
  }

  load() {
    this.developmentLogs = this.withHandler(this.dashboardService.query().$observable);
  }

  create(log) {
    this.withHandler(this.dashboardService.save(log).$observable)
      .subscribe(() => {
        this.writeLog = false;
        this.editingLog = {};
        this.search();
      });
  }

  update(log) {
    const input = Object.assign({}, this.editingLog, log);

    this.withHandler(this.dashboardService.update(input).$observable)
      .subscribe(() => {
        this.writeLog = false;
        this.editingLog = {};
        this.search();
      });
  }

  onEdit(log: any) {
    this.editingLog = {
      id: log.id,
      title: log.title,
      content: log.content,
      createTime: log.createTime,
      updateTime: log.updateTime
    };

    this.writeLog = true;
  }

  remove(id: string) {
    this.withHandler(this.dashboardService.remove({ id : id}).$observable)
      .subscribe(() => {
        this.search();
      });
  }
}
