import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss']
})
export class PromptDialogComponent {
  title: string;
  content = '请输入内容：';
  value: any;
  affirmativeAction = {
    text: '确认',
    disabled: false
  };
  dismissiveAction = {
    text: '取消',
    disabled: false
  };

  constructor(public dialogRef: MdDialogRef<PromptDialogComponent>) { }
}
