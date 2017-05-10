import { Injectable } from '@angular/core';
import { BaseService } from '../../base-service';
import { Http } from '@angular/http';

@Injectable()
export class SysPermissionService extends BaseService<any>{

  constructor(protected http: Http) {
    super(http, 'api/sys/permissions');
  }

}
