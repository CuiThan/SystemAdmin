import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationthemeManagerComponent } from './variationtheme-manager.component';

describe('VariationthemeManagerComponent', () => {
  let component: VariationthemeManagerComponent;
  let fixture: ComponentFixture<VariationthemeManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationthemeManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationthemeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
