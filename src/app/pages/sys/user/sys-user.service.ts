import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SysUser } from './sys-user';
import 'rxjs/add/operator/toPromise'
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../components/page';
import { environment } from '../../../../environments/environment';
import { Pageable } from '../../../components/pageable';
import { isNullOrUndefined } from 'util';
import { BaseService } from '../../base-service';

@Injectable()
export class SysUserService extends BaseService<SysUser>{
  constructor(protected http: Http) {
    super(http, 'api/sys/users');
  }
}
