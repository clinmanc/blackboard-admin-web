import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { RequestMethod } from '@angular/http';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { SysUser } from '../../../shared/sys-user';
import { environment } from '../../../../environments/environment';

class QueryInput extends Pageable { }

@ResourceParams({
  url: '/sys/users'
})
@Injectable()
export class SysUserService extends RestClient {
  @ResourceAction()
  query: ResourceMethod<QueryInput, Page<SysUser>>;

  @ResourceAction({
    path: '/{:userId}',
    method: RequestMethod.Delete
  })
  remove: ResourceMethod<{ userId: string }, Page<SysUser>>;

  getUrl(methodOptions?: any): string | Promise<string> {
    return environment.authUrl + this.getResourcePath();
  }
}
