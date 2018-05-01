import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { ProductGroupWarehouseModel } from '../../models/product-group-warehouse-model';
import { ProductGroupService } from '../../services/product-group.service';
import { KeyValueModel } from '../../models/result-model';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
    selector: 'product-group-config-warehouse',
    templateUrl: './product-group-config-warehouse.component.html',
})

export class ProductGroupConfigWarehouseComponent implements OnInit {
    productGroupId: string;
    warehouseVenderId: string;
    warehouseKeyword: string;
    warehouseStatus: number = 0;
    warehouseStatuses: KeyValueModel[];
    warehouseType: number = 0;
    warehouseTypes: KeyValueModel[];
    pageIndex: number = 0;
    pageSize: number = 0;
    totalRow: number = 0;
    warehouseConfigVenderId: string;
    warehouseConfigKeyword: string;
    warehouseConfigStatus: number;
    warehouseConfigType: number;
    warehouseConfigPageIndex: number = 0;
    warehouseConfigPageSize: number = 0;
    warehouseConfigTotalRow: number = 0;
    warehouses: ProductGroupWarehouseModel[];
    warehousesConfig: ProductGroupWarehouseModel[];

    onGetWarehousesStatus: boolean;
    onGetWarehousesConfigStatus: boolean;
    onAddStatus: boolean;
    onRemoveStatus: boolean;
    constructor(private productGroupService: ProductGroupService) { }

    ngOnInit() {

    }
    async onSetProductGroupId(productGroupId: string): Promise<void> {
        this.productGroupId = productGroupId;
    }

    async onGetWarehouses(): Promise<void> {
        if (this.onGetWarehousesStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        try {
            this.onGetWarehousesStatus = true;
            let response = await this.productGroupService.onGetWarehouses(
                this.productGroupId,
                this.warehouseVenderId,
                this.warehouseKeyword,
                this.warehouseType,
                this.warehouseStatus,
                this.pageIndex);
            if (response.status) {
                this.warehouseStatuses = response.statuses;
                this.warehouses = response.warehouses;
                this.pageIndex = response.pageIndex;
                this.pageSize = response.pageSize;
                this.totalRow = response.totalRow;
            }
            else {
                this.warehouses = [];
                this.pageIndex = 0;
                this.pageSize = 0;
                this.totalRow = 0;
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }

        this.onGetWarehousesStatus = false;
        App.unblockUI();
    }

    async onGetWarehousesConfig(): Promise<void> {
        if (this.onGetWarehousesConfigStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetWarehousesConfigStatus = true;
        try {
            let response = await this.productGroupService.onGetWarehousesConfig(
                this.productGroupId,
                this.warehouseConfigVenderId,
                this.warehouseConfigKeyword,
                this.warehouseConfigType,
                this.warehouseConfigStatus,
                this.warehouseConfigPageIndex);
            if (response.status) {
                this.warehousesConfig = response.warehouses;
                this.warehouseConfigPageIndex = response.pageIndex;
                this.warehouseConfigPageSize = response.pageSize;
                this.warehouseConfigTotalRow = response.totalRow;
            }
            else {
                this.warehousesConfig = [];
                this.warehouseConfigPageIndex = 0;
                this.warehouseConfigPageSize = 0;
                this.warehouseConfigTotalRow = 0;
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        this.onGetWarehousesConfigStatus = false;
        App.unblockUI();
    }

    async onAdd(warehouseId: string): Promise<void> {
        if (this.onAddStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onAddStatus = true;
        try {
            let response = await this.productGroupService.onAddWarehouse(this.productGroupId, warehouseId);
            if (response.status) {
                ConfigSetting.ShowSuccess("Add sucess.");
                let warehouses = this.warehouses.filter(p => p.id == warehouseId);
                warehouses.forEach(function (item) {
                    item.isAdd = false;
                })
                this.onGetWarehousesConfig();
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

    async onRemove(warehouseId: string): Promise<void> {
        if (this.onRemoveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onRemoveStatus = true;
        try {
            let response = await this.productGroupService.onRemoveWarehouse(this.productGroupId, warehouseId);
            if (response.status) {
                ConfigSetting.ShowSuccess("Remove sucess.");
                var warehouses = this.warehouses.filter(p => p.id == warehouseId);
                warehouses.forEach(function (item) {
                    item.isAdd = true;
                })
                this.onGetWarehousesConfig();
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