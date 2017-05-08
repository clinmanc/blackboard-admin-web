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
import { SysUserComponent } from './sys/user/sys-user.component';
import { SysRoleComponent } from "./sys/role/sys-role.component";
import { SysPermissionComponent } from "./sys/permission/sys-permission.component";
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { PageNotFoundComponent } from "./page/not-found/page-not-found.component";
import { LoginComponent } from './page/login/login.component';
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { HomeComponent } from './page/home/home.component';
import { AppRoutingModule } from "./app-routing.module";

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdlModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
