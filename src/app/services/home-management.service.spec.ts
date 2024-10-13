import { TestBed } from '@angular/core/testing';

import { HomeManagementService } from './home-management.service';

describe('HomeManagementService', () => {
  let service: HomeManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
