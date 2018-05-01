import { TestBed, inject } from '@angular/core/testing';

import { CheckPermissionService } from './check-permission.service';

describe('CheckPermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckPermissionService]
    });
  });

  it('should be created', inject([CheckPermissionService], (service: CheckPermissionService) => {
    expect(service).toBeTruthy();
  }));
});
