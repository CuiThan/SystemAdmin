import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { promise } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Jsonp } from '@angular/http/src/http';
import { ConfigSetting } from '../../../../common/configSetting';
import { TemplateConfigSearchRequest } from '../../../../models/marketing-management/page-builder/template-config/template-config-search-request';
import { KeyValueModel } from '../../../../models/result-model';
import { TemplateService } from '../../../../services/marketing-management/page-builder/template.service';
import { Router } from '@angular/router';
import { TemplateConfig } from '../../../../models/marketing-management/page-builder/template-config/template-config';
import { Template } from '../../../../models/marketing-management/page-builder/template/template';

declare var App: any;
declare var jquery: any;
declare var $: any;



@Component({
  selector: 'app-template-config-add-or-change',
  templateUrl: './template-config-add-or-change.component.html',
  styleUrls: ['./template-config-add-or-change.component.css']
})
export class TemplateConfigAddOrChangeComponent implements OnInit {
  templateConfig: TemplateConfig;
  template: Template;
  statuses: KeyValueModel[];
  componentTypes: KeyValueModel[];
  templatePositionCodeIsExist = false;
  submited: boolean;
  getDetailStatus: boolean;
  changeTemplatePositionCodeStatus: boolean;
  formValid: boolean;
  tmpId: string;
  templateConfigId: string;

  constructor(
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.tmpId = params.templateId;
      this.templateConfigId = params.id;
    });
  }

  ngOnInit() {
    this.templateConfig = new TemplateConfig();
    this.template = new Template();
    this.submited = false;
    this.getDetailStatus = false;
    this.formValid = true;
    this.onGetDetail();

  }

  async onGetDetail(): Promise<void> {
    if (this.getDetailStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.getDetailStatus = true;
    try {
      var response = await this.templateService.getTemplateConfigById(this.templateConfigId, this.tmpId);
      this.templateConfig = response.templateConfig;
      this.template = response.template;
      this.statuses = response.statuses;
      this.componentTypes = response.componentTypes;
      setTimeout(() => {
        this.onRegisterComponentSelect2();
      }, 500);
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.getDetailStatus = false;
    App.unblockUI();
  }

  async onAddOrChange(form): Promise<void> {
    if (this.submited) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.submited = true;
    try {
      this.formValid = form.valid && !this.templatePositionCodeIsExist;
      if (this.formValid) {
        let requestModel = this.templateConfig;
        let response = await this.templateService.saveTemplateConfig(requestModel);
        if (response.status) {
          ConfigSetting.ShowSuccess("Save sucess.");
          this.router.navigateByUrl("/g/template/template-config/" + this.tmpId);
        }
        else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.submited = false;
    App.unblockUI();
  }
  async onChangeTemplatePositionCode(): Promise<void> {
    if (this.changeTemplatePositionCodeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.changeTemplatePositionCodeStatus = true;
    try {
      var response = await this.templateService.checkTemplatePositionCodeExist(this.template.id, this.templateConfig.templatePositionCode, this.templateConfig.id);
      if (response.status) {
        this.templatePositionCodeIsExist = response.isExist;
      }
      else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.changeTemplatePositionCodeStatus = false;
    App.unblockUI();
  }
  async onRegisterComponentSelect2(): Promise<void> {
    let $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        "#componentId",
        "TemplateConfig/SearchComponents",
        this.createParametersFun,
        $this,
        "Search components",
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectComponentEvent
      )
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFun(params, $this) {
    let query = {
      componentType: $this.templateConfig.componentType,
      tearm: params.term
    }
    return query;
  }
  formatRepo(repo) {
    return repo.text;
    // if (repo.loading) {
    //   return repo.text;
    // }
    // var markup = "<div class='select2-result-repository clearfix'>" +
    //   "<div class='select2-result-repository__meta'>" +
    //   "<div class='select2-result-repository__title'>" + repo.text + "</div>";
    // markup += "</div></div>";
    // return markup;
  }
  formatRepoSelection(repo) {
    return repo.text;
  }
  processResults(data, params) {
    return {
      results: data.components
    };
  }
  selectComponentEvent(e, $this) {
    let id = e.params.data.id;
    $this.templateConfig.componentId = id;
  }
}
