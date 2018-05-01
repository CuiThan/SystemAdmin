export class ResultModel {
    status: number;
    message: string;
    messages: string[];
}

export class KeyValueModel {
    value: string;
    text: string;
    checked: boolean;
}

export class BaseModel {
    id: string;
    code: string;
    languageId: string;
}

export class JsTreeModel {
    id: string;
    parent: string;
    text: string;
    state: JsTreeModel;
}

export class JstreeStateModel {
    opened: boolean;
    disabled: boolean;
    selected: boolean;
}

export class FileUploadModel {
    fullUrl: string;
    path: string;
    name: string;
    size: number;
    imagePath: string;
}

