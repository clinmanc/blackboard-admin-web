import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterInfoComponent } from './promoter-info.component';

describe('PromoterInfoComponent', () => {
  let component: PromoterInfoComponent;
  let fixture: ComponentFixture<PromoterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
