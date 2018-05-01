import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardingConfigAddOrChangeComponent } from './sharding-config-add-or-change.component';

describe('ShardingConfigAddOrChangeComponent', () => {
  let component: ShardingConfigAddOrChangeComponent;
  let fixture: ComponentFixture<ShardingConfigAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShardingConfigAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShardingConfigAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
