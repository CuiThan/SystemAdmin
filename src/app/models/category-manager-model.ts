import { ResultModel, KeyValueModel, BaseModel } from './result-model';

export class CategoryManagerModel {
    parents: CategoryModel[];
    category: CategoryModel;
    languages: KeyValueModel[];

    categories: CategoryModel[];
    // 0 = view, 1 = add, 2 change
    formState: number;
}

export class LogoCategoryModel {
    constructor(img: string, logo: number, order: number) {
        this.imageURL = img;
        this.logoType = logo;
        this.displayOrder = order;
    }
    imageURL: string;
    logoType: number;
    displayOrder: number;
}

export class CategoryModel extends BaseModel {
    parentId: string;
    name: string;
    description: string;
    status: number;
    displayOrder: number;
    isPublish: boolean;
    logos: string;
    nameStatus: string;
}

export class CategoryAttrManagerModel {

    attributeType: KeyValueModel[];
    pageIndex: number;
    pageSize: number;
    categoryAttrs: CategoryAttrModel[];
    categoryAttr: CategoryAttrModel;
}

export class CategoryAttrModel {

    isFilter: boolean;
    baseUnitId: number;
    displayOrder: number;
    attributeName: string;
    attributeId: number;
    attributeType: number;
    nameAttributeType: string;
    nameIsFilter: string;
    categoryId: string;
    filterSpan: string;
}

export class CategoryAttrRequest {
    id: string;
    pageIndex: number;
    pageSize: number;
}

export class CategoryManufacturerRequest {
    id: string;
    pageIndex: number;
    pageSize: number;
}

export class AttrCategoryAddRequest {
    attributeId: number;
    categoryId: string;
    attributeType: number;
    displayOrder: number;
    constructor(model: CategoryAttrModel) {
        this.attributeId = model.attributeId;
        this.categoryId = model.categoryId;
        this.displayOrder = model.displayOrder;
        this.attributeType = model.attributeType;
    }
}

export class AttrCategoryChangeRequest {
    attributeId: number;
    categoryId: string;
    attributeType: number;
    displayOrder: number;
    IsFilter: boolean;
    constructor(model: CategoryAttrModel) {
        this.attributeId = model.attributeId;
        this.categoryId = model.categoryId;
        this.displayOrder = model.displayOrder;
        this.IsFilter = model.isFilter;
        this.attributeType = model.attributeType;
    }
}
