import { Injectable } from '@angular/core';
import { Pageable } from '../../../shared/pageable';
import { RestClient } from '../../../shared/rest-client';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod, ResourceMethodStrict } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { Page } from '../../../shared/page';
import { UserHelper } from '../../../helper/user-helper';
import { AvatarHelper } from '../../../helper/avatar-helper';
import { environment } from '../../../../environments/environment';

export class QueryInput extends Pageable {
  classroomCode?: string;
  from: string;
  to: string;
}

@ResourceParams({
  url: `${environment.url}/classrooms/`
})
@Injectable()
export class ClassroomAssociatedService extends RestClient {

  @ResourceAction({
    path: '/associated/statistics',
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {

        return {
          classroomId: item.id,
          name: item.name,
          code: item.code,
          createBy: UserHelper.getDisplayName(item.manager),
          createTime: new Date(item.createTime).toLocaleDateString(),
          members: '查看成员',
          avatar: AvatarHelper.parseFromClassroom(item || {}),
          memberNum: item.attrs.memberNum,
          associatedClassroomNum: item.attrs.classrommNum,
          memberIds: item.attrs.classroomShow.split('@').filter(memberId => memberId),
          associatedPeopleNum: item.attrs.allMemberNum
        };
      });
      return page;
    }
  })
  queryAssociatedStatistics: ResourceMethod<QueryInput, Page<any>>;

  @ResourceAction({
    path: '/{:classroomId}/members',
    isArray: true,
    map: (member: any) => {
      return {
        userId: member.id,
        userName: UserHelper.getDisplayName(member)
      };
    }
  })
  queryClassroomMembers: ResourceMethod<{ classroomId: string }, any>;

  @ResourceAction({
    path: '{:classroomId}/associated/classrooms',
    method: RequestMethod.Post,
    isArray: true,
    map: (classroom: any) => {
      return {
        classroomId: classroom.id,
        classroomName: classroom.username,
        membersCount: classroom.mobile
      };
    }
  })
  queryAssociatedClassrooms: ResourceMethodStrict<{ memberIds: string[] }, { classroomId: string }, any[]>;
}
