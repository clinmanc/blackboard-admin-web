import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthTagCreateComponent } from './growth-tag-create.component';

describe('GrowthTagCreateComponent', () => {
  let component: GrowthTagCreateComponent;
  let fixture: ComponentFixture<GrowthTagCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthTagCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthTagCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
