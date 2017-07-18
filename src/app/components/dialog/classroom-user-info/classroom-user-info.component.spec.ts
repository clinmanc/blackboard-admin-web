import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomUserInfoComponent } from './classroom-user-info.component';

describe('ClassroomUserInfoComponent', () => {
  let component: ClassroomUserInfoComponent;
  let fixture: ComponentFixture<ClassroomUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
