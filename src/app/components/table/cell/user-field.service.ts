import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';

@Injectable()
@ResourceParams()
export class UserFieldService extends RestClient {
  @ResourceAction({
    path: '/users/{:userId}'
  })
  get: ResourceMethod<{
    userId: string,
    showPrivacy: boolean,
    goldenCode: string
  }, any>;
}
