import { Component } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { BasePage } from '../../../pages/base-page';
import * as _ from "lodash";

@Component({
  selector: 'app-item-list-dialog',
  templateUrl: './item-list-dialog.component.html',
  styleUrls: ['./item-list-dialog.component.scss']
})
export class ItemListDialogComponent extends BasePage {
  title: string;
  items: any[];

  constructor(public dialogRef: MdDialogRef<ItemListDialogComponent>, protected snackBar: MdSnackBar) {
    super(snackBar);
    this.completeQueryDelay = 250;
  }

  getKeys(item){
    return Object.keys(item).filter(key => !_.startsWith(key, '$'));
  }
}
