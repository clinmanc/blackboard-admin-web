import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./page/login/login.component";
import { HomeComponent } from "./page/home/home.component";
import { homeRoutes } from "./page/home/home-routing.module";
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: homeRoutes,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
