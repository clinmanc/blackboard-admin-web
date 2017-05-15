import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthRecordComponent } from './growth-record.component';

describe('GrowthRecordComponent', () => {
  let component: GrowthRecordComponent;
  let fixture: ComponentFixture<GrowthRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
