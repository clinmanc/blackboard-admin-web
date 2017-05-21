import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysPermissionCreateComponent } from './sys-permission-create.component';

describe('SysPermissionCreateComponent', () => {
  let component: SysPermissionCreateComponent;
  let fixture: ComponentFixture<SysPermissionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysPermissionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysPermissionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
