import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import {RequestMethod} from '@angular/http';
import {RestClient} from '../../shared/rest-client';
import {Page} from '../../shared/page';
import { environment } from '../../../environments/environment';

class PromoterInfo {
  mobile: string;
  province: string;
  city: string;
  invitedNumber: string;
}

@ResourceParams({
  url: `${environment.url}/promotersInfo`
})
@Injectable()
export class PromotersInfoService extends RestClient {
  @ResourceAction({
    method: RequestMethod.Get,
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {
        return {
          id : item.id,
          city: item.city,
          province: item.province,
          invitedNumber: item.invitedNumber,
          mobile: item.user && item.user.mobile,
          realname: item.user && item.user.realname
        };
      });
      return page;
    }
  })
  query: ResourceMethod<any, Page<any>>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<PromoterInfo, PromoterInfo>;

  @ResourceAction({
    path: '/{:id}',
    method: RequestMethod.Delete
  })
  remove: ResourceMethod<{
    id: string
  }, void>;
}
