import { Component, OnInit, Input } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { ShardingConfigModel, ShardingConfigsModel } from '../../models/sharding-config-model';
import { ShardingConfigService } from '../../services/sharding-config.service';
import { promise } from 'selenium-webdriver';
import { Jsonp } from '@angular/http/src/http';

@Component({
  selector: 'app-sharding-config-add-or-change',
  templateUrl: './sharding-config-add-or-change.component.html',
  styleUrls: ['./sharding-config-add-or-change.component.css']
})
export class ShardingConfigAddOrChangeComponent implements OnInit {
  model: ShardingConfigModel;
  constructor(
    private shardingConfigService: ShardingConfigService
  ) { }

  ngOnInit() {
    this.model = new ShardingConfigModel();
  }
  async onGet(): Promise<void> {
    try {
      var response = await this.shardingConfigService.get(this.model.id);
      this.model.types = response.types;
      this.model.shardGroups = response.shardGroups;
      this.model.statuses = response.statuses;

      this.model.type = response.shardingConfig.type;
      this.model.config = response.shardingConfig.config;
      this.model.createdDate = response.shardingConfig.createdDate;
      this.model.databaseName = response.shardingConfig.databaseName;
      this.model.hostName = response.shardingConfig.hostName;
      this.model.id = response.shardingConfig.id;
      this.model.pwd = response.shardingConfig.pwd;
      this.model.shardGroup = response.shardingConfig.shardGroup;
      this.model.status = response.shardingConfig.status;
      this.model.type = response.shardingConfig.type;
      this.model.uid = response.shardingConfig.uid;
      this.model.updatedDate = response.shardingConfig.updatedDate;
      switch (this.model.type) {
        case 5:
          try {
            if (response.shardingConfig.config != null && response.shardingConfig.config.length > 0) {
              var objConfig = JSON.parse(response.shardingConfig.config);
              this.model.yearTypeConfig = objConfig.Year;
            }
          } catch (error) {
            this.model.yearTypeConfig = 0;
          }

          break;

      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }
  async onAddOrChange(form): Promise<void> {
    console.log(form);
    debugger;
    try {
      if (form.valid) {
        let requestModel = this.model;
        switch (requestModel.type) {
          case 5:
            var objConfig = {
              Year: this.model.yearTypeConfig
            }
            requestModel.config = JSON.stringify(objConfig);
            break;
        }
        let response = this.shardingConfigService.addOrChange(requestModel);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onChangeStatus(event): Promise<void> {
    let value = parseInt(event.target.value);
    let currentStatus = 0;
    if (this.model.status == undefined) {
      this.model.status = 0;
    }
    currentStatus = parseInt(this.model.status.toString());
    if (event.target.checked) {
      if ((currentStatus & value) != value) {
        this.model.status += value;
      }
    }
    else {
      if ((currentStatus & value) == value) {
        this.model.status -= value;
      }
    }
  }

}
