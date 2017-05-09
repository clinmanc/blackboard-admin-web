import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import 'hammerjs';
import { MdlModule } from "@angular-mdl/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SysUserComponent } from './pages/sys/user/sys-user.component';
import { SysRoleComponent } from "./pages/sys/role/sys-role.component";
import { SysPermissionComponent } from "./pages/sys/permission/sys-permission.component";
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { PageNotFoundComponent } from "./pages/not-found/page-not-found.component";
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { InvitationStatisticsComponent } from './pages/invitation-statistics/invitation-statistics.component';
import { BasePage } from './pages/base-page';
import { ItemListDialogComponent } from './components/item-list-dialog/item-list-dialog.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SysRoleComponent,
    SysUserComponent,
    SysPermissionComponent,
    PaginationComponent,
    TableComponent,
    PageNotFoundComponent,
    LoginComponent,
    HomeComponent,
    InvitationStatisticsComponent,
    ItemListDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdlModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService],
  entryComponents: [ItemListDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
