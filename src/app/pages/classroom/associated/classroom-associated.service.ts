import { Injectable } from '@angular/core';
import { Pageable } from '../../../shared/pageable';
import { RestClient } from '../../../shared/rest-client';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod, ResourceMethodStrict } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { Page } from '../../../shared/page';
import { UserHelper } from '../../../helper/user-helper';
import { AvatarHelper } from '../../../helper/badge-helper';

export class QueryInput extends Pageable {
  classroomCode?: string;
  from: string;
  to: string;
}

@ResourceParams({
  url: '/classrooms/'
})
@Injectable()
export class ClassroomAssociatedService extends RestClient {

  @ResourceAction({
    path: '/associated/statistics',
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {

        return {
          name: item.name,
          code: item.code,
          createBy: UserHelper.getDisplayName(item.manager),
          createTime: new Date(item.createTime).toLocaleDateString(),
          members: '查看成员',
          avatar: AvatarHelper.parseFromClassroom(item || {}),
          memberNum: item.attrs.memberNum,
          associatedClassroomNum: item.attrs.classrommNum,
          associatedPeopleNum: item.attrs.allMemberNum
        }
      });
      return page;
    }
  })
  queryAssociatedStatistics: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '{:classroomId}/members',
    isArray: true
  })
  queryClassroomMembers: ResourceMethod<QueryInput, any[]>;

  @ResourceAction({
    path: '{:classroomId}/associated/classrooms',
    isArray: true
  })
  queryAssociatedClassrooms: ResourceMethod<QueryInput, any[]>;
}
