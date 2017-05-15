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
import { FeedbackComponent } from './feedback/feedback.component';
import { AnnouncementMessageComponent } from './message/announcement/announcement-message.component';
import { WelcomeMessageComponent } from './message/welcome/welcome-message.component';
import { WelcomeMessageCreateComponent } from './message/welcome/create/welcome-message-create.component';
import { AnnouncementMessageCreateComponent } from './message/announcement/create/announcement-message-create.component';
import { ClassroomAssociatedComponent } from './classroom/associated/classroom-associated.component';
import { BlackboardVersionComponent } from './blackboard-version/blackboard-version.component';
import { TipsComponent } from './tips/tips.component';
import { ServerDetectionComponent } from './server-detection/server-detection.component';
import { GrowthTagComponent } from './growth/tag/growth-tag.component';
import { GrowthRecordComponent } from './growth/record/growth-record.component';
import { RegisteredUserStatisticsComponent } from './user/registered-statistics/registered-user-statistics.component';
import { CommonMessageComponent } from './message/common/common-message.component';

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
    path: 'user/registered_statistics',
    component: RegisteredUserStatisticsComponent
  },
  {
    path: 'user/:queryType',
    component: UserComponent
  },
  {
    path: 'school',
    component: SchoolComponent
  },
  {
    path: 'classroom/associated',
    component: ClassroomAssociatedComponent
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
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'message/announcement',
    component: AnnouncementMessageComponent
  },
  {
    path: 'message/announcement/create',
    component: AnnouncementMessageCreateComponent
  },
  {
    path: 'message/welcome',
    component: WelcomeMessageComponent
  },
  {
    path: 'message/welcome/create',
    component: WelcomeMessageCreateComponent
  },
  {
    path: 'message/common',
    component: CommonMessageComponent
  },
  {
    path: 'blackboard/version',
    component: BlackboardVersionComponent
  },
  {
    path: 'tips',
    component: TipsComponent
  },
  {
    path: 'server/detection',
    component: ServerDetectionComponent
  },
  {
    path: 'growth/tag',
    component: GrowthTagComponent
  },
  {
    path: 'growth/record',
    component: GrowthRecordComponent
  }
];
