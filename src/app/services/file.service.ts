import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigSetting } from '../common/configSetting';
import { HttpClientService } from '../common/http-client.service';

@Injectable()
export class FileService {

  constructor(private httpClient: HttpClientService) { }

  async upload(file: any): Promise<any> {
    const headers = new Headers({});
    const response = await this.httpClient.postJsonWithAuthenAndHeaders(ConfigSetting.UrlPathFileUpload, file, headers);
    const result = response.json() as any;
    return result;
  }
}
