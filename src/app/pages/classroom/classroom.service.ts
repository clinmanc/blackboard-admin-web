import { Injectable } from '@angular/core';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams, ResourceResult } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { AvatarHelper } from '../../helper/badge-helper';
import { UserHelper } from '../../helper/user-helper';

export class QueryInput extends Pageable {
  keyword: string
}

@Injectable()
@ResourceParams({
  url: '/classrooms'
})
export class ClassroomService extends RestClient {

  @ResourceAction({
    map: ClassroomService.getResultMap('info')
  })
  queryInfo: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/active',
    map: ClassroomService.getResultMap('active')
  })
  queryActive: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/recent',
    map: ClassroomService.getResultMap('recent')
  })
  queryRecent: ResourceMethod<QueryInput, any>;

  static getResultMap(type) {

    return (page: Page<any>) => {
      page.content = page.content.map((item) => {
        const classroom = type === 'info' ? item : item.classroom;

        return {
          name: classroom && classroom.name || '',
          code: classroom && classroom.code || '',
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
