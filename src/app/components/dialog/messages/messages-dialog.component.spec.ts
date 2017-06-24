import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDialogComponent } from './messages-dialog.component';

describe('MessagesDialogComponent', () => {
  let component: MessagesDialogComponent;
  let fixture: ComponentFixture<MessagesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
