import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { ProductAttributeModel } from '../../models/product-attribute-model';
import { ProductGroupService } from '../../services/product-group.service';
import { KeyValueModel } from '../../models/result-model';
import { ProductGroupPriceModel } from '../../models/product-group-price-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
    selector: 'product-group-config-price',
    templateUrl: './product-group-config-price.component.html',
})

export class ProductGroupConfigPriceComponent implements OnInit {
    productGroupId: string;
    prices: ProductGroupPriceModel[];
    onGetPricesConfigStatus: boolean;
    onSaveStatus: boolean;
    constructor(private productGroupService: ProductGroupService) { }

    ngOnInit() {

    }
    async onSetProductGroupId(productGroupId: string): Promise<void> {
        this.productGroupId = productGroupId;
    }
    async onGetPricesConfig(): Promise<void> {
        if (this.onGetPricesConfigStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetPricesConfigStatus = true;
        try {
            let response = await this.productGroupService.onGetPrices(this.productGroupId);
            if (response.status) {
                this.prices = response.prices;
            }
            else {
                this.prices = [];
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        this.onGetPricesConfigStatus = false;
        App.unblockUI();
    }
    async onAddNew(): Promise<void> {
        let newItem: ProductGroupPriceModel = {
            minPrice: -1,
            maxPrice: -1
        }
        this.prices.push(newItem);
    }
    async onRemove(index: number): Promise<void> {
        this.prices.splice(index, 1);
    }
    async onSave() {
        var valid: boolean = true;
        for (let i = 0; i < this.prices.length; i++) {
            valid = this.prices[i].maxPrice >= this.prices[i].minPrice;
            if (!valid) {
                break
            }
        }
        if (this.onSaveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onSaveStatus = true;
        try {
            if (valid) {
                let response = await this.productGroupService.onChangePrices(this.productGroupId, this.prices)
                if (response.status) {
                    ConfigSetting.ShowSuccess("Save sucess.");
                    $("#productgroup-price").modal('hide');
                }
                else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }

        }
        catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onSaveStatus = false;
            App.unblockUI();
        }

    }
}