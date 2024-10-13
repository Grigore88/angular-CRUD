import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInfoComponent } from './item-info.component';

describe('ItemInfoComponent', () => {
  let component: ItemInfoComponent;
  let fixture: ComponentFixture<ItemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
