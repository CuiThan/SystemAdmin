import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateConfigComponent } from './template-config.component';

describe('TemplateConfigComponent', () => {
  let component: TemplateConfigComponent;
  let fixture: ComponentFixture<TemplateConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
