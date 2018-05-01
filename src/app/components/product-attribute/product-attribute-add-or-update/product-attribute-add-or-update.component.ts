import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { KeyValueModel } from '../../../models/result-model';
import { promise } from 'selenium-webdriver';
import { Jsonp } from '@angular/http/src/http';

import { ProductAttributeService } from '../../../services/product-attribute.service';
import { ProductAttributeSearchRequest } from '../../../models/product-attribute-search-request';
import { ProductAttributeCrudRequest } from '../../../models/product-attribute-add-or-update';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-product-attribute-add-or-update',
  templateUrl: './product-attribute-add-or-update.component.html',
  styleUrls: ['./product-attribute-add-or-update.component.css']
})
export class ProductAttributeAddOrUpdateComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>();

  productAttributeGet: ProductAttributeSearchRequest;
  productAttribute: ProductAttributeCrudRequest;
  statuses: KeyValueModel[];
  submited: boolean;
  constructor(
    private productAttributeService: ProductAttributeService
  ) { }

  ngOnInit() {
    this.productAttributeGet = new ProductAttributeSearchRequest();
    this.productAttribute = new ProductAttributeCrudRequest();
    this.submited = false;
  }
  async onGet(): Promise<void> {
    App.blockUI();
    try {
      const response = await this.productAttributeService.get(this.productAttributeGet);
      const item = response.productAttribute;
      this.productAttribute.id = item.attributeId;
      this.productAttribute.name = item.attributeName;
      this.productAttribute.status = item.attributeStatus;
      this.statuses = response.statuses;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
  async onAddOrUpdate(form): Promise<void> {
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        const request = this.productAttribute;
        const response = await this.productAttributeService.save(request);
        if (response.status) {
          $('#product-attribute-add-or-update').modal('hide');
          ConfigSetting.ShowSuccess('Save sucess.');
          this.onSearch.next('onSearch');
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
