import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ConfigSetting } from '../common/configSetting';
import { AttrCategoryAddRequest, AttrCategoryChangeRequest } from '../models/category-manager-model';
@Injectable()
export class AttributeCategoryMappingService {
  constructor(private httpClient: HttpClientService) { }

  async getAttrCategory(attrId: number, categoryId: string): Promise<any> {
    const request = {
      AttributeId : attrId,
       CategoryId : categoryId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAttrCategoryGet, request);
    const result = response.json() as any;
    return result;
  }

  async getAttributeCategoryByCategoryId(categoryId: string): Promise<any> {
    const request = {
      CategoryId: categoryId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAttributeCategoryByCategoryId, request);
    const result = response.json() as any;
    return result;
  }

  async changeAttrCategory(model: AttrCategoryChangeRequest): Promise<any> {
    const request = {
      AttrCategory: model
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAttrCategoryChange, request);
    const result = response.json() as any;
    return result;
  }

  async removeCategoryAttr(attributeId: number, categoryId: string): Promise<any> {
    const request = {
      AttributeId: attributeId,
      CategoryId: categoryId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathAttrCategoryRemove, request);
    const result = response.json() as any;
    return result;
  }
}
