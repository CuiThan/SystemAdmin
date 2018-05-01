import { ResultModel, KeyValueModel, BaseModel } from '../../../result-model';
export class TemplateSearchRequest {
    code: string;
    templateName: string;
    status: number;
    pageType: number;
    pageParameters: string;
    pageIndex: number;
    pageSize: number;
}
