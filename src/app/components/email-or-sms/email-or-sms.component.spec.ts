import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOrSmsComponent } from './email-or-sms.component';

describe('EmailOrSmsComponent', () => {
  let component: EmailOrSmsComponent;
  let fixture: ComponentFixture<EmailOrSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailOrSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailOrSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
