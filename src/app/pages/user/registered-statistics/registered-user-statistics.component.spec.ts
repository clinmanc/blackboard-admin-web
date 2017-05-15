import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserStatisticsComponent } from './registered-user-statistics.component';

describe('RegisteredUserStatisticsComponent', () => {
  let component: RegisteredUserStatisticsComponent;
  let fixture: ComponentFixture<RegisteredUserStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredUserStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredUserStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
