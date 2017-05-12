import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { SysUser } from './sys-user';
import { RequestMethod } from '@angular/http';

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
}
