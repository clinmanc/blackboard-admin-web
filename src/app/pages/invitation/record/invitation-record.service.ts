import { Injectable } from '@angular/core';
import { Pageable } from '../../../shared/pageable';
import { RestClient } from '../../../shared/rest-client';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { Page } from '../../../shared/page';
import { UserHelper } from '../../../helper/user-helper';
import {RequestMethod} from '@angular/http';
import { environment } from '../../../../environments/environment';

export class QueryInput extends Pageable {
  keyword?: string;
}

@ResourceParams({
  url: `${environment.url}/invitation`
})
@Injectable()
export class InvitationRecordService extends RestClient {

  @ResourceAction({
    path: '/records/{:id}',
    method: RequestMethod.Patch
  })
  update: ResourceMethod<any, any>;

  @ResourceAction({
    path: '/records',
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {

        return {
          id : item.id,
          inviter: UserHelper.getDisplayName(item.teacher),
          invitee: UserHelper.getDisplayName(item.invitedTeacher),
          invitationCode: item.number,
          invitationTime: new Date(item.createTime).toLocaleDateString(),
          city: item.city,
          province: item.province
        };
      });
      return page;
    }
  })
  query: ResourceMethod<QueryInput, Page<any>>;
}
