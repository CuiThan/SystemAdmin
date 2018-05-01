import { ResultModel, KeyValueModel, BaseModel } from './result-model';
export class ProductAttributeValueCrudRequest {
    id:number;
    attributeId:number;
    value:string;
    unitId:number;
    status:number;
    order:number;
}