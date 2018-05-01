import { Injectable } from '@angular/core';
import { ManufacturerManagerModel, CategoryManufacturerGetsRequest, ManufacturerModel } from '../models/manufacturer-manager-model';
import { ManufacturerGetRequest } from '../models/manufacturer-management-model';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ManufacturerManagementService {

  constructor(private httpClient: HttpClientService) { }
  async getManufacturers(request: ManufacturerGetRequest): Promise<any> { 

    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTestSearch, request);
    let result = response.json() as any;
    return result;
  }  

  async getManufacturerById(id: string): Promise<any>{
    let request = new ManufacturerGetRequest();
    request.id = id;
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathTestSearchById, request)
    let result= response.json() as any;
    return result;
  }

  async save(request: ManufacturerGetRequest): Promise<any>{        
    let url = ConfigSetting.UrlPathManufacturerManagementAddOrChange;   
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response.json() as any;
    return result;
  }
}
