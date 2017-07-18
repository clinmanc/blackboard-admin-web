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
  url: `${environment.authUrl}/sys/users`
})
@Injectable()
export class SysUserService extends RestClient {
  @ResourceAction()
  query: ResourceMethod<QueryInput, Page<SysUser>>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<SysUser, SysUser>;

  @ResourceAction({
    path: '/{:userId}',
    method: RequestMethod.Put
  })
  update: ResourceMethod<SysUser, SysUser>;

  @ResourceAction({
    path: '/batch',
    method: RequestMethod.Patch
  })
  removeInBatch: ResourceMethod<{ method: string, data: string[] }, void>;

  @ResourceAction({
    method: RequestMethod.Delete
  })
  removeAll: ResourceMethod<void, void>;
}
