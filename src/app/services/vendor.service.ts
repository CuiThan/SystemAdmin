import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';
import { VendorSearchRequest } from '../models/vendor-model/vendor-search-request'
import { VendorAddOrChangeModel } from '../models/vendor-model/vendor-add-or-change-model'

@Injectable()
export class VendorService {

  constructor(private httpClient: HttpClientService) { }
  async search(request:VendorSearchRequest): Promise<any> {      
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVendorSearch, request);
    let result = response.json() as any;
    return result;
  }
  async get(id:string): Promise<any> {      
    var request ={
      id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathVendorGet, request);
    let result = response.json() as any;
    return result;
  }
  async save(vendor:VendorAddOrChangeModel): Promise<any> { 
    var request = vendor;
    let url = "";
    if (vendor.id != undefined && vendor.id != null && vendor.id != "") {
      url = ConfigSetting.UrlPathVendorChange;
    }
    else {
      url = ConfigSetting.UrlPathVendorAdd;
    }
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response.json() as any;
    return result;
  }
}
