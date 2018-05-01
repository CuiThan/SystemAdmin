import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRowComponent } from './template-row.component';

describe('TemplateRowComponent', () => {
  let component: TemplateRowComponent;
  let fixture: ComponentFixture<TemplateRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
