import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';
import { CustomerSearchRequest } from '../models/customer-search-request'
import { CustomerAddOrChangeModel } from '../models/customer-add-or-change-model'

@Injectable()
export class CustomerService {

  constructor(private httpClient: HttpClientService) { }
  
    async search(request:CustomerSearchRequest): Promise<any> {      
      let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerSearch, request);
      let result = response.json() as any;
      return result;
    }
    async get(id:string): Promise<any> {      
      var request ={
        id
      };
      let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerGet, request);
      let result = response.json() as any;
      return result;
    }
    async save(customer:CustomerAddOrChangeModel): Promise<any> {      
      var request = customer;
      let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathCustomerAddOrChange, request);
      let result = response.json() as any;
      return result;
    }
}
