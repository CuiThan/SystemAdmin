import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';
import { EmailOrSmsSearchRequestModel } from '../models/email-or-sms-search-request-model';

@Injectable()
export class EmailOrSmsService {

  constructor(private httpClient: HttpClientService) { }

  async search(request:EmailOrSmsSearchRequestModel) : Promise<any>
  {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathEmailOrSmsSearch, request);
    let result = response.json() as any;
    return result;
  }

  async get(id: string): Promise<any>
  {
    var request ={id};
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathEmailOrSmsGetDetail, request);
    let result = response.json() as any;
    return result;
  }

  async getVerify(id: string): Promise<any>
  {
    var request ={id};
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathEmailOrSmsGetVerifyDetail, request);
    let result = response.json() as any;
    return result;
  }
}
