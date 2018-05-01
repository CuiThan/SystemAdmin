import { ResultModel, KeyValueModel, BaseModel } from './result-model';
export class CustomerSearchRequest {
    code: string;
    email: string;
    mobile: string;
    fullName: string;
    status: number;
    pageIndex: number;
    pageSize: number;
}