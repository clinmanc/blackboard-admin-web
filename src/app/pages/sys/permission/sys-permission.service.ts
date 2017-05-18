import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { environment } from '../../../../environments/environment';
import {RequestMethod} from "@angular/http";

class QueryInput extends Pageable { }

@ResourceParams({
  url: '/sys/permissions'
})
@Injectable()
export class SysPermissionService extends RestClient {

  @ResourceAction()
  query: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    method: RequestMethod.Delete
  })
  remove: ResourceMethod<{ permissionId: string }, any>;

  getUrl(methodOptions?: any): string | Promise<string> {
    return environment.authUrl + this.getResourcePath();
  }
}
