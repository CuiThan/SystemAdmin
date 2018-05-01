import { TestBed, inject } from '@angular/core/testing';

import { AttributeCategoryMappingService } from './attribute-category-mapping.service';

describe('AttributeCategoryMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttributeCategoryMappingService]
    });
  });

  it('should be created', inject([AttributeCategoryMappingService], (service: AttributeCategoryMappingService) => {
    expect(service).toBeTruthy();
  }));
});
