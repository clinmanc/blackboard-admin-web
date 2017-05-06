import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import 'hammerjs';
import { MdlModule } from "@angular-mdl/core";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SysUserComponent } from './sys/user/sys-user.component';
import { SysRoleComponent } from "./sys/role/sys-role.component";
import { SysPermissionComponent } from "./sys/permission/sys-permission.component";
import { PaginationComponent } from './components/pagination/pagination.component';
import { TableComponent } from './components/table/table.component';
import { routes } from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SysRoleComponent,
    SysUserComponent,
    SysPermissionComponent,
    PaginationComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdlModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
