import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { Page } from '../../shared/page';
import { AvatarHelper } from '../../helper/avatar-helper';
import { UserHelper } from '../../helper/user-helper';
import { MessageCategoryHelper } from '../../helper/message-category-helper';

export class QueryInput extends Pageable {
  keyword?: string;
  fromDate?: string;
  toDate?: string;
}

export class QueryMessagesInput extends Pageable {
  userId: string;
  category: string;
  fromDate?: string;
  toDate?: string;
}

export class UseRoleMapper {
  static PARENT = '家长';
  static STUDENT = '学生';
  static TEACHER = '教师';
}

@Injectable()
@ResourceParams()
export class UserService extends RestClient {
  @ResourceAction({
    path: '/statistics/message/user_message',
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {
        const user = item.user || {};

        return {
          user: user,
          avatar: AvatarHelper.parseFromUser(user),
          userId: user.id,
          name: UserHelper.getDisplayName(user),
          role:  UseRoleMapper[user.role],
          invitationCode: (item.invitedUser || {}).number,
          invitedUser: item.invitedUser,
          school: user.school,
          createdClassroom: item.createdClassroom,
          memberCount: item.memberCount,
          joinedClassroom: item.joinedClassroom,
          createTime: user.createTime && new Date(user.createTime).toLocaleDateString(),
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
    path: '/statistics/message/user_message_count'
  })
  queryMessageCount: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/users/{:userId}/members',
    isArray: true,
    map: user => {
      return {
        userId: user.id,
        name: UserHelper.getDisplayName(user)
      };
    }
  })
  queryUserMembers: ResourceMethod<{ userId: string }, any[]>;

  @ResourceAction({
    path: '/statistics/message/user_messages',
    // path: '/users/{:userId}/messages',
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
  queryUserMessages: ResourceMethod<QueryMessagesInput, Page<any>>;

  @ResourceAction({
    path: '/users/registered_statistics',
    isArray: true,
    map: (item: any) => {
      return {
        date: item._id,
        count: item.countNum
      };
    }
  })
  queryRegisteredStatistics: ResourceMethod<any, any>;
}
