import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateConfigAddOrChangeComponent } from './template-config-add-or-change.component';

describe('TemplateConfigAddOrChangeComponent', () => {
  let component: TemplateConfigAddOrChangeComponent;
  let fixture: ComponentFixture<TemplateConfigAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateConfigAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateConfigAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
