import { Component, OnInit, ViewChild } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { KeyValueModel } from '../../models/result-model';
import { ProductGroupService } from '../../services/product-group.service';
import { ProductGroupConfigCategoryComponent } from '../../components/product-group-config/product-group-config-category.component';
import { ProductGroupConfigVenderComponent } from '../../components/product-group-config/product-group-config-vendor.component';
import { ProductGroupConfigAttributeComponent } from '../../components/product-group-config/product-group-config-attribute.component';
import { ProductGroupConfigPriceComponent } from '../../components/product-group-config/product-group-config-price.component';
import { ProductGroupConfigQuantityComponent } from '../../components/product-group-config/product-group-config-quantity.component';
import { ProductGroupConfigManufacturerComponent } from '../../components/product-group-config/product-group-config-manufacturer.component';
import { ProductGroupConfigWarehouseComponent } from '../../components/product-group-config/product-group-config-warehouse.component';
import { ProductGroupConfigProductComponent } from '../../components/product-group-config/product-group-config-product.component';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-group-config',
  templateUrl: './product-group-config.component.html',
  styleUrls: ['./product-group-config.component.css']
})
export class ProductGroupConfigComponent implements OnInit {
  @ViewChild(ProductGroupConfigCategoryComponent) productGroupCategories: ProductGroupConfigCategoryComponent;
  @ViewChild(ProductGroupConfigVenderComponent) productGroupVenders: ProductGroupConfigVenderComponent;
  @ViewChild(ProductGroupConfigAttributeComponent) productGroupAttributes: ProductGroupConfigAttributeComponent;
  @ViewChild(ProductGroupConfigPriceComponent) productGroupPrices: ProductGroupConfigPriceComponent;
  @ViewChild(ProductGroupConfigQuantityComponent) productGroupQuantities: ProductGroupConfigQuantityComponent;
  @ViewChild(ProductGroupConfigManufacturerComponent) productGroupManufacturers: ProductGroupConfigManufacturerComponent;
  @ViewChild(ProductGroupConfigWarehouseComponent) productGroupWarehouses: ProductGroupConfigWarehouseComponent;
  @ViewChild(ProductGroupConfigProductComponent) productGroupProducts: ProductGroupConfigProductComponent;
  searchNameParam: string;
  searchStatusParam: number = 0;
  statusesBySearch: KeyValueModel[];
  statuses: KeyValueModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  showAddNew = false;
  rowEdits: Dictionary<boolean>;
  productGroupAddNew: ProductGroupModel;
  productGroupEditing: ProductGroupModel;
  formValid: boolean = true;
  productGroups: ProductGroupModel[]
  onGetsStatus: boolean = false;
  onGetStatus: boolean = false;
  onSaveStatus: boolean = false;
  constructor(private productGroupService: ProductGroupService) { }

  ngOnInit() {    
    this.onGets();
  }

