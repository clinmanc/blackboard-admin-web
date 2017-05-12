import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListDialogComponent } from './item-list-dialog.component';

describe('ItemListDialogComponent', () => {
  let component: ItemListDialogComponent;
  let fixture: ComponentFixture<ItemListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
