import { TestBed, inject } from '@angular/core/testing';

import { ClassroomAssociatedService } from './classroom-associated.service';

describe('ClassroomAssociatedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomAssociatedService]
    });
  });

  it('should ...', inject([ClassroomAssociatedService], (service: ClassroomAssociatedService) => {
    expect(service).toBeTruthy();
  }));
});
