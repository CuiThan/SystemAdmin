import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { promise } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Jsonp } from '@angular/http/src/http';
import { ConfigSetting } from '../../../../common/configSetting';
import { TemplateSearchRequest } from '../../../../models/marketing-management/page-builder/template/template-search-request';
import { KeyValueModel } from '../../../../models/result-model';
import { TemplateService } from '../../../../services/marketing-management/page-builder/template.service';
// import { CustomerAddOrChangeComponent } from '../../components/customer-add-or-change/customer-add-or-change.component';
import { Router } from '@angular/router';
import { Template } from '../../../../models/marketing-management/page-builder/template/template';
import { FileUploaderPopupComponent } from '../../../common/file-uploader-popup/file-uploader-popup.component';

declare var App: any;
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-template-add-or-change',
  templateUrl: './template-add-or-change.component.html',
  styleUrls: ['./template-add-or-change.component.css']
})
export class TemplateAddOrChangeComponent implements OnInit {
  @ViewChild(FileUploaderPopupComponent) fileUploaderPopup: FileUploaderPopupComponent;
  template: Template;
  templateId: string;
  statuses: KeyValueModel[];
  pageTypes: KeyValueModel[];
  submited: boolean;
  onGetDetailStatus: boolean;
  formValid: boolean;
  constructor(
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.templateId = params.id;
    });
  }

  ngOnInit() {
    this.template = new Template();
    this.template.id = this.templateId;
    this.submited = false;
    this.formValid = true;
    this.onGetDetail();
  }

  async onGetDetail(): Promise<void> {
    if (this.onGetDetailStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetDetailStatus = true;
    try {
      const response = await this.templateService.getById(this.template.id);
      this.template = response.template;
      this.statuses = response.statuses;
      this.pageTypes = response.pageTypes;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.onGetDetailStatus = false;
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
      this.formValid = form.valid;
      if (this.formValid) {
        const requestModel = this.template;
        const response = await this.templateService.saveTemplate(requestModel);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          this.router.navigateByUrl(ConfigSetting.TemplatesPage);
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.submited = false;
    App.unblockUI();
  }

  async onChangeThumbnail(): Promise<void> {
    App.blockUI();
    try {
      $('#file-uploader-popup').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async getUploadedFile($event): Promise<void> {
    App.blockUI();
    try {
      //this.template.thumbnail = ConfigSetting.CDN_URL + $event;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
