import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysBatchComponent } from './sys-batch.component';

describe('SysBatchComponent', () => {
  let component: SysBatchComponent;
  let fixture: ComponentFixture<SysBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
