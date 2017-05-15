import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementMessageComponent } from './announcement-message.component';

describe('AnnouncementMessageComponent', () => {
  let component: AnnouncementMessageComponent;
  let fixture: ComponentFixture<AnnouncementMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
