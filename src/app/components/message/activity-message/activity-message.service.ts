import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { environment } from '../../../../environments/environment';
import { Pageable } from '../../../shared/pageable';
import { RestClient } from '../../../shared/rest-client';
import { Page } from '../../../shared/page';

class QueryInput extends Pageable {
}

@ResourceParams({
  url: `${environment.url}`
})
@Injectable()
export class ActivityMessageService extends RestClient {
  @ResourceAction({
    path: '/statistics/message/user_messages',
    map: (page: Page<any>) => {
      page.content = page.content.map(item => {
        return {
          record: item.growth.growthRecord,
          audio: item.growth.growthRecordAudio,
          video: item.growth.growthRecordvideo,
          images: item.growth.growthRecordImageList,
          tags: item.growth.tag && item.growth.tag.split(',') || [],
          praises: item.growth.praiseList.map(praise => {
            return {
              praise: praise.growthRecordPraise,
              user: praise.user
            };
          }),
          comments: item.growth.commentList.map(comment => {
            return {
              comment: comment.growthRecordComment,
              sender: comment.sender,
              receiver: comment.receiver
            };
          }),
        };
      });
      return page;
    }
  })
  query: ResourceMethod<QueryInput, Page<any>>;
}
