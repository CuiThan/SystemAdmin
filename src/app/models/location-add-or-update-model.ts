import { ResultModel, KeyValueModel, BaseModel } from './result-model';

export class LocationUpdateRequest {
    id: number;
    provinceName: string;
    provinceNameEN: string;
    districtName: string;
    districtNameEN: string;
    provinceId: number;
    wardName: string;
    wardNameEN: string;
    districtId: number;
    streetName: string;
    streetNameEN: string;
    wardId: number;
    prefix: string;
    shortName: string;
    typeLocation: number;
    wards: StreetViewModel[];
}

export class LocationAddRequest {
    provinceName: string;
    provinceNameEN: string;
    districtName: string;
    districtNameEN: string;
    provinceId: number;
    wardName: string;
    wardNameEN: string;
    districtId: number;
    streetName: string;
    streetNameEN: string;
    wardId: number;
    prefix: string;
    shortName: string;
    streetIds: string[];
}

export class StreetViewModel {
    id: string;
    provinceName: string;
    districtName: string;
    wardName: string;
    wardId: string;
}

export class StreetAddOrUpdate {
    id: string;
    streetName: string;
    streetNameEN: string;
}
