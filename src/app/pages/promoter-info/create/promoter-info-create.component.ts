import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { PromotersInfoService } from '../promoter-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../base-page';


@Component({
  selector: 'app-promoter-info-create',
  templateUrl: './promoter-info-create.component.html',
  styleUrls: ['./promoter-info-create.component.scss'],
  providers: [PromotersInfoService]
})

export class PromoterInfoCreateComponent extends BasePage implements OnInit {
  createForm: FormGroup;
  error: string;

  constructor(
    public dialogRef: MdDialogRef<PromoterInfoCreateComponent>,
    private formBuilder: FormBuilder,
    private promotersInfoService: PromotersInfoService,
    snackBar: MdSnackBar,
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
      province: ['', [Validators.required]],
      city: [''],
      number: ['', [Validators.required]]
    });
  }

  create() {
    const formModel = this.createForm.value;
    this.withHandler(this.promotersInfoService.save(formModel).$observable)
      .subscribe(() => this.dialogRef.close('ok'));
  }
}
