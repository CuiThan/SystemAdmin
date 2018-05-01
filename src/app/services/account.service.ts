import { Injectable } from '@angular/core';

import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';

import { ResultModel } from '../models/result-model';
import { Dictionary } from '../models/dictionary';

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClientService) { }

  async login(email: string, password: string, remember: boolean): Promise<any> {    
    let request = {
      "email" : email,
      "password" : password,
      "remember" : remember
    }
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathLogin, request);
    debugger;
    let result = response.json() as any;
    if (result.status) {
      let actionIds = new Dictionary<boolean>();
            
      ConfigSetting.SetLoginStatus(result.tokenKey, result.isAdministrator, actionIds);
      ConfigSetting.ShowSuccess('Login success.');
    }
    else {
      ConfigSetting.ShowErrores(result.messages);
    }
    return result;
  }
  async register(fullName: string, email: string, password: string, confirmPassword: string): Promise<any> {
    const request = {
      fullName,
      email,
      password,
      confirmPassword
    }
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathRegister, request);
    const result = response.json() as any;
    if (result.status) {
      ConfigSetting.SetLoginStatus(result.TokenKey, null, null);
      ConfigSetting.ShowSuccess('Register success.');
    }
    else {
      ConfigSetting.ShowErrores(result.messages);
    }
    return result;
  }
}
