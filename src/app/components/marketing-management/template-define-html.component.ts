import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { TemplateDefineModel } from '../../models/marketing-management/template-define-model';
import { ConfigSetting } from '../../common/configSetting';
import { KeyValueModel } from '../../models/result-model';
import { TemplateDefineService } from '../../services/marketing-management/template-define.service';

declare var jquery: any;
declare var $: any;
declare var App: any;
@Component({
    selector: 'app-template-define-html',
    templateUrl: './template-define-html.component.html',
})
export class TemplateDefineHtmlComponent implements OnInit {
    id: string;
    templateDefine: TemplateDefineModel;
    onGetsStatus: boolean;
    onChangeHtmlStatus: boolean;
    constructor(private templateDefineService: TemplateDefineService) { }
    ngOnInit() {
        this.templateDefine = new TemplateDefineModel();
    }
    async onGet(): Promise<void> {
        if (this.onGetsStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetsStatus = true;
        try {
            const response = await this.templateDefineService.Get(this.id);
            if (response.status) {
                this.templateDefine = response.templateDefine as TemplateDefineModel;
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
    async onChangeHtml(): Promise<void> {
        if (this.onChangeHtmlStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onChangeHtmlStatus = true;
        try {
            const response = await this.templateDefineService.changeHtml(this.templateDefine.id, this.templateDefine.jsUrlsString, this.templateDefine.cssUrlsString, this.templateDefine.html);
            if (response.status) {
                ConfigSetting.ShowSuccess('Save sucess.');
                $('#template-define-html').modal('hide');
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onChangeHtmlStatus = false;
            App.unblockUI();
        }
    }

}
