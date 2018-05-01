import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ConfigSetting } from '../common/configSetting';
import { VariationThemeModel, Category_VariationTheme_AddRequest } from '../models/variation-theme-model';
import { VariationThemeSearchRequest } from '../models/variationtheme/VariationThemeSearchRequest';
import { VariationThemeEditModel, VariationThemeEditRequest } from '../models/variationtheme/VariationThemeEditModel';
@Injectable()
export class VariationThemeService {

  constructor(private httpClient: HttpClientService) { }

  async getMappingByVariationThemeId(variationThemeId: number): Promise<any> {
    const request = {
      Id: variationThemeId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetMappingByVariationThemeId, request);
    const result = response.json() as any;
    return result;
  }

  // danh sach thuoc tinh
  async variationThemeGetListAttribute(variationThemeId: number): Promise<any> {
    const request = {
      variationThemeId: variationThemeId
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathVariationThemeGetListAttribute, request);
    const result = response.json() as any;
    return result;
  }

  async search(request: VariationThemeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVariationThemeSearch, request);
    const result = response.json() as any;
    return result;
  }

  async getGetVariationTheme_Attribute(variationThemeId: number): Promise<any> {
    const request = {
      id: variationThemeId

    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathVariationThemeAttributeGet, request);
    const result = response.json() as any;
  }
  async getGetVariationTheme(): Promise<any> {
    const request = {
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathVariationThemeGet, request);
    const result = response.json() as any;
    return result;
  }



  async add(category_VariationTheme: Category_VariationTheme_AddRequest): Promise<any> {
    const request = {
      category_VariationTheme_Mapping: category_VariationTheme
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCategoryVariationThemeMappingAdd, request);
    const result = response.json() as any;
    return result;
  }

  async getsCategoryVariationTheme(categoryId: string): Promise<any> {
    const request = {
      categoryId: categoryId
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCategoryVariationThemeMappingGets, request);
    const result = response.json() as any;
    return result;
  }

  async remove(categoryId: string, variationThemeId: number): Promise<any> {
    const request = {
      categoryId: categoryId,
      variationThemeId: variationThemeId
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCategoryVariationThemeMappingRemove, request);
    const result = response.json() as any;
    return result;
  }
  async getById(variationThemeId: number, attributeId: number) {
    const request = {
      variationThemeId: variationThemeId,
      attributeId: attributeId
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathVariationThemeAttributeGetByID, request);
    const result = response.json() as any;
    return result;
  }
  async RemoveVariation(variationId: number, attributeId: number) {
    const request = {
      variationThemeId: variationId,
      attributeId: attributeId
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathVariationThemeRemove, request);
    const result = response.json() as any;
    return result;
  }
  async EditVariation(model: VariationThemeEditRequest) {
    const request = {
      variationTheme: model
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathVariationThemeEdit, request);
    const result = response.json() as any;
    return result;
  }

}
