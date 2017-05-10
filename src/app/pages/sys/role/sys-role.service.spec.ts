import { TestBed, inject } from '@angular/core/testing';

import { SysRoleService } from './sys-role.service';

describe('SysRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SysRoleService]
    });
  });

  it('should ...', inject([SysRoleService], (service: SysRoleService) => {
    expect(service).toBeTruthy();
  }));
});
