import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOrSmsVerifyDetailComponent } from './email-or-sms-verify-detail.component';

describe('EmailOrSmsVerifyDetailComponent', () => {
  let component: EmailOrSmsVerifyDetailComponent;
  let fixture: ComponentFixture<EmailOrSmsVerifyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailOrSmsVerifyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailOrSmsVerifyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
