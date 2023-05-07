import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUpdateFormComponent } from './company-update-form.component';

describe('CompanyUpdateFormComponent', () => {
  let component: CompanyUpdateFormComponent;
  let fixture: ComponentFixture<CompanyUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
