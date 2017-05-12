import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { Page } from '../../shared/page';
import { AvatarHelper } from '../../helper/badge-helper';
import {UserHelper} from "../../helper/user-helper";

export class QueryInput extends Pageable {
  keyword: string
}

export class UseRoleMapper {
  static PARENT = '家长';
  static STUDENT = '学生';
  static TEACHER = '老师';
}

export class UseStatusMapper {
  static OFFLINE = '离线';
  static ONLINE = '在线';
  static DISABLED = '禁用';
}

@Injectable()
@ResourceParams({
  url: '/users'
})
export class UserService extends RestClient {

  @ResourceAction({
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {

        return {
          name: UserHelper.getDisplayName(item),
          status: UseStatusMapper[item.status],
          role: UseRoleMapper[item.role],
          school: item.school,
          messages: '查看消息',
          createTime: new Date(item.createTime).toLocaleDateString(),
          avatar: AvatarHelper.parseFromUser(item)
        }
      });
      return page;
    }
  })
  query: ResourceMethod<QueryInput, any>;
}
