import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceUpdateFormComponent } from './place-update-form.component';

describe('PlaceUpdateFormComponent', () => {
  let component: PlaceUpdateFormComponent;
  let fixture: ComponentFixture<PlaceUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
