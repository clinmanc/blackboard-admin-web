import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { RestClient } from '../../../shared/rest-client';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod, ResourceMethodStrict } from 'ngx-resource/src/Interfaces';
import { environment } from '../../../../environments/environment';

export class QueryInput extends Pageable {
  invitationCodes?: string[];
  invitationCode?: string;
  from: string;
  to: string;
}

@ResourceParams({
  url: `${environment.url}/invitation`
})
@Injectable()
export class InvitationStatisticsService extends RestClient {

  @ResourceAction({
    path: '/statistics?size={:size}&page={:page}&sort={:sort}&direction={:direction}',
    method: RequestMethod.Post
  })
  queryStatistics: ResourceMethodStrict<QueryInput, Pageable, Page<any>>;

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
    window.location.href = environment.baseUrl + '/invitation/exportV2?' + url;
  }
}
