import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialogModule, MdGridListModule,
  MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdProgressBarModule, MdProgressSpinnerModule, MdRadioModule,
  MdSelectModule, MdSidenavModule, MdSliderModule, MdSlideToggleModule, MdSnackBarModule, MdTabsModule, MdToolbarModule,
  MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialogModule, MdGridListModule,
    MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdProgressBarModule, MdProgressSpinnerModule, MdRadioModule,
    MdSelectModule, MdSidenavModule, MdSliderModule, MdSlideToggleModule, MdSnackBarModule, MdTabsModule, MdToolbarModule,
    MdTooltipModule
  ],
  exports: [
    MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialogModule, MdGridListModule,
    MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdProgressBarModule, MdProgressSpinnerModule, MdRadioModule,
    MdSelectModule, MdSidenavModule, MdSliderModule, MdSlideToggleModule, MdSnackBarModule, MdTabsModule, MdToolbarModule,
    MdTooltipModule
  ],
  declarations: []
})
export class HomeMaterialModule { }
