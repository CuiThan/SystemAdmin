import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ConfigSetting } from '../../common/configSetting';
import { KeyValueModel } from '../../models/result-model';
import { Dictionary } from '../../models/dictionary';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

import { EmailOrSmsSearchRequestModel } from '../../models/email-or-sms-search-request-model';
import { EmailOrSmsModel } from '../../models/email-or-sms-model';
import { EmailOrSmsService } from '../../services/email-or-sms.service';


declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-email-or-sms',
  templateUrl: './email-or-sms.component.html',
  styleUrls: ['./email-or-sms.component.css']
})
export class EmailOrSmsComponent implements OnInit {

  searchParams: EmailOrSmsSearchRequestModel;
  emailSmses: EmailOrSmsModel[];
  emailStatuses: KeyValueModel[];
  emailTypes: KeyValueModel[];
  emailMessageTypes: KeyValueModel[];
  showAddNew = false;
  rowEdits: Dictionary<boolean>;
  row: Dictionary<boolean>;
  pageIndex: number = 0;
  pageSize = 30;
  totalRow = 0;

  constructor(
    private emailOrSmsService: EmailOrSmsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.searchParams = new EmailOrSmsSearchRequestModel();
    this.searchParams.status = 0;
    this.searchParams.type = 0;
    this.searchParams.messageType = 0;
    this.emailStatuses = [];
    this.emailTypes = [];
    this.emailMessageTypes = [];
    this.rowEdits = new Dictionary<boolean>();
    this.onSearch();

  }

  async onSearch(): Promise<void> {
    try {
      let response = await this.emailOrSmsService.search(this.searchParams);
      this.emailSmses = response.emailSmses as EmailOrSmsModel[];
      this.emailStatuses = response.emailStatuses;
      this.emailTypes = response.emailTypes;
      this.emailMessageTypes = response.emailMessageTypes;
      this.totalRow = response.totalRow;
      this.rowEdits = new Dictionary<boolean>();
      for (var i = 0; i < this.emailSmses.length; i++) {
        var emailSms = this.emailSmses[i];
        this.rowEdits.Add(emailSms.id, false);
      }

    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onGetDetail(id: string): Promise<void> {
    App.blockUI();;
    try {
      if (id!='') {
          this.router.navigateByUrl(ConfigSetting.EmailSmsDetailPage+id);
      }

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    App.unblockUI();
  }  

  async onGetVerifyDetail(id: string): Promise<void> {
    App.blockUI();;
    try {
      if (id!='') {
          this.router.navigateByUrl(ConfigSetting.EmailSmsVerifyDetailPage+id);
      }

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    App.unblockUI();
  }  

}
