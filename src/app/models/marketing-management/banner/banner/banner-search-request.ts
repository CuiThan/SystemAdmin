import { ResultModel, KeyValueModel, BaseModel } from '../../../result-model';
export class BannerSearchRequest {
    id: string;
    bannerName: string;
    status: number;        
    pageIndex: number;
    pageSize: number;
}
