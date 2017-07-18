import {Injectable} from '@angular/core';
import {RestClient} from '../../../shared/rest-client';
import {UserHelper} from '../../../helper/user-helper';
import {ResourceAction, ResourceParams} from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
/**
 * Created by Lucifer on 2017/7/6.
 */

@Injectable()
@ResourceParams()
export class ClassroomUserInfoService extends RestClient {
  @ResourceAction({
    path: '/classrooms/{:classroomId}/membersInfo',
    isArray: true,
    map: (member: any) => {
      return {
        classroomId: member.userId,
        name: UserHelper.getDisplayName(member),
        createdClassroom: member.createdClassroom,
        peopleNum: member.peopleNum,
        joinedClassroom: member.joinedClassroom,
        messageNum: member.messageNum
      };
    }
  })
  queryClassroomMembers: ResourceMethod<any, any[]>;
}
