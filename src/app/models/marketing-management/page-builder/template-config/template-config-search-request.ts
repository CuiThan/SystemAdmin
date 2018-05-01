import { ResultModel, KeyValueModel, BaseModel } from '../../../result-model';
export class TemplateConfigSearchRequest {
    templateId: string;
    componentType : number;
    status: number;        
    pageIndex: number;
    pageSize: number;
}