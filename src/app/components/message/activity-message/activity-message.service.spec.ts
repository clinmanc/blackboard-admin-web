import { TestBed, inject } from '@angular/core/testing';

import { ActivityMessageService } from './activity-message.service';

describe('ActivityMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityMessageService]
    });
  });

  it('should be created', inject([ActivityMessageService], (service: ActivityMessageService) => {
    expect(service).toBeTruthy();
  }));
});
