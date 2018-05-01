import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';
import { MeasureUnitModel } from '../models/measure-unit-model';
import { MeasureUnitSearchRequestModel } from '../models/measure-unit-search-request-model';

@Injectable()
export class MeasureUnitService {

  constructor(private httpClient: HttpClientService) { }

  async search(request: MeasureUnitSearchRequestModel): Promise<any> {
    const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathMeasureSearch, request);
    const result = response.json() as any;
    return result;
  }

  async save(measure: MeasureUnitModel): Promise<any> {
    const request = measure;
    let url = '';
    if (measure.unitId !== undefined && measure.unitId != null && measure.unitId !== '') {
      url = ConfigSetting.UrlPathMeasureChange;
    } else {
      url = ConfigSetting.UrlPathMeasureAdd;
    }
    const response = await this.httpClient.postJsonWithAuthen(url, request);
    const result = response.json() as any;
    return result;
  }
}
