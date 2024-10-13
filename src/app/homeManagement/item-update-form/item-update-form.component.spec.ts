import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUpdateFormComponent } from './item-update-form.component';

describe('ItemUpdateFormComponent', () => {
  let component: ItemUpdateFormComponent;
  let fixture: ComponentFixture<ItemUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
