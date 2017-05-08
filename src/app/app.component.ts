import {Component, OnInit} from '@angular/core';
import { SysUserService } from "./sys/user/sys-user.service";
import { flyInOutAnimation } from "./animations/fly-in-out.animation";
import { rotate180Animation } from "./animations/rotate-180.animation";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SysUserService],
  animations: [rotate180Animation, flyInOutAnimation]
})
export class AppComponent implements OnInit{
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void {
    if(this.authService.isLoggedIn){

    }
  }
}
