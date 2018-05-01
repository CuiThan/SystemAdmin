import { Injectable } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { HttpClientService } from '../../common/http-client.service';
import { ResultModel } from '../../models/result-model';
import { Dictionary } from '../../models/dictionary';

@Injectable()
export class TemplateDefineService {
    constructor(private httpClient: HttpClientService) { }

    async Gets(name: string, status: number, pageIndex: number): Promise<any> {
        const request = {
            name,
            status,
            pageIndex,
            pageSize: 30,
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlTemplateDefineGets, request);
        const result = response.json() as any;
        return result;
    }
    async Get(id: string): Promise<any> {
        const request = {
            id
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlTemplateDefineGet, request);
        const result = response.json() as any;
        return result;
    }
    async add(name: string,  status: number): Promise<any> {
        const request = {
            name,
            status
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlTemplateDefineAdd, request);
        const result = response.json() as any;
        return result;
    }
    async change(id: string, name: string, status: number): Promise<any> {
        const request = {
            id,
            name,
            status
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlTemplateDefineChange, request);
        const result = response.json() as any;
        return result;
    }
    async changeHtml(id: string, jsUrls: string, cssUrls: string, html: string): Promise<any> {
        const request = {
            id,
            jsUrls,
            cssUrls,
            html
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlTemplateDefineChangeHtml, request);
        const result = response.json() as any;
        return result;
    }
    async remove(id: string): Promise<any> {
        const request = {
            id
        };
        const response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlTemplateDefineRemove, request);
        const result = response.json() as any;
        return result;
    }
}
