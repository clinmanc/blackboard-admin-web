import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationStatisticsComponent } from './user-location-statistics.component';

describe('UserLocationStatisticsComponent', () => {
  let component: UserLocationStatisticsComponent;
  let fixture: ComponentFixture<UserLocationStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLocationStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