  async onAddNew(): Promise<void> {
    try {
      for (let i = 0; i < this.productGroups.length; i++) {
        if (this.rowEdits.Item(this.productGroups[i].id)) {
          this.onChangeCancel(this.productGroups[i].id);
          break;
        }
      }
      this.productGroupAddNew = await this.onGet("");
      this.showAddNew = !this.showAddNew;
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNewCancel(): Promise<void> {
    try {
      this.showAddNew = false;
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onChange(id: string): Promise<void> {
    this.onAddNewCancel();
    for (let i = 0; i < this.productGroups.length; i++) {
      if (this.rowEdits.Item(this.productGroups[i].id)) {
        this.onChangeCancel(this.productGroups[i].id);
      }
    }
    let productGroup = this.productGroups.find(x => x.id == id);
    productGroup = await this.onGet(id);
    this.productGroupEditing = JSON.parse(JSON.stringify(productGroup));
    var state = this.rowEdits.Item(id);
    this.rowEdits.Change(id, !state);

  }
  async onChangeCancel(id: string): Promise<void> {
    this.rowEdits.Change(id, false);
    let index = this.productGroups.findIndex(x => x.id == id);
    this.productGroups[index] = this.productGroupEditing;
  }

  async onGets(): Promise<void> {
    if (this.onGetsStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetsStatus = true;
    try {
      let response = await this.productGroupService.onGets(this.searchNameParam, this.searchStatusParam, this.pageIndex, this.pageSize)
      if (response.status) {
        this.statusesBySearch = response.statuses;
        this.productGroups = response.productGroups as ProductGroupModel[];
        this.pageIndex = response.pageIndex;
        this.pageSize = response.pageSize;
        this.totalRow = response.totalRow;
        this.rowEdits = new Dictionary<boolean>();
        for (var i = 0; i < this.productGroups.length; i++) {
          var productGroup = this.productGroups[i];
          this.rowEdits.Add(productGroup.id, false);
        }
      }
      else {
        ConfigSetting.ShowErrores(response.messages);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

    this.onGetsStatus = false;
    App.unblockUI();
  }

  async onGet(id): Promise<ProductGroupModel> {
    let productGroup = null;
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetStatus = true;
    try {
      let response = await this.productGroupService.onGet(id)
      if (response.status) {
        this.statuses = response.statuses;
        productGroup = response.productGroup as ProductGroupModel;
      }
      else {
        ConfigSetting.ShowErrores(response.messages);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

    this.onGetStatus = false;
    App.unblockUI();
    return productGroup;
  }

  async onSave(form: any, productGroup: ProductGroupModel): Promise<void> {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onSaveStatus = true;
    try {
      this.formValid = form.valid;
      if (this.formValid) {
        let response = await this.productGroupService.onSave(productGroup)
        if (response.status) {
          ConfigSetting.ShowSuccess("Save sucess.");
          await this.onGets();
          if (productGroup.id == null || productGroup.id == undefined || productGroup.id.length <= 0) {
            await this.onAddNewCancel();
          }
          else {
            await this.rowEdits.Change(productGroup.id, false);
          }
        }
        else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }

    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

    this.onSaveStatus = false;
    App.unblockUI();
  }

  async onShowFormCategory(productGroupId: string): Promise<void> {
    await this.productGroupCategories.onGetCategories(productGroupId);
    $("#productgroup-category-change").modal('show');
  }
  async onShowFormVendersConfig(productGroupId: string): Promise<void> {

    await this.productGroupVenders.onGetVendors();
    await this.productGroupVenders.onGetVendorsConfig(productGroupId);
    $("#productgroup-vender").modal('show');
  }
  async onShowFormAttributesConfig(productGroupId: string): Promise<void> {
    await this.productGroupAttributes.onSetProductGroupId(productGroupId);
    await this.productGroupAttributes.onGetAttributesConfig();
    $("#productgroup-attribute").modal('show');
  }
  async onShowFormPricesConfig(productGroupId: string): Promise<void> {
    await this.productGroupPrices.onSetProductGroupId(productGroupId);
    await this.productGroupPrices.onGetPricesConfig();
    $("#productgroup-price").modal('show');
  }
  async onShowFormQuantitiesConfig(productGroupId: string): Promise<void> {
    await this.productGroupQuantities.onSetProductGroupId(productGroupId);
    await this.productGroupQuantities.onGetQuantitysConfig();
    $("#productgroup-quantity").modal('show');
  }
  async onShowFormManufacturersConfig(productGroupId: string): Promise<void> {
    await this.productGroupManufacturers.onSetProductGroupId(productGroupId);
    await this.productGroupManufacturers.onGetManufacturers();
    await this.productGroupManufacturers.onGetManufacturersConfig();
    $("#productgroup-manufacturer").modal('show');
  }
  async onShowFormWarehousesConfig(productGroupId: string): Promise<void> {
    await this.productGroupWarehouses.onSetProductGroupId(productGroupId);
    await this.productGroupWarehouses.onGetWarehouses();
    await this.productGroupWarehouses.onGetWarehousesConfig();
    $("#productgroup-warehouse").modal('show');
  }
  async onShowFormProductsConfig(productGroupId: string): Promise<void> {
    await this.productGroupProducts.onSetProductGroupId(productGroupId);
    await this.productGroupProducts.onGetProducts();
    await this.productGroupProducts.onGetProductsConfig();
    $("#productgroup-product").modal('show');
  }
}
