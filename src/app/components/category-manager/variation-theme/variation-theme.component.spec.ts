import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationThemeComponent } from './variation-theme.component';

describe('VariationThemeComponent', () => {
  let component: VariationThemeComponent;
  let fixture: ComponentFixture<VariationThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariationThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
