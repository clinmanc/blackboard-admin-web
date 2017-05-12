import { Injectable } from '@angular/core';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams, ResourceResult } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { AvatarHelper } from '../../helper/badge-helper';

export class QueryInput extends Pageable {
  keyword: string
}

@Injectable()
@ResourceParams({
  url: '/classrooms'
})
export class ClassroomService extends RestClient {
  static getResultMap(type){

    return (page: Page<any>) => {
      page.content = page.content.map((item) => {
        const classroom = type === 'active'? item : item.classroom;

        return {
          name: classroom.name,
          code: classroom.code,
          createBy: classroom.manager && `${classroom.manager.realname || classroom.manager.username}（${classroom.manager.mobile}）`,
          createTime: new Date(classroom.createTime).toLocaleDateString(),
          members: '查看成员',
          messages: type == 'active'? '查看消息' : item.published,
          avatar: AvatarHelper.parseFromSchool(classroom)
        }
      });
      return page;
    }
  }

  @ResourceAction({
    map: ClassroomService.getResultMap('')
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
}
