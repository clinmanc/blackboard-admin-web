import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicMessageComponent } from './topic-message.component';

describe('TopicMessageComponent', () => {
  let component: TopicMessageComponent;
  let fixture: ComponentFixture<TopicMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
