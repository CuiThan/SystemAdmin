import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmaiOrSmsDetailComponent } from './emai-or-sms-detail.component';

describe('EmaiOrSmsDetailComponent', () => {
  let component: EmaiOrSmsDetailComponent;
  let fixture: ComponentFixture<EmaiOrSmsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmaiOrSmsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmaiOrSmsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
