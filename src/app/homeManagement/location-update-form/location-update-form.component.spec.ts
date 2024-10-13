import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationUpdateFormComponent } from './location-update-form.component';

describe('LocationUpdateFormComponent', () => {
  let component: LocationUpdateFormComponent;
  let fixture: ComponentFixture<LocationUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
