import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';
import { ProductGroupModel } from '../models/product-group-model';
import { ProductGroupPriceModel, ProductGroupQuantityModel } from '../models/product-group-price-model';

@Injectable()
export class ProductGroupService {
    constructor(private httpClient: HttpClientService) { }

    async onGets(name: string, status: number, pageIndex: number, pageSize: number): Promise<any> {
        let request = {
            name, status, pageIndex, pageSize
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGets, request);
        let result = response.json() as any;
        return result;
    }
    async onGet(id: string): Promise<any> {
        let request = {
            id
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGet, request);
        let result = response.json() as any;
        return result;
    }
    async onSave(model: ProductGroupModel): Promise<any> {
        let request = model;
        let url = "";
        if (request.id == null || request.id == undefined || request.id.length <= 0) {
            url = ConfigSetting.UrlProductGroupAdd;
        }
        else {
            url = ConfigSetting.UrlProductGroupChange;
        }
        let response = await this.httpClient.postJsonWithAuthen(url, request);
        let result = response.json() as any;
        return result;
    }
    async onGetCategories(productGroupId: string): Promise<any> {
        let request = {
            productGroupId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetCategories, request);
        let result = response.json() as any;
        return result;
    }
    async onChangeCategories(productGroupId: string, categoryIds: string[]): Promise<any> {
        let request = {
            productGroupId,
            categoryIds
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupChangeCategories, request);
        let result = response.json() as any;
        return result;
    }
    async onGetVendors(keyword: string, status: number, pageIndex: number): Promise<any> {
        let request = {
            keyword, status, pageIndex, PageSize: 30
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetVendors, request);
        let result = response.json() as any;
        return result;
    }
    async onGetVendorsConfig(productGroupId: string, keyword: string, status: number, pageIndex: number): Promise<any> {
        let request = {
            productGroupId,
            keyword
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetVendorsConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onAddVendors(productGroupId: string, vendorId: string): Promise<any> {
        let request = {
            productGroupId,
            vendorId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupAddVendor, request);
        let result = response.json() as any;
        return result;
    }
    async onRemoveVendors(productGroupId: string, vendorId: string): Promise<any> {
        let request = {
            productGroupId,
            vendorId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupRemoveVendor, request);
        let result = response.json() as any;
        return result;
    }
    async onGetAttributeConfig(productGroupId: string, attributeId: string): Promise<any> {
        let request = {
            productGroupId,
            attributeId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetAttributeConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onGetAttributesConfig(productGroupId: string, keyword: string, pageIndex: number): Promise<any> {
        let request = {
            productGroupId,
            keyword,
            pageIndex,
            PageSize: 30
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetAttributesConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onAddAttributes(productGroupId: string, attributeId: string, attributeValueIds: string[]): Promise<any> {
        let request = {
            productGroupId,
            attributeId,
            attributeValueIds,
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupAddAttributes, request);
        let result = response.json() as any;
        return result;
    }
    async onChangeAttributes(productGroupId: string, attributeId: string, attributeValueIds: string[]): Promise<any> {
        let request = {
            productGroupId,
            attributeId,
            attributeValueIds,
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupChangeAttributes, request);
        let result = response.json() as any;
        return result;
    }
    async onRemoveAttributes(productGroupId: string, attributeId: string): Promise<any> {
        let request = {
            productGroupId,
            attributeId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupRemoveAttributes, request);
        let result = response.json() as any;
        return result;
    }
    async onGetPrices(productGroupId: string): Promise<any> {
        let request = {
            productGroupId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetPriceConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onChangePrices(productGroupId: string, prices: ProductGroupPriceModel[]): Promise<any> {
        let request = {
            productGroupId,
            prices
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupChangePriceConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onGetQuantities(productGroupId: string): Promise<any> {
        let request = {
            productGroupId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetQuantityConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onChangeQuantities(productGroupId: string, quantities: ProductGroupQuantityModel[]): Promise<any> {
        let request = {
            productGroupId,
            quantities
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupChangeQuantityConfig, request);
        let result = response.json() as any;
        return result;
    }

    async onGetManufacturers(keyword: string, status: number, pageIndex: number): Promise<any> {
        let request = {
            keyword, status, pageIndex, PageSize: 30
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetManufacturers, request);
        let result = response.json() as any;
        return result;
    }
    async onGetManufacturersConfig(productGroupId: string, keyword: string, status: number, pageIndex: number): Promise<any> {
        let request = {
            productGroupId,
            keyword,
            status,
            pageIndex
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetManufacturersConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onAddManufacturer(productGroupId: string, manufacturerId: string): Promise<any> {
        let request = {
            productGroupId,
            manufacturerId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupAddManufacturer, request);
        let result = response.json() as any;
        return result;
    }
    async onRemoveManufacturer(productGroupId: string, manufacturerId: string): Promise<any> {
        let request = {
            productGroupId,
            manufacturerId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupRemoveManufacturer, request);
        let result = response.json() as any;
        return result;
    }
    async onGetWarehouses(productGroupId: string, venderId: string, keyword: string, type: number, status: number, pageIndex: number): Promise<any> {
        let request = {
            productGroupId,
            venderId,
            keyword,
            status,
            pageIndex,
            PageSize: 30
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetWarehouses, request);
        let result = response.json() as any;
        return result;
    }
    async onGetWarehousesConfig(productGroupId: string, venderId: string, keyword: string, type: number, status: number, pageIndex: number): Promise<any> {
        let request = {
            productGroupId,
            venderId,
            keyword,
            status,
            pageIndex,
            PageSize: 30
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetWarehousesConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onAddWarehouse(productGroupId: string, warehouseId: string): Promise<any> {
        let request = {
            productGroupId,
            warehouseId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupAddWarehouse, request);
        let result = response.json() as any;
        return result;
    }
    async onRemoveWarehouse(productGroupId: string, warehouseId: string): Promise<any> {
        let request = {
            productGroupId,
            warehouseId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupRemoveWarehouse, request);
        let result = response.json() as any;
        return result;
    }

    async onGetProducts(productGroupId: string, keyword: string, type: number, status: number, pageIndex: number): Promise<any> {
        let request = {
            productGroupId,
            keyword,
            status,
            pageIndex,
            PageSize: 30
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetProducts, request);
        let result = response.json() as any;
        return result;
    }
    async onGetProductsConfig(productGroupId: string, keyword: string, type: number, status: number, pageIndex: number): Promise<any> {
        let request = {
            productGroupId,
            keyword,
            status,
            pageIndex,
            PageSize: 30
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupGetProductsConfig, request);
        let result = response.json() as any;
        return result;
    }
    async onAddProduct(productGroupId: string, productId: string): Promise<any> {
        let request = {
            productGroupId,
            productId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupAddProduct, request);
        let result = response.json() as any;
        return result;
    }
    async onRemoveProduct(productGroupId: string, productId: string): Promise<any> {
        let request = {
            productGroupId,
            productId
        }
        let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlProductGroupRemoveProduct, request);
        let result = response.json() as any;
        return result;
    }

}