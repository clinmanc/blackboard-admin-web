import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysRoleUpdateDialogComponent } from './sys-role-update-dialog.component';

describe('SysRoleUpdateDialogComponent', () => {
  let component: SysRoleUpdateDialogComponent;
  let fixture: ComponentFixture<SysRoleUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysRoleUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysRoleUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
