import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Page } from '../../../shared/page';

@ResourceParams({
  url: '/messages'
})
@Injectable()
export class CommonMessageService extends RestClient {
  @ResourceAction({})
  query: ResourceMethod<any, Page<any>>;
}
