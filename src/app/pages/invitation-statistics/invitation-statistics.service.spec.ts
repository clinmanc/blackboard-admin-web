import { TestBed, inject } from '@angular/core/testing';

import { InvitationStatisticsService } from './invitation-statistics.service';

describe('InvitationStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationStatisticsService]
    });
  });

  it('should ...', inject([InvitationStatisticsService], (service: InvitationStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
