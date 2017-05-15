import { Injectable } from '@angular/core';
import { Pageable } from '../../../shared/pageable';
import { RestClient } from '../../../shared/rest-client';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { Page } from '../../../shared/page';
import { UserHelper } from '../../../helper/user-helper';

export class QueryInput extends Pageable {
  keyword?: string;
}

@ResourceParams({
  url: '/invitation'
})
@Injectable()
export class InvitationRecordService extends RestClient {

  @ResourceAction({
    path: '/records',
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {

        return {
          inviter: UserHelper.getDisplayName(item.teacher),
          invitee: UserHelper.getDisplayName(item.invitedTeacher),
          invitationCode: item.number,
          invitationTime: new Date(item.createTime).toLocaleDateString()
        }
      });
      return page;
    }
  })
  query: ResourceMethod<QueryInput, any>;
}
