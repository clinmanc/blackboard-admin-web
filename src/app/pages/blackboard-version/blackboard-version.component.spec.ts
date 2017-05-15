import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackboardVersionComponent } from './blackboard-version.component';

describe('BlackboardVersionComponent', () => {
  let component: BlackboardVersionComponent;
  let fixture: ComponentFixture<BlackboardVersionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackboardVersionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackboardVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
