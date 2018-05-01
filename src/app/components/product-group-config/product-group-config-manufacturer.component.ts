import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { ManufacturerModel } from '../../models/manufacturer-manager-model';
import { ProductGroupService } from '../../services/product-group.service';
import { KeyValueModel } from '../../models/result-model';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
    selector: 'product-group-config-manufacturer',
    templateUrl: './product-group-config-manufacturer.component.html',
})

export class ProductGroupConfigManufacturerComponent implements OnInit {
    productGroupId: string;
    manufacturerParam: string;
    manufacturerStatus: number = 0;
    manufacturerStatuses: KeyValueModel[];
    pageIndex: number = 0;
    pageSize: number = 0;
    totalRow: number = 0;

    manufacturerConfigParam: string;
    manufacturerConfigStatus: number;
    manufacturerConfigPageIndex: number = 0;
    manufacturerConfigPageSize: number = 0;
    manufacturerConfigTotalRow: number = 0;

    manufacturers: ManufacturerModel[];
    manufacturersConfig: ManufacturerModel[];
    onAddStatus: boolean;
    onGetManufacturersStatus: boolean;
    onGetManufacturersConfigStatus: boolean;
    onRemoveStatus: boolean;

    constructor(private productGroupService: ProductGroupService) { }

    ngOnInit() {

    }
    async onSetProductGroupId(productGroupId: string): Promise<void> {
        this.productGroupId = productGroupId;
    }
    async onGetManufacturers(): Promise<void> {
        if (this.onGetManufacturersStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        try {
            this.onGetManufacturersStatus = true;
            let response = await this.productGroupService.onGetManufacturers(this.manufacturerParam, this.manufacturerStatus, this.pageIndex);
            if (response.status) {
                this.manufacturerStatuses = response.statuses;
                this.manufacturers = response.manufacturers;
                this.pageIndex = response.pageIndex;
                this.pageSize = response.pageSize;
                this.totalRow = response.totalRow;
            }
            else {
                this.manufacturers = [];
                this.pageIndex = 0;
                this.pageSize = 0;
                this.totalRow = 0;
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }

        this.onGetManufacturersStatus = false;
        App.unblockUI();
    }

    async onGetManufacturersConfig(): Promise<void> {
        if (this.onGetManufacturersConfigStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetManufacturersConfigStatus = true;
        try {
            let response = await this.productGroupService.onGetManufacturersConfig(this.productGroupId, this.manufacturerConfigParam,
                this.manufacturerConfigStatus, this.manufacturerConfigPageIndex);
            if (response.status) {
                this.manufacturersConfig = response.manufacturers;
                this.manufacturerConfigPageIndex = response.pageIndex;
                this.manufacturerConfigPageSize = response.pageSize;
                this.manufacturerConfigTotalRow = response.totalRow;
            }
            else {
                this.manufacturersConfig = [];
                this.manufacturerConfigPageIndex = 0;
                this.manufacturerConfigPageSize = 0;
                this.manufacturerConfigTotalRow = 0;
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        this.onGetManufacturersConfigStatus = false;
        App.unblockUI();
    }

    async onAdd(manufacturerId: string): Promise<void> {
        if (this.onAddStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onAddStatus = true;
        try {
            let response = await this.productGroupService.onAddManufacturer(this.productGroupId, manufacturerId);
            if (response.status) {
                ConfigSetting.ShowSuccess("Add sucess.");
                this.onGetManufacturersConfig();
            }
            else {
                ConfigSetting.ShowErrores(response.messages);
            }
        }
        catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        this.onAddStatus = false;
        App.unblockUI();
    }

    async onRemove(manufacturerId: string): Promise<void> {
        if (this.onRemoveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onRemoveStatus = true;

        try {
            let response = await this.productGroupService.onRemoveManufacturer(this.productGroupId, manufacturerId);
            if (response.status) {
                ConfigSetting.ShowSuccess("Remove sucess.");
                this.onGetManufacturersConfig();
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