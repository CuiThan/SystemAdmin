import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { MenuModel } from '../models/menu-manager-model';
@Injectable()
export class MenuService {

  constructor(private httpClient: HttpClientService) { }

  async gets(languageId: string, positionId: string): Promise<any> {
    const request = {
      languageId,
      positionId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuGets, request);
    const result = response.json() as any;
    return result;
  }

  async get(languageId: string, id: string, positionId: string): Promise<any> {
    const request = {
      id,
      languageId,
      positionId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuGet, request);
    const result = response.json() as any;
    return result;
  }

  async addOrChange(model: MenuModel): Promise<any> {
    const request = {
      menu: model
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuAddOrChange, request);
    const result = response.json() as any;
    return result;
  }

  async getBannersByMenuId(menuId: string): Promise<any> {
    const request = {
      menuId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuBannerMappingGet, request);
    const result = response.json() as any;
    return result;
  }

  async addBanner(menuId: string, bannerId: string): Promise<any> {
    const request = {
      menuId, bannerId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuBannerMappingAdd, request);
    const result = response.json() as any;
    return result;
  }

  async removeBanner(menuId: string, bannerId: string): Promise<any> {
    const request = {
      menuId, bannerId
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuBannerMappingRemove, request);
    const result = response.json() as any;
    return result;
  }

  async getMenuPositions(keyword: string, status: number): Promise<any> {
    const request = {
      keyword,
      status
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuPositionGets, request);
    const result = response.json() as any;
    return result;
  }

  async getMenuPosition(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuPositionGet, request);
    const result = response.json() as any;
    return result;
  }

  async addMenuPosition(name: string, status: number): Promise<any> {
    const request = {
      name, status
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuPositionAdd, request);
    const result = response.json() as any;
    return result;
  }

  async changeMenuPosition(id: string, name: string, status: number): Promise<any> {
    const request = {
      id, name, status
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuPositionChange, request);
    const result = response.json() as any;
    return result;
  }

  async removeMenuPosition(id: string): Promise<any> {
    const request = {
      id
    };
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMenuPositionRemove, request);
    const result = response.json() as any;
    return result;
  }


}
