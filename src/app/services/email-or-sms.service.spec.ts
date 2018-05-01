import { TestBed, inject } from '@angular/core/testing';

import { EmailOrSmsService } from './email-or-sms.service';

describe('EmailOrSmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailOrSmsService]
    });
  });

  it('should be created', inject([EmailOrSmsService], (service: EmailOrSmsService) => {
    expect(service).toBeTruthy();
  }));
});
