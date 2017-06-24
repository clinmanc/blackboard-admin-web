import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../base-page';
import { TableColumn } from '../../../components/table/table-column';
import { MdSnackBar } from '@angular/material';
import { SysBatchService } from './sys-batch.service';
import { Observable } from 'rxjs/Observable';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-sys-batch',
  templateUrl: './sys-batch.component.html',
  styleUrls: ['./sys-batch.component.scss'],
  providers: [SysBatchService],
})
export class SysBatchComponent extends BasePage implements OnInit {
  searchForm: FormGroup;
  data$: Observable<any[]>;
  columns: TableColumn[] = [];
  selected = [];
  toolbar = {};

  jobNames$: Observable<string[]>;
  jobInstances$: Observable<any[]>;
  jobExecutions$: Observable<any[]>;

  constructor(
    snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private sysBatchService: SysBatchService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.columns = [
      { key: 'stepName', name: '步骤名称', maxWidth: 200 },
      { key: 'jobParameters.parameters', name: '任务参数', pipe: new JsonPipe(), maxWidth: 200 },
      { key: 'startTime', name: '开始时间', numeric: true },
      { key: 'endTime', name: '结束时间', numeric: true },
      { key: 'status', name: '状态' },
      { key: 'readCount', name: '读取', numeric: true },
      { key: 'writeCount', name: '写入', numeric: true },
      { key: 'commitCount', name: '提交', numeric: true },
      { key: 'readSkipCount', name: '读取跳过', numeric: true },
      { key: 'filterCount', name: '过滤', numeric: true },
      { key: 'skipCount', name: '跳过', numeric: true },
      { key: 'processSkipCount', name: '处理跳过', numeric: true },
      { key: 'writeSkipCount', name: '写入跳过', numeric: true },
      { key: 'rollbackCount', name: '回滚', numeric: true }
    ];
    this.toolbar = {
      persistentButtons: [{ name: '添加', action: this.add.bind(this) }],
      iconButtons: [{ icon: 'refresh', action: this.reload.bind(this) }],
      contextualIconButtons: [],
      menus: []
    };

    this.buildForm();
    this.loadJobNames();
    this.load();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      jobName: ['', Validators.required],
      jobInstance: [0, Validators.required],
      jobExecution: [0, Validators.required]
    });
  }

  load() {
    this.data$ = this.withHandler(this.sysBatchService.queryAllStepExecutions().$observable);
  }

  search() {
    this.load();
  }

  reload() {
    this.load();
  }

  add() {
  }

  loadJobNames() {
    this.jobNames$ = this.withHandler(this.sysBatchService.queryJobNames().$observable)
      .map(jobs => jobs.map(job => job.name as string));
  }

  onJobNameChange(event) {
    this.jobInstances$ = this.withHandler(this.sysBatchService.queryJobInstances({ name: event.value }).$observable);
  }

  onJobInstanceChange(event) {
    this.jobExecutions$ = this.withHandler(this.sysBatchService.queryJobExecutions({ instanceId: event.value }).$observable);
  }

  onJobExecutionChange(event) {
    // this.data = this.searchForm.value.
  }
}
