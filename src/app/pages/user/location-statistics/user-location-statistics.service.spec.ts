import { TestBed, inject } from '@angular/core/testing';

import { UserLocationStatisticsService } from './user-location-statistics.service';

describe('UserLocationStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLocationStatisticsService]
    });
  });

  it('should ...', inject([UserLocationStatisticsService], (service: UserLocationStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
