import { Component, OnInit } from '@angular/core';
import { SysUserService } from './sys/user/sys-user.service';
import { rotate180Animation } from '../animations/rotate-180.animation';
import { flyInOutAnimation } from '../animations/fly-in-out.animation';
import { NAV_ITEMS } from '../nav-items';
import { SysUser } from './sys/user/sys-user';
import { NavItem } from '../nav-item';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SysUserService],
  animations: [rotate180Animation, flyInOutAnimation]
})
export class HomeComponent implements OnInit {
  navItems = NAV_ITEMS;
  allowExpandSubmenu = true;
  user: SysUser;
  selectedItem: NavItem;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  toggleExpanded(item: NavItem) {
    if (this.selectedItem === null || item !== this.selectedItem) {
      this.allowExpandSubmenu = true;
    } else if (Array.isArray(item.children) && item.children.length !== 0) {
      this.allowExpandSubmenu = !this.allowExpandSubmenu;
    }
    this.selectedItem = item;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
