import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationthemeEditComponent } from './variationtheme-edit.component';

describe('VariationthemeEditComponent', () => {
  let component: VariationthemeEditComponent;
  let fixture: ComponentFixture<VariationthemeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationthemeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationthemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
