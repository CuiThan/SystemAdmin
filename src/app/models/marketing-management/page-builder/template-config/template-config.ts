import { KeyValueModel } from '../../../result-model'
export class TemplateConfig {
    id: string;
    templateId: string;
    templateName: string;
    templatePositionCode: string;
    componentType: string;
    componentId: string;
    componentTypeName: string;
    pathToView: string;
    status: number;
    statusName: string;
    dataSource: string;
    component: KeyValueModel;
}
