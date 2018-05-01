import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseAddOrChangeComponent } from './warehouse-add-or-change.component';

describe('WarehouseAddOrChangeComponent', () => {
  let component: WarehouseAddOrChangeComponent;
  let fixture: ComponentFixture<WarehouseAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
