import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysRoleCreateComponent } from './sys-role-create.component';

describe('SysRoleCreateComponent', () => {
  let component: SysRoleCreateComponent;
  let fixture: ComponentFixture<SysRoleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysRoleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysRoleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
