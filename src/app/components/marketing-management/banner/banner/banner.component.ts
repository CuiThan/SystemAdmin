import { Component, OnInit, ViewChild } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

import { ConfigSetting } from '../../../../common/configSetting';
import { BannerSearchRequest } from '../../../../models/marketing-management/banner/banner/banner-search-request';
import { KeyValueModel } from '../../../../models/result-model';
import { BannerService } from '../../../../services/marketing-management/banner/banner.service';
import { BannerAddOrChangeComponent } from '../../../../components/marketing-management/banner/banner-add-or-change/banner-add-or-change.component';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Banner } from '../../../../models/marketing-management/banner/banner/banner';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild(BannerAddOrChangeComponent) bannerAddOrChange: BannerAddOrChangeComponent;
  @ViewChild('searchForm') form: any;
  searchParams: BannerSearchRequest;
  statuses: KeyValueModel[];
  banners: Banner[];
  currentBannerId: string;
  totalRow = 0;
  getBannersStatus: boolean;
  onDeleteStatus: boolean;
  constructor(
    private bannerService: BannerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchParams = new BannerSearchRequest();
    this.searchParams.status = 0;
    this.searchParams.pageIndex = 0;
    this.searchParams.pageSize = 30;
    this.getBannersStatus = false;
    this.onDeleteStatus = false;
    this.statuses = [];
    this.getBanners();
  }

  async getBanners(): Promise<void> {
    if (this.getBannersStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.getBannersStatus = true;
    try {
      const response = await this.bannerService.searchBanner(this.searchParams);
      this.statuses = response.statuses;
      this.banners = response.banners;
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.getBannersStatus = false;
    App.unblockUI();
  }

  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {
      this.currentBannerId = id;
      this.bannerAddOrChange.banner.id = id;
      this.bannerAddOrChange.onGetDetail();
      $('#banner-add-or-change').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onDelete(id: string): Promise<void> {
    if (this.onDeleteStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onDeleteStatus = true;
    try {
      const response = await this.bannerService.removeBanner(id);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save sucess.');
        this.getBanners();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.onDeleteStatus = false;
    App.unblockUI();
  }
  public onRegisterConfirmation() {
    const obj = $('.banner_remove_bs_confirmation');
    const register = obj.attr('confirmation_register');
    if (register === '1') {
      return;
    }
    obj.attr('confirmation_register', '1');
    obj.confirmation({
      rootSelector: '[data-toggle=confirmation]'
    });
    const $that = this;
    obj.on('confirmed.bs.confirmation', function () {
      console.log(this);
      const id = $(this).attr('tmpid');
      $that.onDelete(id);
    });
  }
}
