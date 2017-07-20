import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdSnackBar, MdDialogRef } from '@angular/material';
import { AnnouncementMessageService } from '../announcement-message.service';
import { BasePage } from '../../../base-page';
import { ConfirmDialogComponent } from '../../../../components/dialog/confirm/confirm-dialog.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-announcement-message-create',
  templateUrl: './announcement-message-create.component.html',
  styleUrls: ['./announcement-message-create.component.scss'],
  providers: [AnnouncementMessageService]
})
export class AnnouncementMessageCreateComponent extends BasePage implements OnInit, OnDestroy {
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
  categories = [{
    value: 'NOTICE',
    name: '公告'
  }, {
    value: 'WEEKLY',
    name: '晓周刊'
  }];

  previewCoverSafeUrl: SafeUrl;
  previewCoverSafeStyle: SafeStyle;
  previewCoverUrl: string;
  now: Date;
  messageContent: string;
  cover: File;

  constructor(
    snackBar: MdSnackBar,
    private sanitizer: DomSanitizer,
    private dialog: MdDialog,
    private formBuilder: FormBuilder,
    private location: Location,
    private announcementMessageService: AnnouncementMessageService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();

    setInterval(() => this.now = new Date(), 1000);
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      cover: [],
      category: [],
      content: [''],
      link: ['http://'],
      code: [''],
      destination: ['']
    });
  }

  create() {
    const dialogRef: MdDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.content = this.cover ? '发送后不可撤销，真的要发送吗？' : '未选择封面，真的要发送吗？';
    dialogRef.componentInstance.dismissiveAction.text = '再想想';
    dialogRef.componentInstance.affirmativeAction.text = '发送';
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        const formModel = this.createForm.value;

        const input = {
          token: environment.announcementToken,
          cover: this.cover,
          category: formModel.category,
          content: formModel.content,
          link: formModel.link,
          code: formModel.code,
          destination: formModel.destination
        };

        this.withHandler(this.announcementMessageService.save(input))
          .subscribe(() => this.snackBar.open('发送成功', '知道了', {duration: 5000}));
      }
    });
  }

  onFileChange(files: FileList) {
    if (this.previewCoverUrl) {
      window.URL.revokeObjectURL(this.previewCoverUrl);
    }

    if (files.length > 0) {
      this.cover = files[0];
      this.previewCoverUrl = window.URL.createObjectURL(this.cover);
      this.previewCoverSafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.previewCoverUrl);
      this.previewCoverSafeStyle = this.sanitizer.bypassSecurityTrustStyle('url(' + this.previewCoverUrl + ')');
    } else {
      this.cover = null;
      this.previewCoverUrl = null;
      this.previewCoverSafeUrl = null;
      this.previewCoverSafeStyle = null;
    }
  }

  ngOnDestroy() {
    if (this.previewCoverUrl) {
      window.URL.revokeObjectURL(this.previewCoverUrl);
    }
  }
}
