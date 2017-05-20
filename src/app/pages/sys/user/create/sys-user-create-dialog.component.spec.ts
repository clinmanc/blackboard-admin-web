import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysUserCreateDialogComponent } from './sys-user-create-dialog.component';

describe('SysUserCreateDialogComponent', () => {
  let component: SysUserCreateDialogComponent;
  let fixture: ComponentFixture<SysUserCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysUserCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysUserCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
