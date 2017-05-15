import { TestBed, inject } from '@angular/core/testing';

import { GrowthTagService } from './growth-tag.service';

describe('GrowthTagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrowthTagService]
    });
  });

  it('should ...', inject([GrowthTagService], (service: GrowthTagService) => {
    expect(service).toBeTruthy();
  }));
});
