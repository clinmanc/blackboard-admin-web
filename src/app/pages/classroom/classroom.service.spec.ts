import { TestBed, inject } from '@angular/core/testing';

import { ClassroomService } from './classroom.service';

describe('ClassroomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassroomService]
    });
  });

  it('should ...', inject([ClassroomService], (service: ClassroomService) => {
    expect(service).toBeTruthy();
  }));
});
