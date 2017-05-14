import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { MdlModule } from '@angular-mdl/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SysUserComponent } from './pages/sys/user/sys-user.component';
import { SysRoleComponent } from './pages/sys/role/sys-role.component';
import { SysPermissionComponent } from './pages/sys/permission/sys-permission.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PageNotFoundComponent } from './pages/not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { HomeComponent } from './pages/home.component';
import { AppRoutingModule } from './app-routing.module';
import { InvitationStatisticsComponent } from './pages/invitation/statistics/invitation-statistics.component';
import { ItemListDialogComponent } from './components/dialog/item-list/item-list-dialog.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AlertDialogComponent } from './components/dialog/alert/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialog/confirm/confirm-dialog.component';
import { ViewComponent } from 'app/components/table/view.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { ResourceModule } from 'ngx-resource';
import { AvatarPreviewComponent } from './components/table/preview.component';
import { UserComponent } from './pages/user/user.component';
import { SchoolComponent } from './pages/school/school.component';
import { InvitationRecordComponent } from './pages/invitation/record/invitation-record.component';
import { RenderComponent } from './components/table/render.component';

import { TableComponent } from './components/table/table.component';
import { TableColumnDirective } from './components/table/column/table-column.directive';
import { TableColumnHeaderDirective } from './components/table/column/table-column-header.directive';
import { TableColumnCellDirective } from './components/table/column/table-column-cell.directive';
import { TableBodyCellComponent } from './components/table/body/table-body-cell.component';

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
    RenderComponent,
    ViewComponent,
    AvatarPreviewComponent,

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
    SchoolComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,

    MdlModule,
    MaterialModule.forRoot(),
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
    ItemListDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
