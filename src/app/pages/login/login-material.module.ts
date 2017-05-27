import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdListModule, MdSnackBarModule, MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule, MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdListModule, MdSnackBarModule, MdTooltipModule
  ],
  exports: [
    MdButtonModule, MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdListModule, MdSnackBarModule, MdTooltipModule
  ],
  declarations: []
})
export class LoginMaterialModule { }
