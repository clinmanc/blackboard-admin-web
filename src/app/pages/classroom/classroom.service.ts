import { Injectable } from '@angular/core';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams, ResourceResult } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { AvatarHelper } from '../../helper/badge-helper';
import { UserHelper } from '../../helper/user-helper';

export class QueryInput extends Pageable {
  keyword: string;
}

@Injectable()
@ResourceParams()
export class ClassroomService extends RestClient {

  @ResourceAction({
    path: '/classrooms',
    map: ClassroomService.getResultMap('info')
  })
  queryInfo: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/classrooms/active',
    map: ClassroomService.getResultMap('active')
  })
  queryActive: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/classrooms/recent',
    map: ClassroomService.getResultMap('recent')
  })
  queryRecent: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/classrooms/{:classroomId}/members',
    isArray: true,
    map: (member: any) => {
      return {
        id: member.id,
        name: UserHelper.getDisplayName(member)
      };
    }
  })
  queryClassroomMembers: ResourceMethod<{ classroomId: string }, any>;

  @ResourceAction({
    path: '/messages/classroom',
    isArray: true,
    map: (history: any) => {
      let message = history.message || {};
      return {
        createTime: message.createTime && new Date(message.createTime).toLocaleString(),
        content: message.content
      };
    }
  })
  queryClassroomMessages: ResourceMethod<{
    classroomId: string,
    ownerId: string,
    from: string
  }, any>;

  static getResultMap(type) {

    return (page: Page<any>) => {
      page.content = page.content.map((item) => {
        const classroom = type === 'info' ? item : item.classroom;

        return {
          classroomId: classroom && classroom.id,
          name: classroom && classroom.name || '',
          code: classroom && classroom.code || '',
          ownerId: classroom && classroom.manager && classroom.manager.id,
          createBy: classroom && UserHelper.getDisplayName(classroom.manager) || '',
          createTime: classroom && new Date(classroom.createTime).toLocaleDateString() || '',
          members: '查看成员',
          messages: type === 'info' ? '查看消息' : item.published,
          avatar: AvatarHelper.parseFromClassroom(classroom || {})
        }
      });
      return page;
    }
  }
}
