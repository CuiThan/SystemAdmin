import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { ProductGroupProductModel } from '../../models/product-group-product-model';
import { ProductGroupService } from '../../services/product-group.service';
import { KeyValueModel } from '../../models/result-model';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
    selector: 'product-group-config-product',
    templateUrl: './product-group-config-product.component.html',
})

export class ProductGroupConfigProductComponent implements OnInit {
    productGroupId: string;
    productKeyword: string;
    productStatus: number = 0;
    productType: number = 0;
    pageIndex: number = 0;
    pageSize: number = 0;
    totalRow: number = 0;
    products: ProductGroupProductModel[];

    productConfigKeyword: string;
    productConfigStatus: number = 0;
    productConfigType: number = 0;
    productConfigPageIndex: number = 0;
    productConfigPageSize: number = 0;
    productConfigTotalRow: number = 0;
    productsConfig: ProductGroupProductModel[];

    Types: KeyValueModel[];
    Statuses: KeyValueModel[];

    onGetProductsStatus: boolean;
    onGetProductsConfigStatus: boolean;
    onAddStatus: boolean;
    onRemoveStatus: boolean;
    constructor(private productGroupService: ProductGroupService) { }

    ngOnInit() {

    }
    async onSetProductGroupId(productGroupId: string): Promise<void> {
        this.productGroupId = productGroupId;
    }

    async onGetProducts(): Promise<void> {
        if (this.onGetProductsStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        try {
            this.onGetProductsStatus = true;
            let response = await this.productGroupService.onGetProducts(
                this.productGroupId,
                this.productKeyword,
                this.productType,
                this.productStatus,
                this.pageIndex);
            if (response.status) {
                this.Statuses = response.statuses;
                this.products = response.products;
                this.pageIndex = response.pageIndex;
                this.pageSize = response.pageSize;
                this.totalRow = response.totalRow;
            }
            else {
                this.products = [];
                this.pageIndex = 0;
                this.pageSize = 0;
                this.totalRow = 0;
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        finally {
            this.onGetProductsStatus = false;
            App.unblockUI();
        }

    }

    async onGetProductsConfig(): Promise<void> {
        if (this.onGetProductsConfigStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetProductsConfigStatus = true;
        try {
            let response = await this.productGroupService.onGetProductsConfig(
                this.productGroupId,
                this.productConfigKeyword,
                this.productConfigType,
                this.productConfigStatus,
                this.productConfigPageIndex);
            if (response.status) {
                this.productsConfig = response.products;
                this.productConfigPageIndex = response.pageIndex;
                this.productConfigPageSize = response.pageSize;
                this.productConfigTotalRow = response.totalRow;
            }
            else {
                this.productsConfig = [];
                this.productConfigPageIndex = 0;
                this.productConfigPageSize = 0;
                this.productConfigTotalRow = 0;
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        finally {
            this.onGetProductsConfigStatus = false;
            App.unblockUI();
        }
    }

    async onAdd(productId: string): Promise<void> {
        if (this.onAddStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onAddStatus = true;
        try {
            let response = await this.productGroupService.onAddProduct(this.productGroupId, productId);
            if (response.status) {
                ConfigSetting.ShowSuccess("Add sucess.");
                let warehouses = this.products.filter(p => p.id == productId);
                warehouses.forEach(function (item) {
                    item.isAdd = false;
                })
                this.onGetProductsConfig();
            }
            else {
                ConfigSetting.ShowErrores(response.messages);
            }
        }
        catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onAddStatus = false;
            App.unblockUI();
        }
    }

    async onRemove(productId: string): Promise<void> {
        if (this.onRemoveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onRemoveStatus = true;
        try {
            let response = await this.productGroupService.onRemoveProduct(this.productGroupId, productId);
            if (response.status) {
                ConfigSetting.ShowSuccess("Remove sucess.");
                var warehouses = this.products.filter(p => p.id == productId);
                warehouses.forEach(function (item) {
                    item.isAdd = true;
                })
                this.onGetProductsConfig();
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