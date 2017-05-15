import { Component, ElementRef, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { UserService } from '../user.service';
import { BasePage } from 'app/pages/base-page';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import EChartOption = echarts.EChartOption;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registered-user-statistics',
  templateUrl: './registered-user-statistics.component.html',
  styleUrls: ['./registered-user-statistics.component.scss'],
  providers: [UserService]
})
export class RegisteredUserStatisticsComponent extends BasePage implements OnInit {
  searchForm: FormGroup;

  private chart: ECharts;
  private chartOptions: EChartOption;
  private xAxis = [];
  private yAxis = [];

  constructor(protected snackBar: MdSnackBar,
    private elementRef: ElementRef,
    private userService: UserService,
    private formBuilder: FormBuilder) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
    this.createChart();
    this.search();
  }

  buildForm(): void {
    let now = new Date();
    let year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();

    this.searchForm = this.formBuilder.group({
      month: [`${year}-${month}`, [Validators.required]]
    });
  }

  search() {
    const formModel = this.searchForm.value;

    this.startQuery();
    return this.userService.queryRegisteredStatistics({
      month: formModel.month + '-01'
    }).$observable
      .subscribe((items: any[]) => {
        this.completeQuery();
        this.updateChart(items);
      }, this.handleError.bind(this));
  }

  createChart() {
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(this.elementRef.nativeElement.querySelector('#main'), 'shine');

    // 指定图表的配置项和数据

    this.chartOptions = {
      title: {
        text: '注册用户数',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['注册用户数']
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.xAxis
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} 人'
        }
      },
      series: [
        {
          name: '注册用户数',
          type: 'line',
          areaStyle: { normal: {} },
          data: this.yAxis,
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    this.chart.setOption(this.chartOptions);
  }

  updateChart(items: any[]) {
    items = items.sort((a, b) => {
      const dateA = new Date(Date.parse(a.date.replace(/-/g, '/')));
      const dateB = new Date(Date.parse(b.date.replace(/-/g, '/')));
      return dateA.getTime() - dateB.getTime();
    });

    this.xAxis = [];
    this.yAxis = [];
    for (let item of items) {
      this.xAxis.push(item.date);
      this.yAxis.push(item.count);
    }
    this.chart.setOption({
      xAxis: {
        data: this.xAxis
      },
      series: [{
        data: this.yAxis
      }]
    });
  }
}
