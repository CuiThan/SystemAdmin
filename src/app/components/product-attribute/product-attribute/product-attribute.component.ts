import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { forEach } from '@angular/router/src/utils/collection';
import { KeyValueModel } from '../../../models/result-model';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';

import { ProductAttributeService } from '../../../services/product-attribute.service';
import { ProductAttributeSearchRequest } from '../../../models/product-attribute-search-request';
import { ProductAttributeCrudRequest } from '../../../models/product-attribute-add-or-update';
import { ProductAttributeModel } from '../../../models/product-attribute-model';
import { ProductAttributeAddOrUpdateComponent } from '../../../components/product-attribute/product-attribute-add-or-update/product-attribute-add-or-update.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.css']
})
export class ProductAttributeComponent implements OnInit {
  @ViewChild(ProductAttributeAddOrUpdateComponent) productAttributeAddOrUpdate: ProductAttributeAddOrUpdateComponent;

  addOrUpdateParams: ProductAttributeCrudRequest;
  searchParams: ProductAttributeSearchRequest;
  statuses: KeyValueModel[];
  productattributes: KeyValueModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;

  constructor(
    private productAttributeService: ProductAttributeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchParams = new ProductAttributeSearchRequest();
    this.addOrUpdateParams = new ProductAttributeCrudRequest();
    this.productattributes = [];
    this.searchParams.status = 0;
    this.statuses = [];
    this.onSearch();
  }
  async onSearch(): Promise<void> {
    try {
      const response = await this.productAttributeService.search(this.searchParams);
      this.productattributes = response.productAttributes;
      this.statuses = response.statuses;
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onDelete(id: number): Promise<void> {
    try {
      this.addOrUpdateParams.id = id;
      const response = await this.productAttributeService.delete(this.addOrUpdateParams);
      this.onSearch();
      ConfigSetting.ShowSuccess('Delete sucess.');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onShowAddOrUpdateForm(id: number): Promise<void> {
    try {
      this.productAttributeAddOrUpdate.productAttributeGet.attributeId = id;
      this.productAttributeAddOrUpdate.onGet();
      $('#product-attribute-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
