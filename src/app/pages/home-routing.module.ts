import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SysUserComponent } from './sys/user/sys-user.component';
import { SysRoleComponent } from './sys/role/sys-role.component';
import { SysPermissionComponent } from './sys/permission/sys-permission.component';
import { InvitationStatisticsComponent } from './invitation/statistics/invitation-statistics.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { UserComponent } from './user/user.component';
import { SchoolComponent } from './school/school.component';
import { InvitationRecordComponent } from './invitation/record/invitation-record.component';

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
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'school',
    component: SchoolComponent
  },
  {
    path: 'classroom/:queryType',
    component: ClassroomComponent
  },
  {
    path: 'invitation/record',
    component: InvitationRecordComponent
  },
  {
    path: 'invitation/statistics',
    component: InvitationStatisticsComponent
  }
];
