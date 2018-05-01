import { TestBed, inject } from '@angular/core/testing';

import { ManufacturerManagementService } from './manufacturer-management.service';

describe('ManufacturerManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManufacturerManagementService]
    });
  });

  it('should be created', inject([ManufacturerManagementService], (service: ManufacturerManagementService) => {
    expect(service).toBeTruthy();
  }));
});
