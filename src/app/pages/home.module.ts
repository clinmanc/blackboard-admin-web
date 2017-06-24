import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HomeMaterialModule } from './home-material';
import { MdlModule } from '@angular-mdl/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LocalDatePipe } from '../pipes/local-date.pipe';
import { LocalDateTimePipe } from '../pipes/local-date-time.pipe';
import { BlackboardMessagePipe } from '../pipes/blackboard-message.pipe';

import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { TableComponent } from '../components/table/table.component';
import { TableColumnDirective } from '../components/table/column/table-column.directive';
import { TableColumnHeaderDirective } from '../components/table/column/table-column-header.directive';
import { TableColumnCellDirective } from '../components/table/column/table-column-cell.directive';
import { TableColumnPipe } from 'app/components/table/column/table-column.pipe';
import { TableHeaderCellComponent } from '../components/table/header/table-header-cell.component';
import { TableBodyCellComponent } from '../components/table/body/table-body-cell.component';
import { ViewComponent } from '../components/table/cell/view.component';
import { PreviewComponent } from '../components/table/cell/preview.component';
import { TextEditComponent } from '../components/table/cell/text-edit.component';
import { DetailComponent } from '../components/table/cell/detail.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SysUserComponent } from './sys/user/sys-user.component';
import { SysRoleComponent } from './sys/role/sys-role.component';
import { SysPermissionComponent } from './sys/permission/sys-permission.component';
import { SysUserCreateDialogComponent } from './sys/user/create/sys-user-create-dialog.component';
import { SysRoleCreateComponent } from './sys/role/create/sys-role-create.component';
import { SysPermissionCreateComponent } from './sys/permission/create/sys-permission-create.component';
import { InvitationStatisticsComponent } from './invitation/statistics/invitation-statistics.component';
import { InvitationRecordComponent } from './invitation/record/invitation-record.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClassroomAssociatedComponent } from './classroom/associated/classroom-associated.component';
import { UserComponent } from './user/user.component';
import { UserLocationStatisticsComponent } from './user/location-statistics/user-location-statistics.component';
import { RegisteredUserStatisticsComponent } from './user/registered-statistics/registered-user-statistics.component';
import { SchoolComponent } from './school/school.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AnnouncementMessageComponent } from './message/announcement/announcement-message.component';
import { AnnouncementMessageCreateComponent } from './message/announcement/create/announcement-message-create.component';
import { WelcomeMessageComponent } from './message/welcome/welcome-message.component';
import { WelcomeMessageCreateComponent } from './message/welcome/create/welcome-message-create.component';
import { CommonMessageComponent } from './message/common/common-message.component';
import { BlackboardVersionComponent } from './blackboard-version/blackboard-version.component';
import { TipComponent } from './tip/tip.component';
import { TipCreateComponent } from './tip/create/tip-create.component';
import { ServerDetectionComponent } from './server-detection/server-detection.component';
import { GrowthTagComponent } from './growth/tag/growth-tag.component';
import { GrowthTagCreateComponent } from './growth/tag/create/growth-tag-create.component';
import { GrowthRecordComponent } from './growth/record/growth-record.component';
import { ExportComponent } from './export/export.component';

import { AlertDialogComponent } from '../components/dialog/alert/alert-dialog.component';
import { ConfirmDialogComponent } from '../components/dialog/confirm/confirm-dialog.component';
import { PromptDialogComponent } from '../components/dialog/prompt/prompt-dialog.component';
import { ItemListDialogComponent } from '../components/dialog/item-list/item-list-dialog.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MessagesDialogComponent } from '../components/dialog/messages/messages-dialog.component';
import { LimitedLineDirective } from '../components/limited-text/limited-line.directive';
import { PromoterInfoComponent } from './promoter-info/promoter-info.component';
import { PromoterInfoCreateComponent } from './promoter-info/create/promoter-info-create.component';
import { UserFieldComponent } from 'app/components/table/cell/user-field.component';
import { SysBatchComponent } from './sys/batch/sys-batch.component';

@NgModule({
imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

    HomeMaterialModule,
    MdlModule,
    FlexLayoutModule,
    HomeRoutingModule,
    PerfectScrollbarModule.forChild()
  ],
  declarations: [
    ToolbarComponent,
    PaginationComponent,
    TableComponent,
    TableColumnDirective,
    TableColumnHeaderDirective,
    TableColumnCellDirective,
    TableColumnPipe,
    TableHeaderCellComponent,
    TableBodyCellComponent,

    ViewComponent,
    PreviewComponent,
    TextEditComponent,
    DetailComponent,
    UserFieldComponent,

    LocalDatePipe,
    LocalDateTimePipe,
    BlackboardMessagePipe,

    HomeComponent,
    DashboardComponent,
    SysBatchComponent,
    SysUserComponent,
    SysRoleComponent,
    SysPermissionComponent,
    SysUserCreateDialogComponent,
    SysRoleCreateComponent,
    SysPermissionCreateComponent,
    InvitationStatisticsComponent,
    InvitationRecordComponent,
    ClassroomComponent,
    ClassroomAssociatedComponent,
    UserComponent,
    UserLocationStatisticsComponent,
    RegisteredUserStatisticsComponent,
    SchoolComponent,
    FeedbackComponent,
    AnnouncementMessageComponent,
    AnnouncementMessageCreateComponent,
    WelcomeMessageComponent,
    WelcomeMessageCreateComponent,
    CommonMessageComponent,
    BlackboardVersionComponent,
    TipComponent,
    TipCreateComponent,
    ServerDetectionComponent,
    GrowthTagComponent,
    GrowthTagCreateComponent,
    GrowthRecordComponent,

    ExportComponent,
    ItemListDialogComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
    MessagesDialogComponent,
    LimitedLineDirective,
    PromoterInfoComponent,
    PromoterInfoCreateComponent
  ],
  entryComponents: [
    GrowthTagCreateComponent,
    TipCreateComponent,
    SysUserCreateDialogComponent,
    SysRoleCreateComponent,
    SysPermissionCreateComponent,

    AlertDialogComponent,
    ConfirmDialogComponent,
    PromptDialogComponent,
    ItemListDialogComponent,
    MessagesDialogComponent
  ]
})
export class HomeModule { }
