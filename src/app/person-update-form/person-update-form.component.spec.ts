import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonUpdateFormComponent } from './person-update-form.component';

describe('PersonUpdateFormComponent', () => {
  let component: PersonUpdateFormComponent;
  let fixture: ComponentFixture<PersonUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
