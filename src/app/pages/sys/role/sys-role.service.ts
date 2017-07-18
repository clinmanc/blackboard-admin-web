import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/page';
import { SysRole } from '../../../shared/sys-role';

export class QueryInput extends Pageable { }

@ResourceParams({
  url: `${environment.authUrl}/sys/roles`
})
@Injectable()
export class SysRoleService extends RestClient {
  @ResourceAction()
  query: ResourceMethod<QueryInput, Page<SysRole>>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<SysRole, SysRole>;

  @ResourceAction({
    path: '/{:roleId}',
    method: RequestMethod.Put
  })
  update: ResourceMethod<SysRole, SysRole>;

  @ResourceAction({
    path: '/all',
    isArray: true
  })
  queryAll: ResourceMethod<QueryInput, SysRole[]>;

  @ResourceAction({
    method: RequestMethod.Delete
  })
  remove: ResourceMethod<{ userId: string }, void>;

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
