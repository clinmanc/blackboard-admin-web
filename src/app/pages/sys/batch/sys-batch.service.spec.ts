import { TestBed, inject } from '@angular/core/testing';

import { SysBatchService } from './sys-batch.service';

describe('SysBatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SysBatchService]
    });
  });

  it('should be created', inject([SysBatchService], (service: SysBatchService) => {
    expect(service).toBeTruthy();
  }));
});
