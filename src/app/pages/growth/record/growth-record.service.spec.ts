import { TestBed, inject } from '@angular/core/testing';

import { GrowthRecordService } from './growth-record.service';

describe('GrowthRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrowthRecordService]
    });
  });

  it('should ...', inject([GrowthRecordService], (service: GrowthRecordService) => {
    expect(service).toBeTruthy();
  }));
});
