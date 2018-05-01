import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConfigSetting } from '../common/configSetting';

@Injectable()
export class LoginRedirectService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if (ConfigSetting.GetLoginStatus()) {
      this.router.navigateByUrl(ConfigSetting.HomePage);
      return false;
    }
    else {
      return true;
    }
  }
}