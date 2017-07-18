import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysPermissionUpdateDialogComponent } from './sys-permission-update-dialog.component';

describe('SysPermissionUpdateDialogComponent', () => {
  let component: SysPermissionUpdateDialogComponent;
  let fixture: ComponentFixture<SysPermissionUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysPermissionUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysPermissionUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
