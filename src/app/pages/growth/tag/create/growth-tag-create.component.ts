import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../../base-page';
import { GrowthTagService } from '../growth-tag.service';

@Component({
  selector: 'app-growth-tag-create',
  templateUrl: './growth-tag-create.component.html',
  styleUrls: ['./growth-tag-create.component.scss']
})
export class GrowthTagCreateComponent extends BasePage implements OnInit {

  createForm: FormGroup;
  error: string;

  constructor(
    public dialogRef: MdDialogRef<GrowthTagCreateComponent>,
    snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private growthTagService: GrowthTagService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      weight: [0]
    });
  }

  create() {
    const formModel = this.createForm.value;

    this.growthTagService.save(formModel).$observable
      .subscribe(() => this.dialogRef.close('ok'), this.handleError.bind(this));
  }
}
