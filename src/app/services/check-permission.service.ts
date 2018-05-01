import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';

@Injectable()
export class CheckPermissionService implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (ConfigSetting.GetLoginStatus()) {
      return true;
    }
    else {
      ConfigSetting.Logout();
      let currentUrl = state.url;
      this.router.navigate([ConfigSetting.LoginPage, currentUrl]);
      //this.router.navigateByUrl(ConfigSetting.LoginPage);
      return false;
    }
  }
}
