import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  title: string;
  content = '确认执行操作?';
  affirmativeAction = {
    text: '确认',
    disabled: false
  };

  constructor(public dialogRef: MdDialogRef<AlertDialogComponent>) { }
}
