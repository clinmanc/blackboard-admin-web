import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';

class QueryInput extends Pageable { }

@ResourceParams({
  url: '/growth/records'
})
@Injectable()
export class GrowthRecordService extends RestClient {
  @ResourceAction({})
  query: ResourceMethod<QueryInput, Page<any>>;
}
