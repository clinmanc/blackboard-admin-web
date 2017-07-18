import {Component} from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../../pages/base-page';
import * as _ from 'lodash';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {ClassroomUserInfoService} from './classroom-user-info.service';

@Component({
  selector: 'app-classroom-user-info',
  templateUrl: './classroom-user-info.component.html',
  styleUrls: ['./classroom-user-info.component.scss'],
  providers: [ClassroomUserInfoService]
})


export class ClassroomUserInfoComponent extends BasePage {
  title: string;
  classroomId: string;
  items: any[];

  searchForm: FormGroup;
  lastFromDate: string;
  lastToDate: string;

  constructor(
    snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private classroomUserInfoService: ClassroomUserInfoService
  ) {
    super(snackBar);
    this.completeQueryDelay = 250;
    this.buildForm();
    // this.search();
  }

  buildForm(): void {
    const fromDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const toDate = moment().format('YYYY-MM-DD');
    this.searchForm = this.formBuilder.group({
      fromDate: [fromDate],
      toDate: [toDate]
    });

    this.lastFromDate = fromDate;
    this.lastToDate = toDate;
  }

  search() {
    const formModel = this.searchForm.value;
    const classroomId = this.classroomId;
    const queryInput = {
      from: formModel.fromDate,
      to: formModel.toDate,
      classroomId: classroomId
    };
    this.withHandler(this.classroomUserInfoService.queryClassroomMembers(queryInput).$observable)
      .subscribe(items => this.items = items);
  }

  getKeys(item) {
    return Object.keys(item).filter(key => !_.startsWith(key, '$'));
  }
}
