import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerDetectionComponent } from './server-detection.component';

describe('ServerDetectionComponent', () => {
  let component: ServerDetectionComponent;
  let fixture: ComponentFixture<ServerDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
