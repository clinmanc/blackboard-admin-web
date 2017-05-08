import {Component, HostBinding, OnInit} from '@angular/core';
import { SysUserService } from "./sys-user.service";
import { MdSnackBar } from "@angular/material";
import { SysUser } from "./sys-user";
import { Page } from "../../components/page";

@Component({
  selector: 'app-user',
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.css']
})
export class SysUserComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;

  page: Page<SysUser>;

  settings = {
    columns: [
      { key: 'userId', name: '用户标识', sortable: true },
      { key: 'username', name: '用户名', sortable: true },
      { key: 'age', name: '年龄', sortable: true, numeric: true, formatter: (value) => {
        return `<span class="red">${value}</span>`;
      }}
    ]
  };

  source = [];

  constructor(private sysUserService: SysUserService, private snackBar: MdSnackBar) {
    this.load();
  }

  ngOnInit() {
  }

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

  handleError(err) {
    this.snackBar.open(err.message || err, "知道了", { duration: 3000 })
    let p:Page<any> = new Page();
    p.content = [ new SysUser('1', 'KOMA001', 11), new SysUser('2', 'KOMA002', 12)];
    this.source = p.content;
    this.page = p;
  }
}
