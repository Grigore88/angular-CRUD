import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementToolsPageComponent } from './management-tools-page.component';

describe('ManagementToolsPageComponent', () => {
  let component: ManagementToolsPageComponent;
  let fixture: ComponentFixture<ManagementToolsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementToolsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementToolsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
