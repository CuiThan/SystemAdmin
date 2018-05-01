import { ProductAttributeValueModel } from '../models/product-attribute-value-model'
export class ProductAttributeModel {
    id: string;
    name: string;
    status: number;
    createdOnUtc: Date;
    updatedOnUtc: Date;
    createdUserId: string;
    updatedUserId: string;
    attributeValueIds: string[];
    attributeValues: ProductAttributeValueModel[];
}