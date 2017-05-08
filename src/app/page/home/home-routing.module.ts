import { Routes } from "@angular/router";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { SysUserComponent } from "../../sys/user/sys-user.component";
import { SysRoleComponent } from "../../sys/role/sys-role.component";
import { SysPermissionComponent } from "../../sys/permission/sys-permission.component";

export const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'sys/user',
    component: SysUserComponent
  },
  {
    path: 'sys/role',
    component: SysRoleComponent
  },
  {
    path: 'sys/permission',
    component: SysPermissionComponent
  }
];
