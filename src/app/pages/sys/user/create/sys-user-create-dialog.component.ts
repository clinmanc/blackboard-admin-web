import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysUserService } from '../sys-user.service';
import { SysRoleService } from '../../role/sys-role.service';
import { BasePage } from '../../../base-page';
import { SysRole } from '../../../../shared/sys-role';

@Component({
  selector: 'app-create-sys-user-dialog',
  templateUrl: './sys-user-create-dialog.component.html',
  styleUrls: ['./sys-user-create-dialog.component.scss'],
  providers: [SysUserService, SysRoleService]
})
export class SysUserCreateDialogComponent extends BasePage implements OnInit {

  createForm: FormGroup;
  error: string;
  roles: SysRole[];

  constructor(
    snackBar: MdSnackBar,
    public dialogRef: MdDialogRef<SysUserCreateDialogComponent>,
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
      plaintextPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      roles: []
    });
  }

  loadRoles() {
    this.withHandler(this.sysRoleService.queryAll().$observable)
      .map(roles => {
        return roles.map(role => {
          return {
            roleId: role.roleId,
            name: role.name,
            code: role.code,
            permissions: []
          };
        });
      }).subscribe(roles => this.roles = roles);
  }

  create() {
    const formModel = this.createForm.value;

    this.withHandler(this.sysUserService.save(formModel).$observable)
      .subscribe(() => this.dialogRef.close('ok'));
  }
}
