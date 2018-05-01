import { Component, OnInit, ViewChild } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { TemplateDefineModel } from '../../models/marketing-management/template-define-model';
import { ConfigSetting } from '../../common/configSetting';
import { KeyValueModel } from '../../models/result-model';
import { TemplateDefineService } from '../../services/marketing-management/template-define.service';
import { TemplateDefineHtmlComponent } from '../../components/marketing-management/template-define-html.component';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
    selector: 'app-template-define',
    templateUrl: './template-define.component.html',
})
export class TemplateDefineComponent implements OnInit {
    @ViewChild(TemplateDefineHtmlComponent) htmlChange: TemplateDefineHtmlComponent;
    nameParam: string;
    statusParam = 0;
    statuses: KeyValueModel[];
    showAddNew = false;
    rowEdits: Dictionary<boolean>;
    templateDefineAddNew: TemplateDefineModel;
    templateDefineEditing: TemplateDefineModel;
    formValid = true;
    templateDefines: TemplateDefineModel[];
    pageIndex = 0;
    totalRow = 0;
    onGetsStatus = false;
    onGetStatus = false;
    onSaveStatus = false;
    constructor(private templateDefineService: TemplateDefineService) { }

    ngOnInit() {
        this.templateDefineAddNew = new TemplateDefineModel();
        this.onGets();
    }

    async onAddNew(): Promise<void> {
        try {
            for (let i = 0; i < this.templateDefines.length; i++) {
                if (this.rowEdits.Item(this.templateDefines[i].id)) {
                    this.onChangeCancel(this.templateDefines[i].id);
                    break;
                }
            }
            this.templateDefineAddNew = await this.onGet('');
            this.showAddNew = !this.showAddNew;
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }

    async onAddNewCancel(): Promise<void> {
        try {
            this.showAddNew = false;
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }

    async onChange(id: string): Promise<void> {
        this.onAddNewCancel();
        for (let i = 0; i < this.templateDefines.length; i++) {
            if (this.rowEdits.Item(this.templateDefines[i].id)) {
                this.onChangeCancel(this.templateDefines[i].id);
            }
        }
        let templateDefine = this.templateDefines.find(x => x.id === id);
        templateDefine = await this.onGet(id);
        this.templateDefineEditing = JSON.parse(JSON.stringify(templateDefine));
        const state = this.rowEdits.Item(id);
        this.rowEdits.Change(id, !state);
    }

    async onChangeCancel(id: string): Promise<void> {
        this.rowEdits.Change(id, false);
        const index = this.templateDefines.findIndex(x => x.id === id);
        this.templateDefines[index] = this.templateDefineEditing;
    }

    async onGets(): Promise<void> {
        if (this.onGetsStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetsStatus = true;
        try {
            const response = await this.templateDefineService.Gets(this.nameParam, this.statusParam, this.pageIndex);
            if (response.status) {
                this.templateDefines = response.templateDefines as TemplateDefineModel[];
                this.statuses = response.statuses;
                this.rowEdits = new Dictionary<boolean>();
                for (let i = 0; i < this.templateDefines.length; i++) {
                    const templateDefine = this.templateDefines[i];
                    this.rowEdits.Add(templateDefine.id, false);
                }
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onGetsStatus = false;
            App.unblockUI();
        }
    }

    async onGet(id): Promise<TemplateDefineModel> {
        let templateDefine = null;
        if (this.onGetStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetStatus = true;
        try {
            const response = await this.templateDefineService.Get(id);
            if (response.status) {
                this.statuses = response.statuses;
                templateDefine = response.templateDefine as TemplateDefineModel;
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onGetStatus = false;
            App.unblockUI();
        }
        return templateDefine;
    }

    async onSave(form: any, templateDefine: TemplateDefineModel, isAdd: boolean): Promise<void> {
        if (this.onSaveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onSaveStatus = true;
        try {
            this.formValid = form.valid;
            if (this.formValid) {
                let response;
                if (isAdd) {
                    response = await this.templateDefineService.add(templateDefine.name, templateDefine.status);
                } else {
                    response = await this.templateDefineService.change(templateDefine.id, templateDefine.name, templateDefine.status);
                }
                if (response.status) {
                    ConfigSetting.ShowSuccess('Save sucess.');
                    await this.onGets();
                    if (isAdd) {
                        await this.onAddNewCancel();
                    } else {
                        await this.rowEdits.Change(templateDefine.id, false);
                    }
                } else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }

        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onSaveStatus = false;
            App.unblockUI();
        }
    }

    async onShowTemplateDefineHtml(id: string): Promise<void> {
        $('#template-define-html').modal('show');
        this.htmlChange.id = id;
        this.htmlChange.onGet();
    }
}
