import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { ProductAttributeModel } from '../../models/product-attribute-model';
import { ProductGroupService } from '../../services/product-group.service';
import { KeyValueModel } from '../../models/result-model';
import { ProductGroupQuantityModel } from '../../models/product-group-price-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
    selector: 'product-group-config-quantity',
    templateUrl: './product-group-config-quantity.component.html',
})

export class ProductGroupConfigQuantityComponent implements OnInit {
    productGroupId: string;
    quantities: ProductGroupQuantityModel[];
    onGetQuantitiesConfigStatus: boolean;
    onSaveStatus: boolean;
    constructor(private productGroupService: ProductGroupService) { }

    ngOnInit() {

    }
    async onSetProductGroupId(productGroupId: string): Promise<void> {
        this.productGroupId = productGroupId;
    }
    async onGetQuantitysConfig(): Promise<void> {
        if (this.onGetQuantitiesConfigStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetQuantitiesConfigStatus = true;
        try {
            let response = await this.productGroupService.onGetQuantities(this.productGroupId);
            if (response.status) {
                this.quantities = response.quantities;
            }
            else {
                this.quantities = [];
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        this.onGetQuantitiesConfigStatus = false;
        App.unblockUI();
    }
    async onAddNew(): Promise<void> {
        let newItem: ProductGroupQuantityModel = {
            minQuantity: -1,
            maxQuantity: -1
        }
        this.quantities.push(newItem);
    }
    async onRemove(index: number): Promise<void> {
        this.quantities.splice(index, 1);
    }
    async onSave() {
        var valid: boolean = true;
        for (let i = 0; i < this.quantities.length; i++) {
            valid = this.quantities[i].maxQuantity >= this.quantities[i].minQuantity;
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
                let response = await this.productGroupService.onChangeQuantities(this.productGroupId, this.quantities)
                if (response.status) {
                    ConfigSetting.ShowSuccess("Save sucess.");
                    $("#productgroup-quantity").modal('hide');
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