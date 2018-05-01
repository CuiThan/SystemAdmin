import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../models/customer-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../common/configSetting';

import { VerifyModel } from '../../models/verify-model';
import { EmailOrSmsService } from '../../services/email-or-sms.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-email-or-sms-verify-detail',
  templateUrl: './email-or-sms-verify-detail.component.html',
  styleUrls: ['./email-or-sms-verify-detail.component.css']
})
export class EmailOrSmsVerifyDetailComponent implements OnInit {

  verify: VerifyModel;
  constructor(
    private router: ActivatedRoute,
    private emailOrSmsService: EmailOrSmsService
  ) { }

  ngOnInit() {
    this.verify = new VerifyModel();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.onGet(param.get('id'));
    })
  }


  async onGet(id: string): Promise<void> {
    try {
      var response = await this.emailOrSmsService.getVerify(id);
      this.verify = response.verify;
      console.log(this.verify);
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
