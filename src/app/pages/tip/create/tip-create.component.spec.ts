import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipCreateComponent } from './tip-create.component';

describe('TipCreateComponent', () => {
  let component: TipCreateComponent;
  let fixture: ComponentFixture<TipCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
