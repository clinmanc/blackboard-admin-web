import { TestBed, inject } from '@angular/core/testing';

import { BlackboardVersionService } from './blackboard-version.service';

describe('BlackboardVersionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlackboardVersionService]
    });
  });

  it('should ...', inject([BlackboardVersionService], (service: BlackboardVersionService) => {
    expect(service).toBeTruthy();
  }));
});
