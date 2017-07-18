import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SysUserService } from '../sys-user.service';
import { SysRoleService } from '../../role/sys-role.service';
import { BasePage } from '../../../base-page';
import { SysRole } from '../../../../shared/sys-role';
import { SysUser } from '../../../../shared/sys-user';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sys-user-update-dialog',
  templateUrl: './sys-user-update-dialog.component.html',
  styleUrls: ['./sys-user-update-dialog.component.scss'],
  providers: [SysUserService, SysRoleService]
})
export class SysUserUpdateDialogComponent extends BasePage implements OnInit {

  updateForm: FormGroup;
  error: string;
  roles: Observable<SysRole[]>;
  user: SysUser;

  constructor(
    snackBar: MdSnackBar,
    public dialogRef: MdDialogRef<SysUserUpdateDialogComponent>,
    private formBuilder: FormBuilder,
    private sysUserService: SysUserService,
    private sysRoleService: SysRoleService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.loadRoles();
    this.buildForm();
  }

  loadRoles() {
    this.roles = this.withHandler(this.sysRoleService.queryAll().$observable)
      .map(roles => {
        return roles.map(role => {
          return {
            roleId: role.roleId,
            name: role.name,
            code: role.code,
            permissions: []
          };
        });
      });
  }

  buildForm() {
    const roleIds = (this.user.roles || []).map(role => role.roleId);

    this.updateForm = this.formBuilder.group({
      username: [(this.user || {} as SysUser).username, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      roles: [roleIds]
    });
  }

  update() {
    const formModel = this.updateForm.value;

    const input = {
      userId: this.user.userId,
      username: formModel.username,
      roles: formModel.roles.map(roleId => {
        return {
          roleId: roleId
        };
      })
    };

    this.withHandler(this.sysUserService.update(input).$observable)
      .subscribe(() => this.dialogRef.close('ok'));
  }
}
