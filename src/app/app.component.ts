import { Component, OnInit } from '@angular/core';
import { SysUserService } from './pages/sys/user/sys-user.service';
import { flyInOutAnimation } from './animations/fly-in-out.animation';
import { rotate180Animation } from './animations/rotate-180.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SysUserService],
  animations: [rotate180Animation, flyInOutAnimation]
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  isWebkit(): boolean {
    let ua = navigator.userAgent;
    return (ua.indexOf('AppleWebKit') > -1) && ua.indexOf('Edge') < 0;
  }
}
