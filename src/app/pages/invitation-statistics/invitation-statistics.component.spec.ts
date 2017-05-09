import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationStatisticsComponent } from './invitation-statistics.component';

describe('InvitationStatisticsComponent', () => {
  let component: InvitationStatisticsComponent;
  let fixture: ComponentFixture<InvitationStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
