import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WelcomeMessageService } from '../welcome-message.service';
import { BasePage } from '../../../base-page';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-welcome-message-create',
  templateUrl: './welcome-message-create.component.html',
  styleUrls: ['./welcome-message-create.component.scss'],
  providers: [WelcomeMessageService]
})
export class WelcomeMessageCreateComponent extends BasePage implements OnInit {
  createForm: FormGroup;

  receiverTypes = [{
    value: 'ALL',
    name: '所有'
  }, {
    value: 'PARENT',
    name: '家长'
  }, {
    value: 'STUDENT',
    name: '学生'
  }, {
    value: 'TEACHER',
    name: '老师'
  }];

  constructor(protected snackBar: MdSnackBar,
    private location: Location,
    private welcomeMessageService: WelcomeMessageService,
    private formBuilder: FormBuilder) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      order: [],
      content: [''],
      linkTitle: [''],
      link: ['http://'],
      verificationCode: [''],
      receiverType: [''],
      token: ['']
    });
  }

  create() {
    const formModel = this.createForm.value;

    const input = {
      token: formModel.token, // 56e2406a2767c26553ab9dec
      url: `http://127.0.0.1:9123/api/welcomeMessage/${formModel.token}/${formModel.verificationCode}`,
      data: {
        orderNo: formModel.order,
        content: formModel.content,
        title: formModel.linkTitle,
        url: formModel.link,
        reciverType: formModel.receiverType
      }
    };

    this.withHandler(this.welcomeMessageService.save(input).$observable)
      .subscribe(this.location.back.bind(this));
  }
}
