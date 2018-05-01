import { TestBed, inject } from '@angular/core/testing';

import { ShardingConfigService } from './sharding-config.service';

describe('ShardingConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShardingConfigService]
    });
  });

  it('should be created', inject([ShardingConfigService], (service: ShardingConfigService) => {
    expect(service).toBeTruthy();
  }));
});
