import { ResultModel, KeyValueModel, BaseModel } from '../../../result-model';
export class BannerItemSearchRequest {
    id: string;
    bannerItemName: string;
    status: number;        
    bannerId: string;
    isDefault: boolean;
    fromStartDate: string;
    toStartDate: string;
    fromEndDate: string;
    toEndDate: string;
    pageIndex: number;
    pageSize: number;
}
