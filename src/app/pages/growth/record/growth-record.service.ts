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
  @ResourceAction({
    map: (page: Page<any>) => {


      page.content = page.content.map((item) => {
        return {
          createBy: item.growthRecord.createrInfo.realname,
          content: item.growthRecord.content,
          createTime: new Date(item.growthRecord.createTime).toLocaleDateString() || '',
          praiseNum: item.praiseNum,
          commentsNum: item.readNum,
          status: (item.growthRecord.isEnable === 0 && 'DELETED') ||
          (item.growthRecord.permissions === 'ONLY_SELF' && 'PRIVATE') || 'PUBLIC'
        };
      });
      return page;
    }
  })
  query: ResourceMethod<QueryInput, Page<any>>;
}
