import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentLogCreateComponent } from './development-log-create.component';

describe('DevelopmentLogCreateComponent', () => {
  let component: DevelopmentLogCreateComponent;
  let fixture: ComponentFixture<DevelopmentLogCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopmentLogCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentLogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
