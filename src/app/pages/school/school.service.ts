import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/pageable';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../shared/rest-client';
import { Page } from '../../shared/page';
import { UserHelper } from '../../helper/user-helper';
import { environment } from '../../../environments/environment';

export class QueryInput extends Pageable {

}

@Injectable()
@ResourceParams({
  url: `${environment.url}/users/schools`
})
export class SchoolService extends RestClient {

  @ResourceAction({
    map: (page: Page<any>) => {
      page.content = page.content.map((item) => {

        return {
          name: item,
          members: '注册人员'
        };
      });
      return page;
    }
  })
  query: ResourceMethod<QueryInput, Page<any>>;

  @ResourceAction({
    path: '/{:school}/members',
    isArray: true,
    map: (item: any) => {
      return {
        id: item.id,
        name: UserHelper.getDisplayName(item)
      };
    }
  })
  queryMembers: ResourceMethod<{ school: string }, any[]>;
}
