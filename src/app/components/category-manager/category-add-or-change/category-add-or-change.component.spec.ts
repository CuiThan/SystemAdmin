import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddOrChangeComponent } from './category-add-or-change.component';

describe('CategoryAddOrChangeComponent', () => {
  let component: CategoryAddOrChangeComponent;
  let fixture: ComponentFixture<CategoryAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
