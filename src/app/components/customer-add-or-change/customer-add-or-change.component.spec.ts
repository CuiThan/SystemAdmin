import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddOrChangeComponent } from './customer-add-or-change.component';

describe('CustomerAddOrChangeComponent', () => {
  let component: CustomerAddOrChangeComponent;
  let fixture: ComponentFixture<CustomerAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
