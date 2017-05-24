import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnnouncementMessageService } from '../announcement-message.service';
import { BasePage } from '../../../base-page';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-announcement-message-create',
  templateUrl: './announcement-message-create.component.html',
  styleUrls: ['./announcement-message-create.component.scss'],
  providers: [AnnouncementMessageService]
})
export class AnnouncementMessageCreateComponent extends BasePage implements OnInit {
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

  constructor(
    snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private location: Location,
    private announcementMessageService: AnnouncementMessageService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      content: [''],
      title: [''],
      link: ['http://'],
      linkTitle: [''],
      verificationCode: [''],
      receiverType: [''],
      token: ['']
    });
  }

  create() {
    const formModel = this.createForm.value;

    const input = {
      token: formModel.token, // 56e2406a2767c26553ab9dec
      url: `http://127.0.0.1:9123/api/public/message/${formModel.token}/${formModel.receiverType}/${formModel.verificationCode}`,
      data: {
        content: formModel.content,
        title: formModel.title,
        extras: {
          link: {
            title: formModel.linkTitle,
            url: formModel.link
          }
        },
        reciverType: formModel.receiverType
      }
    };

    this.withHandler(this.announcementMessageService.save(input).$observable)
      .subscribe(this.location.back.bind(this));
  }
}
