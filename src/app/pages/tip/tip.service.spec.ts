import { TestBed, inject } from '@angular/core/testing';

import { TipService } from './tip.service';

describe('TipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipService]
    });
  });

  it('should ...', inject([TipService], (service: TipService) => {
    expect(service).toBeTruthy();
  }));
});
