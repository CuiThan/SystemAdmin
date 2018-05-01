import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { VendorSearchRequest } from '../../../models/vendor-model/vendor-search-request';
import { VendorModel } from '../../../models/vendor-model/vendor-model';
import { KeyValueModel } from '../../../models/result-model';
import { VendorService } from '../../../services/vendor.service';
import { forEach } from '@angular/router/src/utils/collection';

import { VendorAddOrChangeComponent } from '../../../components/vendor/vendor-add-or-change/vendor-add-or-change.component';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';


declare var jquery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  @ViewChild(VendorAddOrChangeComponent) v: VendorAddOrChangeComponent;
  @ViewChild('f') form: any;

  searchParams: VendorSearchRequest;
  types: KeyValueModel[];
  statuses: KeyValueModel[];
  vendors: VendorModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  constructor(
    private vendorService: VendorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchParams = new VendorSearchRequest();
    this.searchParams.status = 0;
    this.vendors = [];

    this.types = [];
    this.statuses = [];
    this.getVendors();
  }
  async getVendors(): Promise<void> {
    if (this.form.valid) {
      try {
        let response = await this.vendorService.search(this.searchParams);
        this.types = response.types;
        this.statuses = response.statuses;
        this.vendors = response.vendors;
        this.totalRow = response.totalRow;
      }
      catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
  }
  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {
      
      this.v.vendor.id = id;
      this.v.onGet();
      $('#vendor-add-or-change').modal('show');
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
