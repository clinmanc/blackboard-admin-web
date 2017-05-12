import { TestBed, inject } from '@angular/core/testing';

import { InvitationRecordService } from './invitation-record.service';

describe('InvitationRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationRecordService]
    });
  });

  it('should ...', inject([InvitationRecordService], (service: InvitationRecordService) => {
    expect(service).toBeTruthy();
  }));
});
