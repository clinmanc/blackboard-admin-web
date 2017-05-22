import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { Page } from '../../shared/page';
import { RequestMethod } from '@angular/http';

export class QueryInput extends Pageable {

}

@Injectable()
@ResourceParams({
  url: '/exports'
})
export class ExportService extends RestClient {

  @ResourceAction({
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {

        return {
        };
      });
      return page;
    }
  })
  query: ResourceMethod<QueryInput, Page<any>>;

  @ResourceAction({
    path: '/status',
    method: RequestMethod.Post
  })
  checkStatus: ResourceMethod<any, any>;

  @ResourceAction({
    path: '/generate',
    method: RequestMethod.Post
  })
  generate: ResourceMethod<any, any>;
}
