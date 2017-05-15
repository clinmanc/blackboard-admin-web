import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementMessageCreateComponent } from './announcement-message-create.component';

describe('AnnouncementMessageCreateComponent', () => {
  let component: AnnouncementMessageCreateComponent;
  let fixture: ComponentFixture<AnnouncementMessageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementMessageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementMessageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
