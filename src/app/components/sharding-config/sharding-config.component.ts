import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { ConfigSetting } from '../../common/configSetting';
import { ShardingConfigModel, ShardingConfigsModel } from '../../models/sharding-config-model';
import { ShardingConfigAddOrChangeComponent } from '../../components/sharding-config-add-or-change/sharding-config-add-or-change.component';
import { ShardingConfigService } from '../../services/sharding-config.service';
import { promise } from 'selenium-webdriver';
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-sharding-config',
  templateUrl: './sharding-config.component.html',
  styleUrls: ['./sharding-config.component.css']
})
export class ShardingConfigComponent implements OnInit {
  @ViewChild(ShardingConfigAddOrChangeComponent) shardingConfigAddOrChange: ShardingConfigAddOrChangeComponent;
  model: ShardingConfigsModel;
  constructor(
    private shardingConfigService: ShardingConfigService
  ) { }

  ngOnInit() {
    this.model = new ShardingConfigsModel();
    this.model.shardGroupSelected =0;
    this.onInit();
  }
  async onInit(): Promise<void> {
    try {
      let response = await this.shardingConfigService.init();
      this.model.shardGroups = response.shardGroups;
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }
  async onGets(): Promise<void> {
    try {
      let response = await this.shardingConfigService.gets(this.model.shardGroupSelected);      
      this.model.shardingConfigs = response.shardingConfigs;
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }
  async onShowAddOrChangeForm(id: number): Promise<void> {
    try {
      this.shardingConfigAddOrChange.model.id = id;
      this.shardingConfigAddOrChange.onGet();
      $('#sharding-config-add-or-change').modal('show');
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}
