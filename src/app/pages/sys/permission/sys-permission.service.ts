import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { environment } from '../../../../environments/environment';
import { RequestMethod } from '@angular/http';
import { SysPermission } from '../../../shared/sys-permission';

class QueryInput extends Pageable { }

@ResourceParams({
  url: `${environment.authUrl}/sys/permissions`
})
@Injectable()
export class SysPermissionService extends RestClient {

  @ResourceAction()
  query: ResourceMethod<QueryInput, Page<SysPermission>>;

  @ResourceAction({
    path: '/all',
    isArray: true
  })
  queryAll: ResourceMethod<QueryInput, SysPermission[]>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<SysPermission, SysPermission>;

  @ResourceAction({
    path: '/{:permissionId}',
    method: RequestMethod.Put
  })
  update: ResourceMethod<SysPermission, SysPermission>;

  @ResourceAction({
    method: RequestMethod.Delete
  })
  remove: ResourceMethod<{ permissionId: string }, void>;

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
