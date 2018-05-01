import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAttrAddOrChangeComponent } from './category-attr-add-or-change.component';

describe('CategoryAttrAddOrChangeComponent', () => {
  let component: CategoryAttrAddOrChangeComponent;
  let fixture: ComponentFixture<CategoryAttrAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAttrAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAttrAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
