import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../shared/page';

export class QueryInput extends Pageable { }

@ResourceParams({
  url: '/sys/roles'
})
@Injectable()
export class SysRoleService extends RestClient {
  @ResourceAction()
  query: ResourceMethod<QueryInput, Page<any>>;

  @ResourceAction({
    path: '/all',
    isArray: true
  })
  queryAll: ResourceMethod<QueryInput, any[]>;

  @ResourceAction({
    method: RequestMethod.Delete
  })
  remove: ResourceMethod<{ userId: string }, void>;

  getUrl(methodOptions?: any): string | Promise<string> {
    return environment.authUrl + this.getResourcePath();
  }
}
