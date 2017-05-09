import { Component, HostBinding, OnInit } from '@angular/core';
import { SysUserService } from "./sys-user.service";
import { MdSnackBar } from "@angular/material";
import { SysUser } from "./sys-user";
import { Page } from "../../../components/page";
import { BasePage } from "../../base-page";

@Component({
  selector: 'app-user',
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.css'],
})
export class SysUserComponent extends BasePage implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;

  page: Page<SysUser>;

  settings = {
    columns: [
      { key: 'userId', name: '用户标识', sortable: true },
      { key: 'username', name: '用户名', sortable: true },
      {
        key: 'age', name: '年龄', sortable: true, numeric: true, formatter: (value) => {
          return `<span class="red">${value}</span>`;
        }
      }
    ]
  };

  source = [];

  constructor(private sysUserService: SysUserService, protected snackBar: MdSnackBar) {
    super(snackBar);
    this.load();
  }

  ngOnInit() { }

  onSwitchPage(url: string) {
    this.load();
  }

  load() {
    this.sysUserService.listAllUsers()
      .subscribe(page => {
        this.source = page.content;
        this.page = page;
      }, this.handleError.bind(this));
  }
}
