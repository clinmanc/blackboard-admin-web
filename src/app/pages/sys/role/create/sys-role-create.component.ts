import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../../../base-page';
import { SysRoleService } from '../sys-role.service';
import { SysPermissionService } from '../../permission/sys-permission.service';
import { SysPermission } from '../../../../shared/sys-permission';

@Component({
  selector: 'app-sys-role-create',
  templateUrl: './sys-role-create.component.html',
  styleUrls: ['./sys-role-create.component.scss'],
  providers: [SysPermissionService, SysRoleService]
})
export class SysRoleCreateComponent extends BasePage implements OnInit {

  createForm: FormGroup;
  error: string;
  permissions: SysPermission[];

  constructor(
    snackBar: MdSnackBar,
    public dialogRef: MdDialogRef<SysRoleCreateComponent>,
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
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['ROLE_', [Validators.required, Validators.pattern(/^ROLE_[0-9A-Z]+$/)]],
      permissions: []
    });
  }

  loadPermissions() {
    this.withHandler(this.sysPermissionService.queryAll().$observable).map(permissions => {
      return permissions.map(permission => {
        return {
          permissionId: permission.permissionId,
          name: permission.name,
          description: permission.description,
          url: permission.url
        };
      });
    }).subscribe(permissions => this.permissions = permissions);
  }

  create() {
    const formModel = this.createForm.value;

    this.withHandler(this.sysRoleService.save(formModel).$observable)
      .subscribe(() => this.dialogRef.close('ok'));
  }
}
