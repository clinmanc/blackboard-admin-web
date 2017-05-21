import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysPermissionService } from '../sys-permission.service';
import { BasePage } from '../../../base-page';

@Component({
  selector: 'app-sys-permission-create',
  templateUrl: './sys-permission-create.component.html',
  styleUrls: ['./sys-permission-create.component.scss']
})
export class SysPermissionCreateComponent extends BasePage implements OnInit {

  createForm: FormGroup;
  error: string;

  constructor(
    public dialogRef: MdDialogRef<SysPermissionCreateComponent>,
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
      url: ['']
    });
  }

  create() {
    const formModel =  this.createForm.value;

    this.sysPermissionService.save(formModel).$observable.subscribe(() => this.dialogRef.close('ok'), res => {
      const json: any = res._body && res.json();
      this.error = json && json.message || '创建失败';
    });
  }
}
