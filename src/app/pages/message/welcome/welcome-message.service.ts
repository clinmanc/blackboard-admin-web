import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Page } from '../../../shared/page';
import { RequestMethod } from '@angular/http';

export class ReceiverType {
  static ALL = '所有';
  static PARENT = '家长';
  static STUDENT = '学生';
  static TEACHER = '老师';
}

@ResourceParams({
  url: '/messages/welcome'
})
@Injectable()
export class WelcomeMessageService extends RestClient {
  @ResourceAction({
    isArray: true,
    map: (item: any) => {
      return {
        receiverType: ReceiverType[item.welcomeMessage.receiverType],
        title: item.message.title,
        content: item.message.content,
        createTime: new Date(item.welcomeMessage.createTime).toLocaleDateString()
      }
    }
  })
  query: ResourceMethod<any, Page<any>>;

  @ResourceAction({
    path: '/{:token}',
    method: RequestMethod.Post
  })
  save: ResourceMethod<any, Page<any>>;
}
