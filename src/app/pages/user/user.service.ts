import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { Page } from '../../shared/page';
import { AvatarHelper } from '../../helper/badge-helper';
import { UserHelper } from '../../helper/user-helper';

export class QueryInput extends Pageable {
  keyword?: string;
  from?: string;
  to?: string;
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
@ResourceParams()
export class UserService extends RestClient {
  static getResultMap(type) {

    return (page: Page<any>) => {
      page.content = page.content.map((item) => {
        const teacher = type === 'info' ? item : item.teacher;

        return {
          userId: teacher && teacher.id,
          name: UserHelper.getDisplayName(teacher),
          status: teacher && UseStatusMapper[teacher.status],
          role: teacher && UseRoleMapper[teacher.role],
          school: teacher && teacher.school,
          messages: type === 'info' ? '查看消息' : item.published,
          createTime: teacher && new Date(teacher.createTime).toLocaleDateString() || '',
          avatar: AvatarHelper.parseFromUser(teacher || {})
        }
      });
      return page;
    }
  }

  @ResourceAction({
    path: '/users',
    map: UserService.getResultMap('info')
  })
  queryInfo: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/users/active',
    map: UserService.getResultMap('active')
  })
  queryActive: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/users/registered_statistics',
    isArray: true,
    map: (item: any) => {
      return {
        date: item._id,
        count: item.countNum
      }
    }
  })
  queryRegisteredStatistics: ResourceMethod<any, any>;

  @ResourceAction({
    path: '/messages/teacher',
    isArray: true,
    map: (history: any) => {
      let message = history.message || {};
      return {
        createTime: message.createTime && new Date(message.createTime).toLocaleString(),
        content: message.content
      };
    }
  })
  queryTeacherMessages: ResourceMethod<{
    ownerId: string,
    from: string
  }, any>;
}
