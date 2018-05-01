import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import {LocationRequest} from '../models/location-request-model';
import { LocationUpdateRequest, LocationAddRequest, StreetAddOrUpdate } from '../models/location-add-or-update-model';

@Injectable()
export class LocationService {

  constructor(private httpClient: HttpClientService) { }

  async Index(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathLocation, request);
    const result = response.json() as any;
    return result;
  }

  async DistrictGetByProvinceId(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetDictrictByProvinceId, request);
    const result = response.json() as any;
    return result;
  }

  async GetWardByDistrictId(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetWardByDictrictId, request);
    const result = response.json() as any;
    return result;
  }

  async GetStreetByWardId(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetStreetByWardId, request);
    const result = response.json() as any;
    return result;
  }

  async GetProvinceById(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetProvinceById, request);
    const result = response.json() as any;
    return result;
  }

  async GetDistrictById(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetDistrictById, request);
    const result = response.json() as any;
    return result;
  }

  async GetWardById(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetWardById, request);
    const result = response.json() as any;
    return result;
  }

  async GetStreetById(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathGetStreetById, request);
    const result = response.json() as any;
    return result;
  }

  async AddOrUpdateProvince(request: LocationUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathProvinceAddOrUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async DistrictAdd(request: LocationAddRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathDistrictAdd, request);
    const result = response.json() as any;
    return result;
  }

  async DistrictUpdate(request: LocationUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathDistrictUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async WardAdd(request: LocationAddRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWardAdd, request);
    const result = response.json() as any;
    return result;
  }

  async WardUpdate(request: LocationUpdateRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWardUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async UpdateStreet(request: StreetAddOrUpdate): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathStreetUpdate, request);
    const result = response.json() as any;
    return result;
  }

  async StreetAdd(request: StreetAddOrUpdate): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathStreetAdd, request);
    const result = response.json() as any;
    return result;
  }

  async StreetSearch(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathStreetSearch, request);
    const result = response.json() as any;
    return result;
  }

  async StreetAddByWardId(request: LocationAddRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathStreetAddByWardId, request);
    const result = response.json() as any;
    return result;
  }

  async Delete(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathLocationDelete, request);
    const result = response.json() as any;
    return result;
  }

  async WardStreetDelete(request: LocationRequest): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathWardStreetDelete, request);
    const result = response.json() as any;
    return result;
  }
}
