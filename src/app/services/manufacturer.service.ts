import { Injectable } from '@angular/core';
import { HttpClientService } from '../common/http-client.service';
import { ConfigSetting } from '../common/configSetting'
import { } from '../models/category-manager-model';

@Injectable()
export class ManufacturerService {

  constructor(private httpClient: HttpClientService) { }

  async removeManufacturer(manufacturerId:number,categoryId:string): Promise<any> {
    let request = {
      manufacturerId:manufacturerId,
      categoryId : categoryId
    };
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathManufacturerRemove, request);
    let result = response.json() as any;
    return result;
  }

  async getsManufacturer(categoryId:string): Promise<any> {
    let request = {
      categoryId : categoryId
    };
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathManufacturerGets, request);
    let result = response.json() as any;
    return result;
  }

  async addManufacturer(categoryId:string,manufacturerId:string): Promise<any> {
    let request = {
      categoryId : categoryId,
      manufacturerId:manufacturerId
    };
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathManufacturerAdd, request);
    let result = response.json() as any;
    return result;
  }


}
