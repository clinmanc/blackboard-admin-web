import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomAssociatedComponent } from './classroom-associated.component';

describe('ClassroomAssociatedComponent', () => {
  let component: ClassroomAssociatedComponent;
  let fixture: ComponentFixture<ClassroomAssociatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomAssociatedComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomAssociatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
