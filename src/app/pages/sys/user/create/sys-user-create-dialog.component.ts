import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysUserService } from '../sys-user.service';
import { SysRoleService } from '../../role/sys-role.service';
import { BasePage } from '../../../base-page';

@Component({
  selector: 'app-create-sys-user-dialog',
  templateUrl: './sys-user-create-dialog.component.html',
  styleUrls: ['./sys-user-create-dialog.component.scss']
})
export class SysUserCreateDialogComponent extends BasePage implements OnInit {

  createForm: FormGroup;
  errors: any[];
  roles: any[];

  constructor(
    public dialogRef: MdDialogRef<SysUserCreateDialogComponent>,
    snackBar: MdSnackBar,
    private formBuilder: FormBuilder,
    private sysUserService: SysUserService,
    private sysRoleService: SysRoleService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.buildForm();
    this.loadRoles();
  }

  buildForm() {
    this.createForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      role: ['']
    });
  }

  loadRoles() {
    this.sysRoleService.queryAll().$observable.subscribe(roles => this.roles = roles, this.handleError.bind(this));
  }

  create() {
    const formModel = this.createForm.value;

    this.sysUserService.save({
      username: formModel.username,
      plaintextPassword: formModel.password,
      roles: [{ roleId: formModel.role }]
    }).$observable.subscribe(() => this.dialogRef.close('ok'), (res) => {
      const json: any = res._body && res.json();
      this.errors = (json.errors && json.errors.length && json.errors.map(error => error.defaultMessage)) || ['创建失败'];
    });
  }
}
