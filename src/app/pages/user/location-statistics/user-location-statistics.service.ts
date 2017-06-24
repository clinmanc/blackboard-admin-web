import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { RequestMethod } from '@angular/http';
import { environment } from '../../../../environments/environment';

export class QueryInput extends Pageable {
  keyword?: string;
  from?: string;
  to?: string;
}

@Injectable()
@ResourceParams({
  url: `${environment.url}/users/location_statistics`,
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

  preview(input: { name: string }) {
    window.open(`${environment.baseUrl}/location/preView/${input.name}`);
  }
}
