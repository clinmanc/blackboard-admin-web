import { Injectable } from '@angular/core';
import { Page } from '../../shared/page';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { AvatarHelper } from '../../helper/avatar-helper';
import { UserHelper } from '../../helper/user-helper';
import { MessageCategoryHelper } from '../../helper/message-category-helper';

export class QueryInput extends Pageable {
  keyword: string;
}

@Injectable()
@ResourceParams()
export class ClassroomService extends RestClient {

  @ResourceAction({
    path: '/statistics/message/classroom_message',
    map: (page: Page<any>) => {
      page.content = page.content.map(item => {
        const classroom = item.classroom || {};

        return {
          manager: classroom.manager,
          avatar: AvatarHelper.parseFromClassroom(classroom),
          classroomId: classroom.id,
          name: classroom.name,
          code: classroom.code,
          memberCount: item.memberCount,
          ownerId: classroom.manager && classroom.manager.id,
          createBy: UserHelper.getDisplayName(classroom.manager),
          invitationCode: (item.invitedUser || {}).number,
          invitedUser: item.invitedUser,
          createTime: classroom.createTime && new Date(classroom.createTime).toLocaleDateString(),
          noticeCount: item.noticeCount,
          topicMessageCount: item.topicMessageCount,
          surveyCount: item.surveyCount,
          videoCount: item.videoCount,
          activityCount: item.activityCount,
          growthCount: item.growthCount,
          paperSlipCount: item.paperSlipCount,
          messageCount: item.messageCount
        };
      });
      return page;
    }
  })
  queryStatistics: ResourceMethod<QueryInput, Page<any>>;

  @ResourceAction({
    path: '/statistics/message/classroom_message_count'
  })
  queryMessageCount: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/classrooms/{:classroomId}/members',
    isArray: true,
    map: (member: any) => {
      return {
        classroomId: member.id,
        name: UserHelper.getDisplayName(member)
      };
    }
  })
  queryClassroomMembers: ResourceMethod<{ classroomId: string }, any[]>;

  @ResourceAction({
    path: '/statistics/message/classroom_messages',
    // path: '/classrooms/{:classroomId}/messages',
    map: (page: Page<any>) => {
      page.content = page.content.map(history => {
        const message = history.message || {};
        message.sender = message.sender || {};

        message.title = MessageCategoryHelper.parse(message);
        message.direction = history.direction;
        message.senderId = (message.sender || {}).id;
        message.senderName = UserHelper.getDisplayName(message.sender);
        message.senderAvatar = AvatarHelper.parseFromUser(message.sender);
        return message;
      });
      return page;
    }
  })
  queryClassroomMessages: ResourceMethod<{
    classroomId: string,
    category: string,
    fromDate: string,
    toDate: string
  }, Page<any>>;
}
