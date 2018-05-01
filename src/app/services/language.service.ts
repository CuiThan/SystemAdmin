import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';
import {LanguageSearchRequest} from '../models/language-search-request';
import { LanguageModel } from '../models/language-model';

@Injectable()
export class LanguageService {

  constructor(private httpClient: HttpClientService) { }

  async search(request:LanguageSearchRequest): Promise<any> {      
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathLanguageSearch, request);
    let result = response.json() as any;
    return result;
  }
  async languageSave(language: LanguageModel): Promise<any> {
    var request = language;
    let url = "";
    if (language.id != undefined && language.id != null && language.id != "") {
      url = ConfigSetting.UrlPathLanguageChange;
    }
    else {
      url = ConfigSetting.UrlPathLanguageAdd;
    }
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response.json() as any;
    return result;
  }
}
