import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';

export class QueryInput extends Pageable { }

@Injectable()
@ResourceParams({
  url: '/app/version'
})
export class BlackboardVersionService extends RestClient {

  @ResourceAction({
    path: '/latest',
    map: (version: any) => {
      return {
        name: version.versionName,
        downloadUrl: version.updateUrl,
        description: version.versionDesc,
        createTime: new Date(version.createTime).toLocaleDateString(),
        mandatoryUpdate: version.constraint
      };
    }
  })
  query: ResourceMethod<QueryInput, any>;
}
