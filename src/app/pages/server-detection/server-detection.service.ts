import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { Page } from '../../shared/page';
import { environment } from '../../../environments/environment';

@ResourceParams({
  url: `${environment.url}/server/detection`
})
@Injectable()
export class ServerDetectionService extends RestClient {
  @ResourceAction({
    isArray: true
  })
  query: ResourceMethod<void, Page<any>>;
}
