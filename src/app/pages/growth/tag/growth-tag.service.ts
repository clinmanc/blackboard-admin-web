import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { RequestMethod } from '@angular/http';

class QueryInput extends Pageable {
}

@ResourceParams({
  url: '/growth/tags'
})
@Injectable()
export class GrowthTagService extends RestClient {
  @ResourceAction()
  query: ResourceMethod<QueryInput, Page<any>>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<any, Page<any>>;

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
