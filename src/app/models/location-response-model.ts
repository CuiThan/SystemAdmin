export class LocationResponse {
    ltsProvince: ProvinceResponse[];
    ltsDistricts: DistrictResponse[];
    ltsStreet: StreetResponse[];
}

export class ProvinceResponse {
    provinceName: string;
    id: string;
}

export class DistrictResponse {
    districName: string;
    id: string;
}

export class StreetResponse {
    streetName: string;
    streetNameEN: string;
    id: string;
}
