import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursCalculatorComponent } from './hours-calculator.component';

describe('HoursCalculatorComponent', () => {
  let component: HoursCalculatorComponent;
  let fixture: ComponentFixture<HoursCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoursCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
