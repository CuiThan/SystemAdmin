import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { promise } from 'selenium-webdriver';
import { forEach } from '@angular/router/src/utils/collection';
import { Jsonp } from '@angular/http/src/http';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';
import { BannerService } from '../../../../services/marketing-management/banner/banner.service';
import { Router } from '@angular/router';
import { BannerItem } from '../../../../models/marketing-management/banner/banner-item/banner-item';
import { Banner } from '../../../../models/marketing-management/banner/banner/banner';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-banner-item-add-or-change',
  templateUrl: './banner-item-add-or-change.component.html',
  styleUrls: ['./banner-item-add-or-change.component.css']
})
export class BannerItemAddOrChangeComponent implements OnInit {
  @Output() reloadBannerItemEvent = new EventEmitter();
  bannerId: string;
  bannerItemId: string;
  bannerItem: BannerItem;
  banner: Banner;
  statuses: KeyValueModel[];
  submited: boolean;
  onGetDetailStatus: boolean;
  constructor(private bannerService: BannerService,
    private router: Router) { }

  ngOnInit() {
    this.bannerItem = new BannerItem();
    this.banner = new Banner();
    this.submited = false;
    if (jQuery().datetimepicker) {
      $('.datetimepicker1').datetimepicker();
    }
  }

  async onGetDetail(): Promise<boolean> {
    if (this.onGetDetailStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    this.onGetDetailStatus = true;
    App.blockUI();
    try {
      let response = await this.bannerService.getBannerItemById(this.bannerItemId, this.bannerId);
      if (response.status) {
        this.bannerItem = response.bannerItem;
        this.banner = response.banner;
        this.statuses = response.statuses;
        return true;
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetDetailStatus = false;
      App.unblockUI();
    }
    return false;
  }

  async onAddOrChange(form): Promise<void> {
    if (this.submited) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        let requestModel = this.bannerItem;
        if (requestModel.isDefault) {
          requestModel.startDate = "";
          requestModel.endDate = "";
        }
        else {
          requestModel.startDate = $("input[name='startDate']").val();
          requestModel.endDate = $("input[name='endDate']").val();
        }

        let response = await this.bannerService.saveBannerItem(requestModel);
        if (response.status) {
          $('#banner-item-add-or-change').modal('hide');
          ConfigSetting.ShowSuccess('Save sucess.');
          this.reloadBannerItemEvent.emit();
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      App.unblockUI();
      this.submited = false;
    }

  }

  async onChangeImage(): Promise<void> {
    App.blockUI();
    try {
      $('#file-uploader-popup').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async getUploadedFile($event): Promise<void> {
    try {
      //this.bannerItem.imageUrl = ConfigSetting.CDN_URL + $event;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onSelectedCheckbox(): Promise<void> {
    try {
      $('input[name=\'startDate\']').val('');
      $('input[name=\'endDate\']').val('');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}

