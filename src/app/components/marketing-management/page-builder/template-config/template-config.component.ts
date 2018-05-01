import { Component, OnInit, ViewChild } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { TemplateService } from '../../../../services/marketing-management/page-builder/template.service';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../../../common/configSetting';
import { Template } from '../../../../models/marketing-management/page-builder/template/template';
import { KeyValueModel } from '../../../../models/result-model';
import { TemplateConfigSearchRequest } from '../../../../models/marketing-management/page-builder/template-config/template-config-search-request';
import { TemplateConfig } from '../../../../models/marketing-management/page-builder/template-config/template-config';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { TemplateConfigAddOrChangeComponent } from '../template-config-add-or-change/template-config-add-or-change.component';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-template-config',
  templateUrl: './template-config.component.html',
  styleUrls: ['./template-config.component.css']
})
export class TemplateConfigComponent implements OnInit {
  @ViewChild('searchForm') searchForm: any;
  searchParams: TemplateConfigSearchRequest;
  template: Template;
  statuses: KeyValueModel[];
  componentTypes: KeyValueModel[];
  currentTemplateId: string;
  templateConfigs: TemplateConfig[];
  currentTemplateConfigId: string;
  totalRow = 0;
  getTemplateConfigsStatus: boolean;
  removeStatus: boolean;

  constructor(private templateService: TemplateService,
    private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.getTemplateConfigsStatus = false;
    this.removeStatus = false;
    this.searchParams = new TemplateConfigSearchRequest();
    this.searchParams.status = 0;
    this.searchParams.componentType = 0;
    this.searchParams.pageIndex = 0;
    this.searchParams.pageSize = 30;
    this.statuses = [];
    this.componentTypes = [];
    this.template = new Template();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.currentTemplateId = param.get('templateId');
    });
    this.searchParams.templateId = this.currentTemplateId;
    this.getTemplateConfigs();
  }

  async getTemplateConfigs(): Promise<void> {
    if (this.getTemplateConfigsStatus) {
      return;
    }
    App.blockUI();
    this.getTemplateConfigsStatus = true;
    if (this.searchForm.valid) {
      try {
        let response = await this.templateService.searchTemplateConfig(this.searchParams);
        this.statuses = response.statuses;
        this.componentTypes = response.componentTypes;
        this.templateConfigs = response.templateConfigs;
        this.template = response.template;
        this.totalRow = response.totalRow;
        if (this.template.id == null || this.template.id === "") {
          ConfigSetting.ShowError("Template not found!!!");
        }
      }
      catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
    this.getTemplateConfigsStatus = false;
    App.unblockUI();
  }

  public onRegisterConfirmation() {
    let obj = $(".templateconfig_remove_bs_confirmation");
    var register = obj.attr("confirmation_register");
    if (register == "1") {
      return;
    }
    obj.attr("confirmation_register", "1");
    obj.confirmation({
      rootSelector: '[data-toggle=confirmation]'
    });
    let $that = this;
    obj.on('confirmed.bs.confirmation', function () {
      console.log(this);
      let id = $(this).attr("tmpid");
      $that.onRemove(id);
    });
  }

  async onRemove(id: string): Promise<void> {
    if (this.removeStatus) {
      return;
    }
    App.blockUI();
    this.removeStatus = true;
    try {
      let response = await this.templateService.removeTemplateConfig(id,this.currentTemplateId);
      if (response.status) {
        ConfigSetting.ShowSuccess("Save sucess.");
        this.getTemplateConfigs();
      }
      else {
        ConfigSetting.ShowErrores(response.messages);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.removeStatus = false;
    App.unblockUI();
  }
}
