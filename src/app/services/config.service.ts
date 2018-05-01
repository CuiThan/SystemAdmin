import { ConfigAddOrUpdateRequest } from './../models/config-add-or-update-request-model';
import { ConfigRequest } from './../models/config-request-model';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ConfigSetting } from '../common/configSetting';

@Injectable()
export class ConfigService {

  constructor(private httpClient: HttpClientService) { }

  async Index(request: ConfigRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigSearch, request);
    const result = response.json() as any;
    return result;
  }

  async GetConfigByKey(request: ConfigRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigGetByKey, request);
    const result = response.json() as any;
    return result;
  }

  async Add(request: ConfigAddOrUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigAdd, request);
    const result = response.json() as any;
    return result;
  }

  async Update(request: ConfigAddOrUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async Delete(request: ConfigRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathConfigDelete, request);
    const result = response.json() as any;
    return result;
  }
}
