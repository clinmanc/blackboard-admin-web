import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  title: string;
  content = '确认执行操作?';
  affirmativeAction = {
    text: '确认',
    disabled: false
  };
  dismissiveAction = {
    text: '取消',
    disabled: false
  };

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }
}
