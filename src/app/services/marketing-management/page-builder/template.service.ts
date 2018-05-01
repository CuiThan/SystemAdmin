import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting'
import { HttpClientService } from '../../../common/http-client.service';
import { TemplateSearchRequest } from '../../../models/marketing-management/page-builder/template/template-search-request'
import { Template } from '../../../models/marketing-management/page-builder/template/template';
import { TemplateConfigSearchRequest } from '../../../models/marketing-management/page-builder/template-config/template-config-search-request'
import { TemplateConfig } from '../../../models/marketing-management/page-builder/template-config/template-config';

@Injectable()
export class TemplateService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: TemplateSearchRequest): Promise<any> {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTemplateSearch, request);
    let result = response.json() as any;
    return result;
  }
  async getById(id: string): Promise<any> {
    var request = {
      id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTemplateGet, request);
    let result = response.json() as any;
    return result;
  }
  async saveTemplate(template: Template): Promise<any> {
    var request = template;
    let url = "";
    if (request.id != null && request.id != undefined && request.id.length > 0) {
      url = ConfigSetting.UrlPathTemplateChange;
    }
    else {
      url = ConfigSetting.UrlPathTemplateAdd;
    }
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response.json() as any;
    return result;
  }
  async removeTemplate(id: string): Promise<any> {
    var request = {
      id: id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTemplateRemove, request);
    let result = response.json() as any;
    return result;
  }
  async searchTemplateConfig(request: TemplateConfigSearchRequest): Promise<any> {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTemplateConfigSearch, request);
    let result = response.json() as any;
    return result;
  }
  async getTemplateConfigById(id: string, templateId: string): Promise<any> {
    var request = {
      id,
      templateId
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTemplateConfigGet, request);
    let result = response.json() as any;
    return result;
  }
  async saveTemplateConfig(template: TemplateConfig): Promise<any> {
    var request = template;
    let url = "";
    if (request.id != null && request.id != undefined && request.id.length > 0) {
      url = ConfigSetting.UrlPathTemplateConfigChange;
    }
    else {
      url = ConfigSetting.UrlPathTemplateConfigAdd;
    }
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response.json() as any;
    return result;
  }
  async checkTemplatePositionCodeExist(templateId: string, code: string,currentTemplateConfigId:string): Promise<any> {
    var request = {
      templateId: templateId,
      code: code,
      currentTemplateConfigId:currentTemplateConfigId
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTemplateConfigCheckCodeExist, request);
    let result = response.json() as any;
    return result;
  }
  async removeTemplateConfig(id: string,templateId:string): Promise<any> {
    var request = {
      id: id,
      templateId:templateId
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTemplateConfigRemove, request);
    let result = response.json() as any;
    return result;
  }
}
