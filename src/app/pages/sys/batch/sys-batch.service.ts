import { Injectable } from '@angular/core';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../../shared/rest-client';
import { environment } from '../../../../environments/environment';

@Injectable()
@ResourceParams({
  url: `${environment.url}/sys/batch`
})
export class SysBatchService extends RestClient {
  @ResourceAction({
    path: '/step_executions',
    isArray: true
  })
  queryAllStepExecutions: ResourceMethod<{ running ?: boolean}, any[]>;

  @ResourceAction({
    path: '/jobs',
    isArray: true
  })
  queryJobNames: ResourceMethod<void, any[]>;

  @ResourceAction({
    path: '/jobs/{:name}/instances',
    isArray: true
  })
  queryJobInstances: ResourceMethod<{ name: string }, any[]>;

  @ResourceAction({
    path: '/job_instances/{:instanceId}/executions',
    isArray: true
  })
  queryJobExecutions: ResourceMethod<{ instanceId: number }, any[]>;
}
