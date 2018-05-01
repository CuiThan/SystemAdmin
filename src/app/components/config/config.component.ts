import { ConfigRequest } from './../../models/config-request-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { ConfigAddOrUpdateRequest } from './../../models/config-add-or-update-request-model';
import { Dictionary } from '../../models/dictionary';
import { ConfigSetting } from '../../common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  @ViewChild('configForm') form1: any;
  searchParams: ConfigRequest;
  configs: ConfigAddOrUpdateRequest[];
  rowEdits: Dictionary<boolean>;
  row: Dictionary<boolean>;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  showAddNew = false;
  configAddNew: ConfigAddOrUpdateRequest;
  configEdit: ConfigAddOrUpdateRequest;

  constructor(
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.searchParams = new ConfigRequest();
    this.rowEdits = new Dictionary<boolean>();
    this.configAddNew = new ConfigAddOrUpdateRequest();
    this.configEdit = new ConfigAddOrUpdateRequest();
    this.onSearch();
  }

  async onSearch(): Promise<void> {
    try {
      const response = await this.configService.Index(this.searchParams);
      this.configs = response.configs as ConfigAddOrUpdateRequest[];
      this.totalRow = response.totalRow;
      this.rowEdits = new Dictionary<boolean>();
      this.row = new Dictionary<boolean>();
      for (let i = 0; i < this.configs.length; i++) {
        const config = this.configs[i];
        this.rowEdits.Add(config.keyOld, false);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onAddNew(): Promise<void> {
    try {
      this.showAddNew = !this.showAddNew;
      this.configAddNew = new ConfigAddOrUpdateRequest();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onAddNewCancel(): Promise<void> {
    try {
      this.showAddNew = false;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onSaveAdd(): Promise<void> {
    App.blockUI();
    if (this.form1.valid) {
      try {
        const response = await this.configService.Add(this.configAddNew);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          await this.onSearch();
          await this.onAddNewCancel();
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      } catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
    App.unblockUI();
  }

  async onChange(key: string): Promise<void> {
    this.onAddNewCancel();
    for (let i = 0; i < this.configs.length; i++) {
      if (this.rowEdits.Item(this.configs[i].keyOld)) {
        this.onChangeCancel(this.configs[i].keyOld);
      }
    }
    const config = this.configs.find(x => x.keyOld === key);
    this.configEdit = JSON.parse(JSON.stringify(config));
    const state = this.rowEdits.Item(key);
    this.rowEdits.Change(key, !state);
  }

  async onChangeCancel(key: string): Promise<void> {
    this.rowEdits.Change(key, false);
    const index = this.configs.findIndex(x => x.keyOld === key);
    this.configs[index] = this.configEdit;
  }

  async onSaveUpdate(key: string): Promise<void> {
    //App.blockUI();
    if (this.form1.valid) {
      try {
        let config: ConfigAddOrUpdateRequest = null;
        for (let i = 0; i <= this.configs.length; i++) {
          if (this.configs[i].keyOld === key) {
            config = this.configs[i];
            break;
          }
        }
        const response = await this.configService.Update(config);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          await this.onSearch();
          await this.rowEdits.Change(config.keyNew, false);
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      } catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
    //App.unblockUI();
  }

}
