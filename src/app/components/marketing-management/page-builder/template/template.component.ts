import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

import { ConfigSetting } from '../../../../common/configSetting';
import { TemplateSearchRequest } from '../../../../models/marketing-management/page-builder/template/template-search-request';
import { KeyValueModel } from '../../../../models/result-model';
import { TemplateService } from '../../../../services/marketing-management/page-builder/template.service';
import { TemplateAddOrChangeComponent } from '../../../../components/marketing-management/page-builder/template-add-or-change/template-add-or-change.component';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Template } from '../../../../models/marketing-management/page-builder/template/template';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  searchParams: TemplateSearchRequest;
  statuses: KeyValueModel[];
  pageTypes: KeyValueModel[];
  templates: Template[];
  currentTemplateId: string;
  totalRow = 0;
  searching: boolean;
  removing: boolean;
  constructor(
    private templateService: TemplateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searching = false;
    this.removing = false;
    this.searchParams = new TemplateSearchRequest();
    this.searchParams.status = 0;
    this.searchParams.pageType = 0;
    this.searchParams.pageIndex = 0;
    this.searchParams.pageSize = 30;

    this.statuses = [];
    this.pageTypes = [];
    this.getTemplates();
  }

  async getTemplates(): Promise<void> {
    if (this.searching) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.searching = true;
    try {
      const response = await this.templateService.search(this.searchParams);
      this.statuses = response.statuses;
      this.pageTypes = response.pageTypes;
      this.templates = response.templates;
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.searching = false;
    App.unblockUI();
  }
  async onRemove(id: string): Promise<void> {
    if (this.removing) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.removing = true;
    try {
      const response = await this.templateService.removeTemplate(id);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save sucess.');
        this.getTemplates();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.removing = false;
    App.unblockUI();
  }

  public onRegisterConfirmation() {
    const register = $('.template_remove_bs_confirmation').attr('confirmation_register');
    if (register === '1') {
      return;
    }
    $('.template_remove_bs_confirmation').attr('confirmation_register', '1');
    $('.template_remove_bs_confirmation').confirmation({
      rootSelector: '[data-toggle=confirmation]'
    });
    const $that = this;
    $('.template_remove_bs_confirmation').on('confirmed.bs.confirmation', function () {
      console.log(this);
      const id = $(this).attr('tmpid');
      $that.onRemove(id);
    });
  }
}
