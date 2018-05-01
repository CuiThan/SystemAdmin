import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardingConfigComponent } from './sharding-config.component';

describe('ShardingConfigComponent', () => {
  let component: ShardingConfigComponent;
  let fixture: ComponentFixture<ShardingConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShardingConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShardingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
