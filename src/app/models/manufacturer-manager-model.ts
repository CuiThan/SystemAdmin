export class ManufacturerManagerModel {
    pageIndexs: number;
    pageSizes: number;
    manufacturers: ManufacturerModel[];
}

export class ManufacturerModel {
    id: string;
    name: string;
    description: string;
    logo: string;
    status: number;
    statusName: string;
}

export class CategoryManufacturerGetsRequest {
    id: string;
    pageIndex: number;
    pageSize: number;
}
