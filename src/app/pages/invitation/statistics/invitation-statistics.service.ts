import { Injectable } from '@angular/core';
import { Pageable } from '../../../shared/pageable';
import { RestClient } from '../../../shared/rest-client';
import { ResourceAction, ResourceParams} from 'ngx-resource';
import { ResourceMethod, ResourceMethodStrict } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';

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
    path: '/statistics'
  })
  queryStatistics: ResourceMethod<QueryInput, any>;

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

  @ResourceAction({
    path: '/export',
    method: RequestMethod.Post
  })
  exportRecords: ResourceMethod<QueryInput, any>;
}
