import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../../common/configSetting';
import { forEach } from '@angular/router/src/utils/collection';
import { KeyValueModel } from '../../../models/result-model';

import { ProductAttributeService } from '../../../services/product-attribute.service';
import { ProductAttributeValueSearchRequest } from '../../../models/product-attribute-value-search-request';
import { ProductAttributeValueCrudRequest } from '../../../models/product-attribute-value-add-or-update';
import { ProductAttributeValueModel } from '../../../models/product-attribute-value-model';
import { ProductAttributeValueAddOrUpdateComponent } from '../../../components/product-attribute/product-attribute-value-add-or-update/product-attribute-value-add-or-update.component';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-attribute-value',
  templateUrl: './product-attribute-value.component.html',
  styleUrls: ['./product-attribute-value.component.css']
})
export class ProductAttributeValueComponent implements OnInit {
  @ViewChild(ProductAttributeValueAddOrUpdateComponent) productAttributeValueAddOrUpdate: ProductAttributeValueAddOrUpdateComponent;

  addOrUpdateParams: ProductAttributeValueCrudRequest;
  searchParams: ProductAttributeValueSearchRequest;
  statuses: KeyValueModel[];
  productattributeValues: KeyValueModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  attributeId = 0;

  constructor(
    private productAttributeService: ProductAttributeService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.searchParams = new ProductAttributeValueSearchRequest();
    this.addOrUpdateParams = new ProductAttributeValueCrudRequest();
    this.productattributeValues = [];
    this.searchParams.status = 0;
    this.statuses = [];

    this.router.paramMap.subscribe((param: ParamMap) => {
      this.attributeId = +param.get('attributeId');
      this.onSearch();
    });
  }
  async onSearch(): Promise<void> {
    try {
      this.searchParams.attributeId = this.attributeId;
      const response = await this.productAttributeService.searchProductAttributeValue(this.searchParams);
      this.productattributeValues = response.productAttributeValues;
      this.statuses = response.statuses;
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onDelete(id: number): Promise<void> {
    try {
      this.addOrUpdateParams.id = id;
      const response = await this.productAttributeService.deleteProductAttributeValue(this.addOrUpdateParams);
      this.onSearch();
      ConfigSetting.ShowSuccess('Delete sucess.');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onShowAddOrUpdateForm(id: number): Promise<void> {
    try {
      this.productAttributeValueAddOrUpdate.productAttributeValueGet.attributeValueId = id;
      this.productAttributeValueAddOrUpdate.onGet();
      $('#product-attribute-value-add-or-update').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
