import { TestBed, inject } from '@angular/core/testing';

import { VariationThemeService } from './variation-theme.service';

describe('VariationThemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VariationThemeService]
    });
  });

  it('should be created', inject([VariationThemeService], (service: VariationThemeService) => {
    expect(service).toBeTruthy();
  }));
});
