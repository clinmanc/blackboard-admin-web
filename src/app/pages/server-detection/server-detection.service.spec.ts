import { TestBed, inject } from '@angular/core/testing';

import { ServerDetectionService } from './server-detection.service';

describe('ServerDetectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerDetectionService]
    });
  });

  it('should ...', inject([ServerDetectionService], (service: ServerDetectionService) => {
    expect(service).toBeTruthy();
  }));
});
