import { ResultModel, KeyValueModel, BaseModel } from './result-model';

export class MenuManagerModel {
    types: KeyValueModel[];
    positions: KeyValueModel[];
    parents: MenuModel[];
    menu: MenuModel;
    languages: KeyValueModel[];

    menus: MenuModel[];
    // 0 = view, 1 = add, 2 change
    formState: number;
}

export class MenuModel extends BaseModel {
    parentId: string;
    name: string;
    type: number;
    objectId: string;
    url: string;
    condition: string;
    positionId: string;
    isPublish: boolean;
    priority: number;
}
