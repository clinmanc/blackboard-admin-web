import { Component } from '@angular/core';
import { NAV_ITEMS } from "./nav-items";
import { SysUser } from "./sys/user/sys-user";
import { SysUserService } from "./sys/user/sys-user.service";
import { NavItem } from "./nav-item";
import { flyInOut } from "./animations/fly-in-out";
import {rotate180} from "./animations/rotate180";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SysUserService],
  animations: [rotate180, flyInOut]
})
export class AppComponent {

  constructor(private userservice: SysUserService) {
  }

  navItems = NAV_ITEMS;
  user: SysUser;
  selectedItem: NavItem;
  allowExpandSubmenu = true;

  toggleExpanded(item: NavItem) {
    if (this.selectedItem === null || item !== this.selectedItem) {
      this.allowExpandSubmenu = true;
    } else if (Array.isArray(item.children) && item.children.length !== 0) {
      this.allowExpandSubmenu = !this.allowExpandSubmenu;
    }
    this.selectedItem = item;
  }
}
