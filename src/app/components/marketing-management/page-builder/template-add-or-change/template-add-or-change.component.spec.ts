import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddOrChangeComponent } from './template-add-or-change.component';

describe('TemplateAddOrChangeComponent', () => {
  let component: TemplateAddOrChangeComponent;
  let fixture: ComponentFixture<TemplateAddOrChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateAddOrChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddOrChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
