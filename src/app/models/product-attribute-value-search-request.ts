import { ResultModel, KeyValueModel, BaseModel } from './result-model';
export class ProductAttributeValueSearchRequest {
    attributeValueId: number;
    attributeId: number;
    value: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}
