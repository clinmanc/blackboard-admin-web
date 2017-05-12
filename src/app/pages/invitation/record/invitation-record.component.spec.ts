import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationRecordComponent } from './invitation-record.component';

describe('InvitationRecordComponent', () => {
  let component: InvitationRecordComponent;
  let fixture: ComponentFixture<InvitationRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
