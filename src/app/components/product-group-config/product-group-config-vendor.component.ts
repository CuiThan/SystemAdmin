import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { VendorModel } from '../../models/vendor-model/vendor-model';
import { ProductGroupService } from '../../services/product-group.service';
import { KeyValueModel } from '../../models/result-model';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'product-group-config-vendor',
  templateUrl: './product-group-config-vendor.component.html',
})

export class ProductGroupConfigVenderComponent implements OnInit {
  productGroupId: string;
  vendorParam: string;
  vendorStatus: number = 0;
  vendorStatuses: KeyValueModel[];
  pageIndex: number = 0;
  pageSize: number = 0;
  totalRow: number = 0;

  vendorConfigParam: string;
  vendorConfigStatus: number;
  vendorConfigPageIndex: number = 0;
  vendorConfigPageSize: number = 0;
  vendorConfigTotalRow: number = 0;

  vendors: VendorModel[];
  vendorsConfig: VendorModel[];
  onAddVenderStatus: boolean;
  onGetVendorsStatus: boolean;
  onGetVendorsConfigStatus: boolean;
  onRemoveStatus: boolean;

  constructor(private productGroupService: ProductGroupService) { }

  ngOnInit() {

  }
  async onGetVendors(): Promise<void> {
    if (this.onGetVendorsStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    try {
      this.onGetVendorsStatus = true;
      let response = await this.productGroupService.onGetVendors(this.vendorParam, this.vendorStatus, this.pageIndex);
      if (response.status) {
        this.vendorStatuses = response.statuses;
        this.vendors = response.vendors;
        this.pageIndex = response.pageIndex;
        this.pageSize = response.pageSize;
        this.totalRow = response.totalRow;
      }
      else {
        this.vendors = [];
        this.pageIndex = 0;
        this.pageSize = 0;
        this.totalRow = 0;
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }

    this.onGetVendorsStatus = false;
    App.unblockUI();
  }

  async onGetVendorsConfig(productGroupId: string): Promise<void> {
    if (this.onGetVendorsConfigStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetVendorsConfigStatus = true;
    this.productGroupId = productGroupId;
    try {
      let response = await this.productGroupService.onGetVendorsConfig(this.productGroupId, this.vendorConfigParam, this.vendorConfigStatus, this.vendorConfigPageIndex);
      if (response.status) {
        this.vendorsConfig = response.vendors;
        this.vendorConfigPageIndex = response.pageIndex;
        this.vendorConfigPageSize = response.pageSize;
        this.vendorConfigTotalRow = response.totalRow;
      }
      else {
        this.vendorsConfig = [];
        this.vendorConfigPageIndex = 0;
        this.vendorConfigPageSize = 0;
        this.vendorConfigTotalRow = 0;
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    this.onGetVendorsConfigStatus = false;
    App.unblockUI();
  }

  async onAddVender(vendorId: string): Promise<void> {
    if (this.onAddVenderStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onAddVenderStatus = true;
    try {
      let response = await this.productGroupService.onAddVendors(this.productGroupId, vendorId);
      if (response.status) {
        ConfigSetting.ShowSuccess("Add sucess.");
        this.onGetVendorsConfig(this.productGroupId);
      }
      else {
        ConfigSetting.ShowErrores(response.messages);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.onAddVenderStatus = false;
    App.unblockUI();
  }

  async onRemove(vendorId: string): Promise<void> {
    if (this.onRemoveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onRemoveStatus = true;
    debugger;
    try {
      let response = await this.productGroupService.onRemoveVendors(this.productGroupId, vendorId);
      if (response.status) {
        ConfigSetting.ShowSuccess("Remove sucess.");
        this.onGetVendorsConfig(this.productGroupId);
      }
      else {
        ConfigSetting.ShowErrores(response.messages);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.onRemoveStatus = false;
    App.unblockUI();
  }

}