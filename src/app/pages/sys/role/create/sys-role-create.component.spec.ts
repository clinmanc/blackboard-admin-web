import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysRoleCreateDialogComponent } from './sys-role-create.component';

describe('SysRoleCreateDialogComponent', () => {
  let component: SysRoleCreateDialogComponent;
  let fixture: ComponentFixture<SysRoleCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysRoleCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysRoleCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
