import { TestBed, inject } from '@angular/core/testing';

import { SysPermissionService } from './sys-permission.service';

describe('SysPermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SysPermissionService]
    });
  });

  it('should ...', inject([SysPermissionService], (service: SysPermissionService) => {
    expect(service).toBeTruthy();
  }));
});
