import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { Pageable } from '../../shared/pageable';
import { Page } from '../../shared/page';
import { UserHelper } from '../../helper/user-helper';

class QueryInput extends Pageable {
}

@ResourceParams({
  url: '/feedbacks'
})
@Injectable()
export class FeedbackService extends RestClient {
  @ResourceAction({
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {
        return {
          avatar: {
            small: `/assets/img/${item.os === 'ios' || item.os === 'android' ? item.os : 'unknown'}.png`,
            big: `/assets/img/${item.os === 'ios' || item.os === 'android' ? item.os : 'unknown'}.png`,
          },
          name: item.submiter && UserHelper.getDisplayName(item.submiter) || '',
          role: '注册人员',
          advice: item.advice,
          createTime: new Date(item.createTime).toLocaleDateString() || ''
        }
      });
      return page;
    }
  })
  query: ResourceMethod<QueryInput, Page<any>>;
}
