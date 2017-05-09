import { TestBed, inject } from '@angular/core/testing';

import { SysUserService } from './sys-user.service';

describe('SysUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SysUserService]
    });
  });

  it('should ...', inject([SysUserService], (service: SysUserService) => {
    expect(service).toBeTruthy();
  }));
});
