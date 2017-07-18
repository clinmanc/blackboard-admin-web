import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Page } from '../../../shared/page';
import { Headers, RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../../../environments/environment';
import { AuthHelper } from '../../../helper/authorization-helper';

export class ReceiveType {
  static ALL = '所有';
  static PARENT = '家长';
  static STUDENT = '学生';
  static TEACHER = '老师';
}

@ResourceParams({
  url: `${environment.url}/messages/announcement`
})
@Injectable()
export class AnnouncementMessageService extends RestClient {
  @ResourceAction({
    isArray: true,
    map: (item: any) => {
      return {
        messageId: item.message.id,
        receiveType: ReceiveType[item.announcement.receiveType],
        title: item.message.title,
        content: item.message.content,
        createTime: new Date(item.announcement.createTime).toLocaleDateString(),
        action: '删除'
      };
    }
  })
  query: ResourceMethod<any, Page<any>>;

  save(params) {
    const data = new FormData();
    for (const key in params) {
      if (params.hasOwnProperty(key) && 'cover' !== key) {
        data.set(key, params[key]);
      }
    }
    data.append('cover', params.cover);

    const options: RequestOptionsArgs = new RequestOptions();
    options.headers = new Headers(AuthHelper.extendHeaders());

    return this.http.post(`${environment.url}/messages/announcement`, data, options);
  }

  @ResourceAction({
    path: '/batch',
    method: RequestMethod.Patch
  })
  removeInBatch: ResourceMethod<{ method: string, data: string[] }, void>;

  @ResourceAction({
    method: RequestMethod.Delete
  })
  removeAll: ResourceMethod<void, void>;
}
