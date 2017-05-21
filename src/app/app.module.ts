import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdlModule } from '@angular-mdl/core';
import { CustomMaterialModule } from './custom-material';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ResourceModule } from 'ngx-resource';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PageNotFoundComponent } from './pages/not-found/page-not-found.component';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TableComponent } from './components/table/table.component';
import { TableColumnDirective } from './components/table/column/table-column.directive';
import { TableColumnHeaderDirective } from './components/table/column/table-column-header.directive';
import { TableColumnCellDirective } from './components/table/column/table-column-cell.directive';
import { TableBodyCellComponent } from './components/table/body/table-body-cell.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ViewComponent } from 'app/components/table/cell/view.component';
import { AvatarPreviewComponent } from './components/table/cell/preview.component';
import { LocalDatePipe } from './shared/local-date.pipe';
import { MessageCategoryPipe } from './pages/message/message-category.pipe';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SysUserComponent } from './pages/sys/user/sys-user.component';
import { SysRoleComponent } from './pages/sys/role/sys-role.component';
import { SysPermissionComponent } from './pages/sys/permission/sys-permission.component';
import { HomeComponent } from './pages/home.component';
import { AppRoutingModule } from './app-routing.module';
import { InvitationStatisticsComponent } from './pages/invitation/statistics/invitation-statistics.component';
import { ItemListDialogComponent } from './components/dialog/item-list/item-list-dialog.component';
import { AlertDialogComponent } from './components/dialog/alert/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialog/confirm/confirm-dialog.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { UserComponent } from './pages/user/user.component';
import { UserLocationStatisticsComponent } from './pages/user/location-statistics/user-location-statistics.component';
import { SchoolComponent } from './pages/school/school.component';
import { InvitationRecordComponent } from './pages/invitation/record/invitation-record.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { AnnouncementMessageComponent } from './pages/message/announcement/announcement-message.component';
import { AnnouncementMessageCreateComponent } from './pages/message/announcement/create/announcement-message-create.component';
import { WelcomeMessageComponent } from './pages/message/welcome/welcome-message.component';
import { WelcomeMessageCreateComponent } from './pages/message/welcome/create/welcome-message-create.component';
import { CommonMessageComponent } from './pages/message/common/common-message.component';
import { ClassroomAssociatedComponent } from './pages/classroom/associated/classroom-associated.component';
import { BlackboardVersionComponent } from './pages/blackboard-version/blackboard-version.component';
import { TipComponent } from './pages/tip/tip.component';
import { TipCreateComponent } from './pages/tip/create/tip-create.component';
import { ServerDetectionComponent } from './pages/server-detection/server-detection.component';
import { GrowthTagComponent } from './pages/growth/tag/growth-tag.component';
import { GrowthTagCreateComponent } from './pages/growth/tag/create/growth-tag-create.component';
import { GrowthRecordComponent } from './pages/growth/record/growth-record.component';
import { RegisteredUserStatisticsComponent } from './pages/user/registered-statistics/registered-user-statistics.component';
import { SysUserCreateDialogComponent } from './pages/sys/user/create/sys-user-create-dialog.component';
import { SysRoleCreateComponent } from './pages/sys/role/create/sys-role-create.component';
import { SysPermissionCreateComponent } from './pages/sys/permission/create/sys-permission-create.component';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,

    PaginationComponent,

    ItemListDialogComponent,
    AlertDialogComponent,
    ConfirmDialogComponent,

    TableComponent,
    TableColumnDirective,
    TableColumnHeaderDirective,
    TableColumnCellDirective,
    TableBodyCellComponent,
    ViewComponent,
    AvatarPreviewComponent,

    LocalDatePipe,
    MessageCategoryPipe,

    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    DashboardComponent,
    SysRoleComponent,
    SysUserComponent,
    SysPermissionComponent,
    InvitationStatisticsComponent,
    InvitationRecordComponent,
    ClassroomComponent,
    UserComponent,
    SchoolComponent,
    FeedbackComponent,
    AnnouncementMessageComponent,
    AnnouncementMessageCreateComponent,
    WelcomeMessageComponent,
    WelcomeMessageCreateComponent,
    ClassroomAssociatedComponent,
    BlackboardVersionComponent,
    TipComponent,
    TipCreateComponent,
    ServerDetectionComponent,
    GrowthTagComponent,
    GrowthTagCreateComponent,
    CommonMessageComponent,
    GrowthRecordComponent,
    RegisteredUserStatisticsComponent,
    UserLocationStatisticsComponent,
    ToolbarComponent,
    SysUserCreateDialogComponent,
    SysRoleCreateComponent,
    SysPermissionCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

    MdlModule,
    FlexLayoutModule,
    CustomMaterialModule,
    ResourceModule.forRoot(),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService],
  entryComponents: [
    ViewComponent,
    AvatarPreviewComponent,

    AlertDialogComponent,
    ConfirmDialogComponent,
    ItemListDialogComponent,
    GrowthTagCreateComponent,
    TipCreateComponent,
    SysUserCreateDialogComponent,
    SysRoleCreateComponent,
    SysPermissionCreateComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
