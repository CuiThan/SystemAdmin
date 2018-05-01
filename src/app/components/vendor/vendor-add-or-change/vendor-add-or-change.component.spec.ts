import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAddOrChangeComponent } from './vendor-add-or-change.component';

describe('VendorAddOrChangeComponent', () => {
  let component: VendorAddOrChangeComponent;
  let fixture: ComponentFixture<VendorAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
