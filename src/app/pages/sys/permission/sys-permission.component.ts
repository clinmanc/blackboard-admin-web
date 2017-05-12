import { Component, OnInit } from '@angular/core';
import { SysPermissionService } from './sys-permission.service';
import { BasePage } from '../../base-page';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-sys-permission',
  templateUrl: './sys-permission.component.html',
  styleUrls: ['./sys-permission.component.scss'],
  providers: [SysPermissionService]
})
export class SysPermissionComponent extends BasePage implements OnInit {
  pageable = new Pageable();
  page = new Page<any>();

  settings = {
    columns: [
      { key: 'name', name: '权限', sortable: true },
      { key: 'url', name: '资源', sortable: true },
      { name: '操作' }
    ]
  };

  constructor(private sysPermissionService: SysPermissionService, protected snackBar: MdSnackBar) {
    super(snackBar);
  }

  ngOnInit() {
    this.loadPage(new Pageable);
  }

  loadPage(pageable: Pageable) {
    this.pageable = pageable;
    this.startQuery();
    this.sysPermissionService.query(pageable).$observable
      .subscribe((page) => {
        this.completeQuery();
        this.page = page;
      }, this.handleError.bind(this));
  }
}
