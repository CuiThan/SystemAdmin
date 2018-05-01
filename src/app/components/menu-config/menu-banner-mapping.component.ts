import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ConfigSetting } from '../../common/configSetting';
import { MenuService } from '../../services/menu.service';
import { Banner } from '../../models/marketing-management/banner/banner/banner';
import { Dictionary } from '../../models/dictionary';
declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-menu-banner-mapping',
    templateUrl: './menu-banner-mapping.component.html',
    // styleUrls: ['./menu-config.component.css']
})
export class MenuBannerMappingComponent implements OnInit {
    menuId: string;
    banners: Banner[];
    showAddNew = false;
    bannerAddnew: Banner;
    bannerEdit: Banner;
    formValid: boolean;
    componentType: number;
    onSaveStatus = false;
    onRemoveStatus = false;
    constructor(
        private menuService: MenuService
    ) { }

    ngOnInit() {
        this.formValid = true;
    }
    async getBanners(componentType: number, menuId: string): Promise<void> {
        this.componentType = componentType;
        this.menuId = menuId;
        const response = await this.menuService.getBannersByMenuId(this.menuId);
        this.banners = response.banners;
    }
    async onAddNew(): Promise<void> {
        try {
            this.showAddNew = !this.showAddNew;
            this.bannerAddnew = new Banner();
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
    async onSave(): Promise<void> {
        if (this.onSaveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onSaveStatus = true;
        try {
            this.formValid = !(this.bannerAddnew.id == null || this.bannerAddnew.id === undefined || this.bannerAddnew.id.length <= 0);
            if (this.formValid) {
                const response = await this.menuService.addBanner(this.menuId, this.bannerAddnew.id);
                if (response.status) {
                    this.getBanners(this.componentType, this.menuId);
                    this.onAddNewCancel();
                    ConfigSetting.ShowSuccess('Add success.');
                } else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        this.onSaveStatus = false;
        App.unblockUI();
    }
    async onRemove(bannerId: string): Promise<void> {
        if (this.onRemoveStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onRemoveStatus = true;
        try {
            const response = await this.menuService.removeBanner(this.menuId, bannerId);
            if (response.status) {
                this.getBanners(this.componentType, this.menuId);
                ConfigSetting.ShowSuccess('Remove success.');
            } else {
                ConfigSetting.ShowErrores(response.messages);
            }
        } catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        this.onRemoveStatus = false;
        App.unblockUI();
    }

    async onRegisterComponentSelect2(): Promise<void> {
        const $this = this;
        try {
            ConfigSetting.Select2AjaxRegister(
                '#bannerAutocomplete',
                'TemplateConfig/SearchComponents',
                this.createParametersFun,
                $this,
                'Search components',
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
            componentType: $this.componentType,
            tearm: params.term
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
            results: data.components
        };
    }
    selectComponentEvent(e, $this) {
        const id = e.params.data.id;
        $this.bannerAddnew.id = id;
        $this.formValid = !($this.bannerAddnew.id == null || $this.bannerAddnew.id === undefined || $this.bannerAddnew.id.length <= 0);
    }
}
