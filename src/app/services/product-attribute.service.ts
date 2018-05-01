import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { ProductAttributeSearchRequest } from '../models/product-attribute-search-request';
import { ProductAttributeCrudRequest } from '../models/product-attribute-add-or-update';
import { ProductAttributeValueSearchRequest } from '../models/product-attribute-value-search-request';
import { ProductAttributeValueCrudRequest } from '../models/product-attribute-value-add-or-update';

@Injectable()
export class ProductAttributeService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: ProductAttributeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAttributeSearch, request);
    const result = response.json() as any;
    return result;
  }
  async gets(categoryId: string): Promise<any> {
    const request = {
      categoryId: categoryId
    };
    const response = await this.httpClient.postJson(ConfigSetting.UrlPathCProductAttributeGets, request);
    const result = response.json() as any;
    return result;
  }
  async get(request: ProductAttributeSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAttributeGet, request);
    const result = response.json() as any;
    return result;
  }
  async save(request: ProductAttributeCrudRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAttributeAddOrUpdate, request);
    const result = response.json() as any;
    return result;
  }
  async delete(request: ProductAttributeCrudRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAttributeDelete, request);
    const result = response.json() as any;
    return result;
  }
  async searchProductAttributeValue(request: ProductAttributeValueSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAttributeValueSearch, request);
    const result = response.json() as any;
    return result;
  }
  async getProductAttributeValue(request: ProductAttributeValueSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAttributeValueGet, request);
    const result = response.json() as any;
    return result;
  }
  async saveProductAttributeValue(request: ProductAttributeValueCrudRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAttributeValueAddOrUpdate, request);
    const result = response.json() as any;
    return result;
  }
  async deleteProductAttributeValue(request: ProductAttributeValueCrudRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProductAttributeValueDelete, request);
    const result = response.json() as any;
    return result;
  }
}
