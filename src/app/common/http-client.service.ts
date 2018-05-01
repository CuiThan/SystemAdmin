import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

import { ConfigSetting } from './configSetting';

@Injectable()
export class HttpClientService {

  constructor(
    private http: Http,
    private router: Router,
  ) { }

  cantNotConnectObject = {
    json: function () {
      return {
        status: false,
        messages: ['Can\'t connect to server']
      };
    }
  };
  unauthorizedObject = {
    json: function () {
      return {
        status: false,
        messages: ['Unauthorized']
      };
    }
  };

  private extractData(res: Response) {
    // debugger
    // let body = res.json();
    // return body || {};
    return res || {};
  }

  private handleError(error: any): Promise<any> {
    let errObject;
    switch (error.status) {
      case 0:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: ['Can\'t connect to server']
              };
            }
          };
          ConfigSetting.ShowError('Can\'t connect to server');
        }
        break;
      case 401:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: ['Unauthorized'],
                responseStatus: error.status,
              };
            }
          };
          ConfigSetting.ShowError('Unauthorized');
        }
        break;
      default:
        {
          errObject = {
            json: function () {
              return {
                status: false,
                messages: error.status + ':' + error.statusText
              };
            }
          };
          ConfigSetting.ShowError(error.status + ':' + error.statusText);
        }
        break;
    }
    return Promise.resolve(errObject);
  }

  async postJson(absolutePath: string, obj): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const headers = ConfigSetting.Headers;

    try {
      let isError = false;
      const response = await this.http.post(url, obj, { headers: headers }).toPromise().then(this.extractData)
        .catch(err => {
          isError = true;
          return this.handleError(err);
        });
      if (isError) {
        const result = response.json() as any;        
      }
      return response || {};
    } catch (error) {
      ConfigSetting.ShowError('Can\'t connect to server');
    }
    return this.cantNotConnectObject;
  }
  async postJsonWithAuthen(absolutePath: string, obj): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const token: string = ConfigSetting.GetAuthenToken;
    const headers = ConfigSetting.Headers;
    headers.set('token', token);
    let isError = false;
    const response = await this.http.post(url, obj, { headers: headers }).toPromise().then(this.extractData)
      .catch(err => {
        isError = true;
        return this.handleError(err);
      });
    if (isError) {
      const result = response.json() as any;      
    }
    return response || {};
  }
  async postJsonWithAuthenAndHeaders(absolutePath: string, obj, headers): Promise<any> {
    const url: string = ConfigSetting.CreateUrl(absolutePath);
    const token: string = ConfigSetting.GetAuthenToken;
    headers.set('Authorization', `Bearer ${token}`);
    const response = await this.http.post(url, obj, { headers: headers }).toPromise().then(this.extractData)
      .catch(err => {
        return this.handleError(err);
      });
    return response || {};
  }
  async CheckLogin(): Promise<any> {
    const response = await this.postJsonWithAuthen(ConfigSetting.UrlPathCheckLogin, {});
    const result = response.json() as any;
    if (result.status) {
      ConfigSetting.ShowError('Permission deny.');
    } else {
      ConfigSetting.Logout();
      const currentUrl = this.router.url;
      this.router.navigate([ConfigSetting.LoginPage, currentUrl]);
    }

  }
}
