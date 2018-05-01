import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ConfigSetting } from '../common/configSetting';
import { CategoryModel, CategoryAttrModel, CategoryAttrRequest, AttrCategoryAddRequest, AttrCategoryChangeRequest, CategoryManufacturerRequest } from '../models/category-manager-model';


@Injectable()
export class CategoryService {

  constructor(private httpClient: HttpClientService) { }

  async gets(languageId: string): Promise<any> {
    const request = {
      languageId
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCategoryGets, request);
    const result = response.json() as any;
    return result;
  }

  async get(languageId: string, id: string): Promise<any> {
    const request = {
      id,
      languageId
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCategoryGet, request);
    const result = response.json() as any;
    return result;
  }

  async addOrChange(model: CategoryModel): Promise<any> {
    const request = {
      category: model
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCategoryAddOrChange, request);
    const result = response.json() as any;
    if (result.status) {
      ConfigSetting.ShowSuccess('Register success.');
    }    else {
      ConfigSetting.ShowErrores(result.messages);
    }
    return result;
  }

  async getCategoryAttr(model: CategoryAttrRequest): Promise<any> {

    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCategoryAttrGets, model);
    const result = response.json() as any;
    return result;
  }

  async addCategoryAttr(model: AttrCategoryAddRequest): Promise<any> {
    const request = {
      AttrCategory: model
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathAttrCategoryAdd, request);
    const result = response.json() as any;
    return result;
  }

  async changeCategoryAttr(model: AttrCategoryChangeRequest): Promise<any> {
    const request = {
      AttrCategory: model
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathAttrCategoryChange, request);
    const result = response.json() as any;
    return result;
  }

  async getCategoryManufacturer(model: CategoryManufacturerRequest): Promise<any> {

    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCategoryManufacturerGets, model);
    const result = response.json() as any;
    return result;
  }



}
