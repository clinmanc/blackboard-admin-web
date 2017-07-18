import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysUserUpdateDialogComponent } from './sys-user-update-dialog.component';

describe('SysUserUpdateDialogComponent', () => {
  let component: SysUserUpdateDialogComponent;
  let fixture: ComponentFixture<SysUserUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysUserUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysUserUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
