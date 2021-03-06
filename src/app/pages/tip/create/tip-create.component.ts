import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../base-page';
import { TipService } from '../tip.service';

@Component({
  selector: 'app-tip-create',
  templateUrl: './tip-create.component.html',
  styleUrls: ['./tip-create.component.scss'],
  providers: [TipService]
})
export class TipCreateComponent extends BasePage implements OnInit {

  createForm: FormGroup;
  error: string;
  deviceTypes = [];

  constructor(
    snackBar: MdSnackBar,
    public dialogRef: MdDialogRef<TipCreateComponent>,
    private formBuilder: FormBuilder,
    private tipService: TipService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
    this.deviceTypes = [
      { name: '所有', value: 'ALL' },
      { name: 'iPhone', value: 'IOS' },
      { name: 'iPad', value: 'IOS_PAD' },
      { name: 'Android', value: 'ANDROID' },
      { name: 'Android Pad', value: 'ANDROID_PAD' }
    ];
  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      tipUrl: ['http://', [Validators.required]],
      priority: [1],
      version: ['ALL'],
      deviceType: ['', [Validators.required]]
    });
  }

  create() {
    const formModel = this.createForm.value;

    this.withHandler(this.tipService.save(formModel).$observable)
      .subscribe(() => this.dialogRef.close('ok'));
  }
}
