import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../../base-page';
import { SysRole } from '../../../../shared/sys-role';
import { SysRoleService } from '../sys-role.service';
import { SysPermissionService } from '../../permission/sys-permission.service';
import { SysPermission } from '../../../../shared/sys-permission';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sys-role-update-dialog',
  templateUrl: './sys-role-update-dialog.component.html',
  styleUrls: ['./sys-role-update-dialog.component.scss'],
  providers: [SysPermissionService, SysRoleService]
})
export class SysRoleUpdateDialogComponent extends BasePage implements OnInit {

  updateForm: FormGroup;
  error: string;
  role: SysRole;
  permissions: Observable<SysPermission[]>;

  constructor(
    snackBar: MdSnackBar,
    public dialogRef: MdDialogRef<SysRoleUpdateDialogComponent>,
    private formBuilder: FormBuilder,
    private sysRoleService: SysRoleService,
    private sysPermissionService: SysPermissionService
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.loadPermissions();
    this.buildForm();
  }

  buildForm() {
    const permissionIds = (this.role.permissions || []).map(permission => permission.permissionId);

    this.updateForm = this.formBuilder.group({
      name: [this.role.name, [Validators.required]],
      code: [this.role.code, [Validators.required, Validators.pattern(/^ROLE_[_0-9A-Z]+$/)]],
      permissions: [permissionIds]
    });
  }

  loadPermissions() {
    this.permissions = this.withHandler(this.sysPermissionService.queryAll().$observable).map(permissions => {
      return permissions.map(permission => {
        return {
          permissionId: permission.permissionId,
          name: permission.name,
          description: permission.description,
          url: permission.url
        };
      });
    });
  }

  update() {
    const formModel = this.updateForm.value;

    const input = {
      roleId: this.role.roleId,
      name: formModel.name,
      code: formModel.code,
      permissions: formModel.permissions.map(permissionId => {
        return {
          permissionId: permissionId
        };
      })
    };

    this.withHandler(this.sysRoleService.save(input).$observable)
      .subscribe(() => this.dialogRef.close('ok'));
  }
}
