import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerAddOrChangeComponent } from './manufacturer-add-or-change.component';

describe('ManufacturerAddOrChangeComponent', () => {
  let component: ManufacturerAddOrChangeComponent;
  let fixture: ComponentFixture<ManufacturerAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
