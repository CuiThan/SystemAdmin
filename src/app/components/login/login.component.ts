import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { AccountService } from '../../services/account.service';
import { ConfigSetting } from '../../common/configSetting';

import { LoginModel } from '../../models/login-model';
import { promise } from 'selenium-webdriver';
declare var App: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel;
  returnUrl: string;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute,
  ) {
    this.returnUrl = "";
    this.route.params.subscribe(params => {
      this.returnUrl = params.returnUrl;
    });
  }

  ngOnInit() {
    this.model = new LoginModel();
    this.model.email = "cuph@viettelpost.com.vn";
    this.model.password = "123456a@";
  }

  async onInit(): Promise<void> {
    try {

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
  }

  async onLogin(loginForm): Promise<void> {
    App.blockUI();;
    try {
      if (loginForm.valid) {        
        let response = await this.accountService.login(this.model.email, this.model.password, this.model.remember);        
        if (response.status) {
          if (this.returnUrl == "" || this.returnUrl == undefined) {
            this.router.navigateByUrl(ConfigSetting.HomePage);
          }
          else {
            this.router.navigateByUrl(this.returnUrl);
          }

        }
      }

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    App.unblockUI();
  }

}
