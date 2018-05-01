import { TestBed, inject } from '@angular/core/testing';

import { ProductAttributeService } from './product-attribute.service';

describe('ProductAttributeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductAttributeService]
    });
  });

  it('should be created', inject([ProductAttributeService], (service: ProductAttributeService) => {
    expect(service).toBeTruthy();
  }));
});
