import { Injectable } from '@angular/core';

import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';

import { ShardingConfigModel } from '../models/sharding-config-model';

@Injectable()
export class ShardingConfigService {

  constructor(private httpClient: HttpClientService) { }

  async init(): Promise<any> {
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathShardingInit,null);
    let result = response.json() as any;
    return result;
  }
  async get(id: Number): Promise<any> {
    let request = {
      id
    };
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathShardingGet, request);
    let result = response.json() as any;
    return result;
  }
  async gets(shardGroup: Number): Promise<any> {
    let request = {
      shardGroup
    };
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathShardingGets, request);
    let result = response.json() as any;
    return result;
  }
  async addOrChange(model: ShardingConfigModel): Promise<any> {
    let request = {
      shardingConfig: model
    };
    let response = await this.httpClient.postJson(ConfigSetting.UrlPathShardingAddOrChange, request);
    let result = response.json() as any;
    if (result.status) {
      ConfigSetting.ShowSuccess("Register success.");
    }
    else {
      ConfigSetting.ShowErrores(result.messages);
    }
    return result;
  }
}
