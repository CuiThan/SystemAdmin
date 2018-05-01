import { ResultModel, KeyValueModel, BaseModel } from './result-model';
export class ProductAttributeSearchRequest {
    attributeId: number;
    attributename: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}
