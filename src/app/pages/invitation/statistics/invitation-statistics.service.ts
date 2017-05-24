import { Injectable } from '@angular/core';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { RestClient } from '../../../shared/rest-client';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';

export class QueryInput extends Pageable {
  invitationCodes?: string;
  invitationCode?: string;
  from: string;
  to: string;
}

@ResourceParams({
  url: '/invitation'
})
@Injectable()
export class InvitationStatisticsService extends RestClient {

  @ResourceAction({
    path: '/statistics',
  })
  queryStatistics: ResourceMethod<QueryInput, Page<any>>;

  @ResourceAction({
    path: '/teachers',
    isArray: true
  })
  queryTeachers: ResourceMethod<QueryInput, any[]>;

  @ResourceAction({
    path: '/classrooms',
    isArray: true
  })
  queryClassrooms: ResourceMethod<QueryInput, any[]>;

  @ResourceAction({
    path: '/members',
    isArray: true
  })
  queryMembers: ResourceMethod<QueryInput, any[]>;

  exportRecords(params) {
    let url = '';
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        url += (url && '&') + key + '=' + params[key];
      }
    }
    window.open(super.getUrl() + '/export?' + url);
  }
}
