import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AccountService } from '../../services/account.service';
import { ConfigSetting } from '../../common/configSetting';

import { RegisterModel } from '../../models/register-model';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.model = new RegisterModel();
  }
  async onRegister(registerForm): Promise<void> {
    try {
      if (registerForm.valid) {
        var response = await this.accountService.register(
          this.model.fullName,
          this.model.email,
          this.model.password,
          this.model.confirmPassword
        );
        if (response.status) {
          this.router.navigateByUrl(ConfigSetting.LoginPage);
        }
        else {
          this.model.message = response.messages.join();
        }
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }
}
