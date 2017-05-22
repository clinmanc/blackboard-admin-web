import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SysUserComponent } from './sys/user/sys-user.component';
import { SysRoleComponent } from './sys/role/sys-role.component';
import { SysPermissionComponent } from './sys/permission/sys-permission.component';
import { InvitationStatisticsComponent } from './invitation/statistics/invitation-statistics.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { UserComponent } from './user/user.component';
import { RegisteredUserStatisticsComponent } from './user/registered-statistics/registered-user-statistics.component';
import { UserLocationStatisticsComponent } from './user/location-statistics/user-location-statistics.component';
import { SchoolComponent } from './school/school.component';
import { InvitationRecordComponent } from './invitation/record/invitation-record.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CommonMessageComponent } from './message/common/common-message.component';
import { AnnouncementMessageComponent } from './message/announcement/announcement-message.component';
import { AnnouncementMessageCreateComponent } from './message/announcement/create/announcement-message-create.component';
import { WelcomeMessageComponent } from './message/welcome/welcome-message.component';
import { WelcomeMessageCreateComponent } from './message/welcome/create/welcome-message-create.component';
import { ClassroomAssociatedComponent } from './classroom/associated/classroom-associated.component';
import { BlackboardVersionComponent } from './blackboard-version/blackboard-version.component';
import { TipComponent } from './tip/tip.component';
import { ServerDetectionComponent } from './server-detection/server-detection.component';
import { GrowthTagComponent } from './growth/tag/growth-tag.component';
import { GrowthRecordComponent } from './growth/record/growth-record.component';
import { ExportComponent } from './export/export.component';

export const homeRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    data: {
      title: '概览'
    },
    component: DashboardComponent
  },
  {
    path: 'sys/user',
    data: {
      title: '系统用户管理'
    },
    component: SysUserComponent
  },
  {
    path: 'sys/role',
    data: {
      title: '系统角色管理'
    },
    component: SysRoleComponent
  },
  {
    path: 'sys/permission',
    data: {
      title: '系统权限管理'
    },
    component: SysPermissionComponent
  },
  {
    path: 'user/registered_statistics',
    data: {
      title: '注册用户统计'
    },
    component: RegisteredUserStatisticsComponent
  },
  {
    path: 'user/location_statistics',
    data: {
      title: '用户归属地'
    },
    component: UserLocationStatisticsComponent
  },
  {
    path: 'user/:queryType',
    data: {
      title: '用户信息'
    },
    component: UserComponent
  },
  {
    path: 'school',
    data: {
      title: '学校信息'
    },
    component: SchoolComponent
  },
  {
    path: 'classroom/associated',
    data: {
      title: '班级关联'
    },
    component: ClassroomAssociatedComponent
  },
  {
    path: 'classroom/:queryType',
    data: {
      title: '班级信息'
    },
    component: ClassroomComponent
  },
  {
    path: 'invitation/record',
    data: {
      title: '邀请记录'
    },
    component: InvitationRecordComponent
  },
  {
    path: 'invitation/statistics',
    data: {
      title: '邀请统计'
    },
    component: InvitationStatisticsComponent
  },
  {
    path: 'feedback',
    data: {
      title: '反馈意见'
    },
    component: FeedbackComponent
  },
  {
    path: 'message/announcement',
    data: {
      title: '公告消息'
    },
    component: AnnouncementMessageComponent
  },
  {
    path: 'message/announcement/create',
    data: {
      title: '创建公告消息'
    },
    component: AnnouncementMessageCreateComponent
  },
  {
    path: 'message/welcome',
    data: {
      title: '欢迎消息'
    },
    component: WelcomeMessageComponent
  },
  {
    path: 'message/welcome/create',
    data: {
      title: '创建欢迎消息'
    },
    component: WelcomeMessageCreateComponent
  },
  {
    path: 'message/common',
    data: {
      title: '消息列表'
    },
    component: CommonMessageComponent
  },
  {
    path: 'blackboard/version',
    data: {
      title: '版本管理'
    },
    component: BlackboardVersionComponent
  },
  {
    path: 'tip',
    data: {
      title: 'Tips管理'
    },
    component: TipComponent
  },
  {
    path: 'server/detection',
    data: {
      title: '服务器检测'
    },
    component: ServerDetectionComponent
  },
  {
    path: 'growth/tag',
    data: {
      title: '成长标签管理'
    },
    component: GrowthTagComponent
  },
  {
    path: 'growth/record',
    data: {
      title: '成长记录列表'
    },
    component: GrowthRecordComponent
  },
  {
    path: 'export',
    data: {
      title: '数据导出'
    },
    component: ExportComponent
  }
];
