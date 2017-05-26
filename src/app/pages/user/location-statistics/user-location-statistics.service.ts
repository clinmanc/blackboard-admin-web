import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { RequestMethod } from '@angular/http';

export class QueryInput extends Pageable {
  keyword?: string;
  from?: string;
  to?: string;
}

@Injectable()
@ResourceParams({
  url: '/users/location_statistics',
})
export class UserLocationStatisticsService extends RestClient {

  @ResourceAction()
  query: ResourceMethod<QueryInput, Page<any>>;

  @ResourceAction({
    path: '/status'
  })
  queryStatus: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  generate: ResourceMethod<QueryInput, any[]>;

  @ResourceAction({
    path: '/preview',
    isArray: true
  })
  preview: ResourceMethod<QueryInput, any[]>;
}
