import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterInfoCreateComponent } from './promoter-info-create.component';

describe('PromoterInfoCreateComponent', () => {
  let component: PromoterInfoCreateComponent;
  let fixture: ComponentFixture<PromoterInfoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoterInfoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterInfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
