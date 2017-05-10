import { Injectable } from '@angular/core';
import { BaseService } from '../../base-service';
import { Http } from '@angular/http';

@Injectable()
export class SysRoleService extends BaseService<any>{
  constructor(protected http: Http) {
    super(http, 'api/sys/roles');
  }
}
