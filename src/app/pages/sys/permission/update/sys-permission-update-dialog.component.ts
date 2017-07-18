import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysPermissionService } from '../sys-permission.service';
import { BasePage } from '../../../base-page';
import { SysPermission } from '../../../../shared/sys-permission';

@Component({
  selector: 'app-sys-permission-update-dialog',
  templateUrl: './sys-permission-update-dialog.component.html',
  styleUrls: ['./sys-permission-update-dialog.component.scss'],
  providers: [SysPermissionService]
})
export class SysPermissionUpdateDialogComponent extends BasePage implements OnInit {

  updateForm: FormGroup;
  error: string;
  permission: SysPermission;

  constructor(
    public dialogRef: MdDialogRef<SysPermissionUpdateDialogComponent>,
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
    this.updateForm = this.formBuilder.group({
      name: [this.permission.name, [Validators.required]],
      description: [this.permission.description],
      url: [this.permission.url, [Validators.required]]
    });
  }

  update() {
    const formModel = this.updateForm.value;

    const input = {
      permissionId: this.permission.permissionId,
      name: formModel.name,
      description: formModel.description,
      url: formModel.url
    };

    this.withHandler(this.sysPermissionService.update(input).$observable)
      .subscribe(() => this.dialogRef.close('ok'));
  }
}
