import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';;
import { KeyValueModel } from '../../../models/result-model';
import { promise } from 'selenium-webdriver';
import { Jsonp } from '@angular/http/src/http';

import { ProductAttributeService } from '../../../services/product-attribute.service';
import { ProductAttributeValueSearchRequest } from '../../../models/product-attribute-value-search-request';
import { ProductAttributeValueCrudRequest } from '../../../models/product-attribute-value-add-or-update'

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-product-attribute-value-add-or-update',
  templateUrl: './product-attribute-value-add-or-update.component.html',
  styleUrls: ['./product-attribute-value-add-or-update.component.css']
})
export class ProductAttributeValueAddOrUpdateComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>();

  productAttributeValueGet: ProductAttributeValueSearchRequest;
  productAttributeValue: ProductAttributeValueCrudRequest;
  statuses: KeyValueModel[];
  submited: boolean;
  constructor(
    private productAttributeService: ProductAttributeService
  ) { }

  ngOnInit() {
    this.productAttributeValueGet = new ProductAttributeValueSearchRequest();
    this.productAttributeValue = new ProductAttributeValueCrudRequest();
    this.submited = false;
  }
  async onGet(): Promise<void> {
    App.blockUI();;
    try {
      var response = await this.productAttributeService.getProductAttributeValue(this.productAttributeValueGet);
      let item = response.productAttributeValue;
      this.productAttributeValue.id = item.attributeValueId;
      this.productAttributeValue.attributeId = item.attributeId;
      this.productAttributeValue.value = item.value;
      this.productAttributeValue.unitId = item.unitId;
      this.productAttributeValue.status = item.attributeValueStatus;
      this.productAttributeValue.order = item.displayOrder;
      this.statuses = response.statuses;
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
  async onAddOrUpdate(form): Promise<void> {
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        let request = this.productAttributeValue;
        let response = await this.productAttributeService.saveProductAttributeValue(request);
        if (response.status) {
          $('#product-attribute-value-add-or-update').modal('hide');
          ConfigSetting.ShowSuccess("Save sucess.");
          this.onSearch.next('onSearch');
        }
        else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
