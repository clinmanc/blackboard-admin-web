import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssistComponent } from './user-assist.component';

describe('UserAssistComponent', () => {
  let component: UserAssistComponent;
  let fixture: ComponentFixture<UserAssistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAssistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
