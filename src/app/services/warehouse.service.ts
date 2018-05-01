import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { WarehouseSearchRequest } from '../models/warehouse/warehouse-search-request';
import { WarehouseAddOrChangeModel } from '../models/warehouse/warehouse-add-or-change-model';

@Injectable()
export class WarehouseService {

  constructor(private httpClient: HttpClientService) { }

  async getWarehouses(request: WarehouseSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetWarehouses, request);
    const result = response.json() as any;
    return result;
  }

  async search(request: WarehouseSearchRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseSearch, request);
    const result = response.json() as any;
    return result;
  }

  async get(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseGet, request);
    const result = response.json() as any;
    return result;
  }


  async change(warehouse: WarehouseAddOrChangeModel): Promise<any> {
    let request = {
       warehouse
    }

    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseChange, request);
    const result = response.json() as any;
    return result;
  }

  async add(warehouse: WarehouseAddOrChangeModel): Promise<any> {
    let request = {
       warehouse
    }

    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseAdd, request);
    const result = response.json() as any;
    return result;
  }

  async remove(id:string): Promise<any> {
    let request = {
      id:id
    }
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWarehouseRemove, request);
    const result = response.json() as any;
    return result;
  }


}
