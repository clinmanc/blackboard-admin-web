import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { environment } from '../../../environments/environment';

@Injectable()
@ResourceParams({
  url: `${environment.url}/development_logs`
})
export class DashboardService extends RestClient {
  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<void, any[]>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<any, any>;

  @ResourceAction({
    path: '/{:id}',
    method: RequestMethod.Put
  })
  update: ResourceMethod<any, any>;

  @ResourceAction({
    path: '/{:id}',
    method: RequestMethod.Delete
  })
  remove: ResourceMethod<{ id: string}, void>;
}
