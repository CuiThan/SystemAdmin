import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customer-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../common/configSetting';

import { EmailOrSmsService } from '../../services/email-or-sms.service';
import { EmailOrSmsModel } from '../../models/email-or-sms-model';
import { promise } from 'protractor';

@Component({
  selector: 'app-emai-or-sms-detail',
  templateUrl: './emai-or-sms-detail.component.html',
  styleUrls: ['./emai-or-sms-detail.component.css']
})
export class EmaiOrSmsDetailComponent implements OnInit {

  emailSms: EmailOrSmsModel;
  constructor(
    private router: ActivatedRoute,
    private emailOrSmsService: EmailOrSmsService
  ) { }

  ngOnInit() {
    this.emailSms = new EmailOrSmsModel();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.onGet(param.get('id'));
    })
  }

  async onGet(id: string): Promise<void> {
    try {
      var response = await this.emailOrSmsService.get(id);
      this.emailSms = response.emailSms;
      console.log(this.emailSms);
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}
