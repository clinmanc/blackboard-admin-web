import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysPermissionService } from '../sys-permission.service';
import { BasePage } from '../../../base-page';

@Component({
  selector: 'app-sys-permission-create',
  templateUrl: './sys-permission-create-dialog.component.html',
  styleUrls: ['./sys-permission-create-dialog.component.scss'],
  providers: [SysPermissionService]
})
export class SysPermissionCreateDialogComponent extends BasePage implements OnInit {

  createForm: FormGroup;
  error: string;

  constructor(
    public dialogRef: MdDialogRef<SysPermissionCreateDialogComponent>,
    snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private sysPermissionService: SysPermissionService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      url: ['', [Validators.required]]
    });
  }

  create() {
    const formModel = this.createForm.value;

    this.withHandler(this.sysPermissionService.save(formModel).$observable)
      .subscribe(() => this.dialogRef.close('ok'));
  }
}
