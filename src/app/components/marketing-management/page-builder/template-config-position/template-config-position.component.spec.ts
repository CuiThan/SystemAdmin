import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateConfigPositionComponent } from './template-config-position.component';

describe('TemplateConfigPositionComponent', () => {
  let component: TemplateConfigPositionComponent;
  let fixture: ComponentFixture<TemplateConfigPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateConfigPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateConfigPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
