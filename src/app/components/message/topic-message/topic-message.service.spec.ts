import { TestBed, inject } from '@angular/core/testing';

import { TopicMessageService } from './topic-message.service';

describe('TopicMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicMessageService]
    });
  });

  it('should be created', inject([TopicMessageService], (service: TopicMessageService) => {
    expect(service).toBeTruthy();
  }));
});
