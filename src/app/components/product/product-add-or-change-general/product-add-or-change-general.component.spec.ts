import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddOrChangeGeneralComponent } from './product-add-or-change-general.component';

describe('ProductAddOrChangeGeneralComponent', () => {
  let component: ProductAddOrChangeGeneralComponent;
  let fixture: ComponentFixture<ProductAddOrChangeGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAddOrChangeGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddOrChangeGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
