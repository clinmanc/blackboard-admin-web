import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SysUserService } from './sys/user/sys-user.service';
import { rotate180Animation } from '../animations/rotate-180.animation';
import { flyInOutAnimation } from '../animations/fly-in-out.animation';
import { NAV_ITEMS } from '../shared/nav-items';
import { NavItem } from '../shared/nav-item';
import { AuthService } from '../auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthHelper } from '../helper/authorization-helper';
import 'rxjs/add/operator/switchMapTo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SysUserService],
  animations: [rotate180Animation, flyInOutAnimation]
})
export class HomeComponent implements OnInit {
  SYSTEM_NAME = '晓黑板后台管理系统';

  navItems = NAV_ITEMS;
  allowExpandSubmenu = true;
  selectedItem: NavItem;
  navTitle = '';
  auth = AuthHelper.auth;

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.user) {
      this.navItems = this.navItems.filter(item => {
        const intersection = item.roles.filter(role => {
          return this.auth.user.roles.map(roleObj => roleObj.code as string).includes(role);
        });
        return intersection && intersection.length;
      });
    }

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .switchMapTo(Observable.of(this.activatedRoute))
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        let title = event['title'];
        this.navTitle = title || '';

        if (title) {
          title = `${this.SYSTEM_NAME} - ${title}`;
        } else {
          title = this.SYSTEM_NAME;
        }
        this.titleService.setTitle(title);
      });
  }

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
