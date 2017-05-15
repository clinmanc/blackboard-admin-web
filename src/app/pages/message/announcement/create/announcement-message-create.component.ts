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

  constructor(protected snackBar: MdSnackBar,
    private location: Location,
    private announcementMessageService: AnnouncementMessageService,
    private formBuilder: FormBuilder) {
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


    this.startQuery();
    return this.announcementMessageService.save({
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
    }).$observable
      .subscribe(() => {
        this.completeQuery();
        this.location.back();
      }, this.handleError.bind(this));
  }
}
