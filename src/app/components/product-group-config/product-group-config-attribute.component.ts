import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { ProductAttributeModel } from '../../models/product-attribute-model';
import { ProductGroupService } from '../../services/product-group.service';
import { KeyValueModel } from '../../models/result-model';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
    selector: 'product-group-config-attribute',
    templateUrl: './product-group-config-attribute.component.html',
})

export class ProductGroupConfigAttributeComponent implements OnInit {
    productGroupId: string;
    attributesConfig: ProductAttributeModel[];
    onGetAttributesConfigStatus: boolean;
    onGetAttributeConfigStatus: boolean;
    onAddOrChangeSaveStatus: boolean;
    onRemoveStatus: boolean;
    keyword: string;
    pageIndex: number = 0;
    pageSize: number = 0;
    totalRow: number = 0;
    showAddNew: boolean = false;
    rowEdits: Dictionary<boolean>;

    attributeAddnew: ProductAttributeModel;
    attributeEditing: ProductAttributeModel;
    attributeIdCurrentSelected: string = "";
    attributeValueIdsCurrentSelected: string[] = [];

    constructor(private productGroupService: ProductGroupService) { }

    ngOnInit() {

    }
    async onSetProductGroupId(productGroupId: string): Promise<void> {
        this.productGroupId = productGroupId;
    }
    async onGetAttributesConfig(): Promise<void> {
        if (this.onGetAttributesConfigStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetAttributesConfigStatus = true;
        try {
            this.rowEdits = new Dictionary<boolean>();
            let response = await this.productGroupService.onGetAttributesConfig(this.productGroupId, this.keyword, this.pageIndex);
            if (response.status) {
                this.attributesConfig = response.attributes;
                this.pageIndex = response.pageIndex;
                this.pageSize = response.pageSize;
                this.totalRow = response.totalRow;
                for (var i = 0; i < this.attributesConfig.length; i++) {
                    var attribute = this.attributesConfig[i];
                    this.rowEdits.Add(attribute.id, false);
                }
            }
            else {
                this.attributesConfig = [];
                this.pageIndex = 0;
                this.pageSize = 0;
                this.totalRow = 0;
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        this.onGetAttributesConfigStatus = false;
        App.unblockUI();
    }
    async onGetAttributeConfig(attributeId: string): Promise<ProductAttributeModel> {
        if (this.onGetAttributeConfigStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        try {
            this.onGetAttributeConfigStatus = true;
            let response = await this.productGroupService.onGetAttributeConfig(this.productGroupId, attributeId);
            if (response.status) {
                return response.attribute;
            }
            else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        finally {
            this.onGetAttributeConfigStatus = false;
            App.unblockUI();
        }

    }
    async onAddNew(): Promise<void> {
        try {
            this.showAddNew = true;
            this.attributeAddnew = new ProductAttributeModel();
            if (this.attributeIdCurrentSelected != null && this.attributeIdCurrentSelected != undefined && this.attributeIdCurrentSelected.length > 0) {
                this.onChangeCancel(this.attributeIdCurrentSelected);
            }
            setTimeout(() => {
                this.onRegisterComponentSelect2();
            }, 300);
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
    async onChange(attributeId: string): Promise<void> {
        this.onAddNewCancel();
        for (let i = 0; i < this.attributesConfig.length; i++) {
            if (this.rowEdits.Item(this.attributesConfig[i].id)) {
                this.onChangeCancel(this.attributesConfig[i].id);
            }
        }
        let attribute = this.attributesConfig.find(x => x.id == attributeId);
        attribute = await this.onGetAttributeConfig(attributeId);
        this.attributeEditing = JSON.parse(JSON.stringify(attribute));
        var state = this.rowEdits.Item(attributeId);
        this.rowEdits.Change(attributeId, !state);
        this.attributeIdCurrentSelected = attributeId;
        setTimeout(() => {
            this.onRegisterComponentSelect2();
            this.attributeIdCurrentSelected = attributeId;
            this.attributeValueIdsCurrentSelected = attribute.attributeValueIds;
            $('#attributeValueAddnewAutocomplete').val(attribute.attributeValueIds);
            this.onRegisterComponentSelect2AttributeValue();
        }, 300);
    }
    async onChangeCancel(attributeId: string): Promise<void> {
        this.rowEdits.Change(attributeId, false);
        let index = this.attributesConfig.findIndex(x => x.id == attributeId);
        this.attributesConfig[index] = this.attributeEditing;
    }
    async onRegisterComponentSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#attributeAddnewAutocomplete',
                ConfigSetting.UrlProductGroupGetAttributes,
                this.createParametersFun,
                $this,
                'Search Attribute',
                this.processResults,
                this.formatRepo,
                this.formatRepoSelection,
                this.selectComponentEvent
            );
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    createParametersFun(params, $this) {
        const query = {
            keyword: params.term
        };
        return query;
    }
    formatRepo(repo) {
        if (repo.loading) {
            return repo.text;
        }
        let markup = '<div class=\'select2-result-repository clearfix\'>' +
            '<div class=\'select2-result-repository__meta\'>' +
            '<div class=\'select2-result-repository__title\'>' + repo.text + '</div>';
        markup += '</div></div>';
        return markup;
    }
    formatRepoSelection(repo) {
        return repo.text;
    }
    processResults(data, params) {
        return {
            results: data.attributes
        };
    }
    selectComponentEvent(e, $this) {
        const id = e.params.data.id;
        // $this.attributeAddnew.id = id;
        $this.attributeIdCurrentSelected = id;
        $('#attributeValueAddnewAutocomplete').val("");
        //$('#my-select').val('').change();
        $this.onRegisterComponentSelect2AttributeValue();
    }

    async onRegisterComponentSelect2AttributeValue(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#attributeValueAddnewAutocomplete',
                ConfigSetting.UrlProductGroupGetAttributeValues,
                this.createParametersFunAttributeValue,
                $this,
                'Search Attribute',
                this.processResultsAttributeValue,
                this.formatRepo,
                this.formatRepoSelection,
                this.selectComponentEventAttributeValue,
                this.unSelectComponentEventAttributeValue
            );
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }
    createParametersFunAttributeValue(params, $this) {
        const query = {
            attributeId: $this.attributeIdCurrentSelected,
            keyword: params.term
        };
        return query;
    }
    processResultsAttributeValue(data, params) {
        return {
            results: data.attributeValues
        };
    }
    selectComponentEventAttributeValue(e, $this) {
        const id = e.params.data.id;
        $this.attributeValueIdsCurrentSelected = $('#attributeValueAddnewAutocomplete').val();
    }
    unSelectComponentEventAttributeValue(e, $this) {
        const id = e.params.data.id;
        $this.attributeValueIdsCurrentSelected = $('#attributeValueAddnewAutocomplete').val();
        console.log($this.attributeValueIdsCurrentSelected);
    }
    async onAddSave(): Promise<void> {
        if (this.onAddOrChangeSaveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();

        this.onAddOrChangeSaveStatus = true;
        try {
            let valid = this.attributeIdCurrentSelected != null
                && this.attributeIdCurrentSelected != undefined
                && this.attributeIdCurrentSelected.length > 0
                && this.attributeValueIdsCurrentSelected != null
                && this.attributeValueIdsCurrentSelected != undefined
                && this.attributeValueIdsCurrentSelected.length > 0;
            if (valid) {
                let response = await this.productGroupService.onAddAttributes(this.productGroupId, this.attributeIdCurrentSelected, this.attributeValueIdsCurrentSelected);
                if (response.status) {
                    ConfigSetting.ShowSuccess("Save sucess.");
                    this.onAddNewCancel();
                    this.onGetAttributesConfig();
                }
                else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        this.onAddOrChangeSaveStatus = false;
        App.unblockUI();
    }
    async onChangeSave(): Promise<void> {
        if (this.onAddOrChangeSaveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();

        this.onAddOrChangeSaveStatus = true;
        try {
            let valid = this.attributeIdCurrentSelected != null
                && this.attributeIdCurrentSelected != undefined
                && this.attributeIdCurrentSelected.length > 0
                && this.attributeValueIdsCurrentSelected != null
                && this.attributeValueIdsCurrentSelected != undefined
                && this.attributeValueIdsCurrentSelected.length > 0;
            if (valid) {
                let response = await this.productGroupService.onChangeAttributes(this.productGroupId, this.attributeIdCurrentSelected, this.attributeValueIdsCurrentSelected);
                if (response.status) {
                    ConfigSetting.ShowSuccess("Save sucess.");
                    this.onAddNewCancel();
                    this.onGetAttributesConfig();
                }
                else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        finally {
            this.onAddOrChangeSaveStatus = false;
            App.unblockUI();
        }
    }
    async onRemove(attributeId: string): Promise<void> {
        if (this.onRemoveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onRemoveStatus = true;
        try {
            let response = await this.productGroupService.onRemoveAttributes(this.productGroupId, attributeId);
            if (response.status) {
                ConfigSetting.ShowSuccess("Remove sucess.");
                this.onGetAttributesConfig();
            }
            else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (error) {
            ConfigSetting.ShowErrorException(error);
        }
        finally {
            this.onRemoveStatus = false;
            App.unblockUI();
        }
    }

}