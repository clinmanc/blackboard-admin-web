import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysPermissionCreateDialogComponent } from './sys-permission-create-dialog.component';

describe('SysPermissionCreateDialogComponent', () => {
  let component: SysPermissionCreateDialogComponent;
  let fixture: ComponentFixture<SysPermissionCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysPermissionCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysPermissionCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
