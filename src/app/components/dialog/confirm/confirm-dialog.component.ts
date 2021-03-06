import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title: string;
  content = '确认执行操作?';
  affirmativeAction = {
    text: '确认',
    disabled: false,
    color: 'primary'
  };
  dismissiveAction = {
    text: '取消',
    disabled: false,
    color: 'primary'
  };

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) { }
}
