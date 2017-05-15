import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMessageCreateComponent } from './welcome-message-create.component';

describe('AnnouncementMessageCreateComponent', () => {
  let component: WelcomeMessageCreateComponent;
  let fixture: ComponentFixture<WelcomeMessageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeMessageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeMessageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
