import { ResultModel, KeyValueModel } from './result-model';
export class ShardingConfigsModel extends ResultModel {
    shardingConfigs: ShardingConfigModel[];
    shardGroups: KeyValueModel[];
    shardGroupSelected: number;
}

export class ShardingConfigModel {
    id: number;
    status: number;
    hostName: string;
    databaseName: string;
    uid: string;
    pwd: string;
    createdDate: Date;
    updatedDate: Date;
    type: number;
    shardGroup: number;
    config: string;
    shardGroupName:string;
    statusName:string;
    typeName:string;
    types: KeyValueModel[];
    shardGroups: KeyValueModel[];
    statuses: KeyValueModel[];

    yearTypeConfig:number;
}
