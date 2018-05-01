import { ActionDefineKeyValuePairModel } from './action-define-key-value-pair-model';
import { BaseResponseModel } from './base-response-model';
export class ActionDefineSearchResponseModel extends BaseResponseModel {
    actionDefines: ActionDefineKeyValuePairModel[];
    totalRow: number;
    pageIndex: number;
    pageSize: number;

}
