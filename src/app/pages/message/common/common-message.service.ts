import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Page } from '../../../shared/page';
import { MessageCategoryHelper } from '../../../helper/message-category-helper';
import { UserHelper } from '../../../helper/user-helper';
import { AvatarHelper } from '../../../helper/avatar-helper';
import { environment } from '../../../../environments/environment';

@ResourceParams({
  url: `${environment.url}/messages`
})
@Injectable()
export class CommonMessageService extends RestClient {
  @ResourceAction({
    map: (page: Page<any>) => {
      page.content = page.content.map(message => {
        message.title = MessageCategoryHelper.parse(message);
        message.senderName = UserHelper.getDisplayName(message.sender);
        message.senderAvatar = AvatarHelper.parseFromUser(message.sender);
        return message;
      });
      return page;
    }})
  query: ResourceMethod<any, Page<any>>;
}
