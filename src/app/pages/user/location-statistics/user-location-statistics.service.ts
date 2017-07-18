import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { Pageable } from '../../../shared/pageable';
import { Page } from '../../../shared/page';
import { RequestMethod } from '@angular/http';
import { environment } from '../../../../environments/environment';

export class QueryInput extends Pageable {
  classroomNum?: any[];
  from?: string;
  to?: string;
  type?: string;
}

@Injectable()
@ResourceParams()
export class UserLocationStatisticsService extends RestClient {
  @ResourceAction({
    method: RequestMethod.Post,
    path: '/classrooms/exportUserInfo'
  })
  queryClassroomUserInfoStatus: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/exports/{:exportType}'
  })
  exportUserInfo: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/exports'
  })
  query: ResourceMethod<any, Page<any>>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/exports/location_statistics/status'
  })
  queryStatus: ResourceMethod<QueryInput, any>;

  @ResourceAction({
    path: '/users/location_statistics',
    method: RequestMethod.Post
  })
  generate: ResourceMethod<QueryInput, any[]>;

  preview(input: { name: string }) {
    window.open(`${environment.baseUrl}/location/preView/${input.name}`);
  }


  download(input: { name: string, exportType: string }) {
    window.open(`${environment.baseUrl}/dataExport/downloadFile/${input.name}/${input.exportType}`);
  }


}
