import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { CustomerSearchRequest } from '../../models/customer-search-request';
import { KeyValueModel } from '../../models/result-model';
import { CustomerService } from '../../services/customer.service';
import { forEach } from '@angular/router/src/utils/collection';
import { CustomerModel } from '../../models/customer-model';
import { CustomerAddOrChangeComponent } from '../../components/customer-add-or-change/customer-add-or-change.component';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  @ViewChild(CustomerAddOrChangeComponent) customerAddOrChange: CustomerAddOrChangeComponent;
  @ViewChild('f') form: any;
  searchParams: CustomerSearchRequest;
  types: KeyValueModel[];
  statuses: KeyValueModel[];
  customers: CustomerModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchParams = new CustomerSearchRequest();
    this.searchParams.status = 0;    
    this.customers = [];

    this.types = [];
    this.statuses = [];
    this.getCustomers();
    if (jQuery().datepicker) {
      $('.date-picker').datepicker({
          rtl: App.isRTL(),
          orientation: 'left',
          autoclose: true
      });
      // $('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
  }
  }
  async getCustomers(): Promise<void> {
    if (this.form.valid) {
      try {
        const response = await this.customerService.search(this.searchParams);
        this.types = response.types;
        this.statuses = response.statuses;
        this.customers = response.customers;
        this.totalRow = response.totalRow;
      } catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
  }

  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {
      this.customerAddOrChange.customer.id = id;
      this.customerAddOrChange.onGet();
      $('#customer-add-or-change').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onGetDetail(id: string): Promise<void> {
    App.blockUI();
    try {
      if (id !== '') {
          this.router.navigateByUrl(ConfigSetting.CustomerDetailPage + id);
      }

    } catch (error) {
      ConfigSetting.ShowErrorException(error);
    }
    App.unblockUI();
  }
}
