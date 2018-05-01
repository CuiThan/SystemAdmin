import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { MenuPositionModel } from '../../models/menu-position-model';
import { ConfigSetting } from '../../common/configSetting';
import { KeyValueModel } from '../../models/result-model';
import { MenuService } from '../../services/menu.service';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
    selector: 'app-menu-position',
    templateUrl: './menu-position.component.html',
})
export class MenuPositionComponent implements OnInit {
    keyword: string;
    statusParam: number = 0;
    statuses: KeyValueModel[];
    showAddNew: boolean = false;
    rowEdits: Dictionary<boolean>;
    menuPositionAddNew: MenuPositionModel;
    menuPositionEditing: MenuPositionModel;
    formValid: boolean = true;
    menuPositions: MenuPositionModel[]
    onGetsStatus: boolean = false;
    onGetStatus: boolean = false;
    onSaveStatus: boolean = false;
    constructor(private menuService: MenuService) { }

    ngOnInit() {
        this.menuPositionAddNew = new MenuPositionModel();
        this.onGets();
    }

    async onAddNew(): Promise<void> {
        try {
            for (let i = 0; i < this.menuPositions.length; i++) {
                if (this.rowEdits.Item(this.menuPositions[i].id)) {
                    this.onChangeCancel(this.menuPositions[i].id);
                    break;
                }
            }
            this.menuPositionAddNew = await this.onGet("");
            this.showAddNew = !this.showAddNew;
        }
        catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }

    async onAddNewCancel(): Promise<void> {
        try {
            this.showAddNew = false;
        }
        catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
    }

    async onChange(id: string): Promise<void> {
        this.onAddNewCancel();
        for (let i = 0; i < this.menuPositions.length; i++) {
            if (this.rowEdits.Item(this.menuPositions[i].id)) {
                this.onChangeCancel(this.menuPositions[i].id);
            }
        }
        let menuPosition = this.menuPositions.find(x => x.id == id);
        menuPosition = await this.onGet(id);
        this.menuPositionEditing = JSON.parse(JSON.stringify(menuPosition));
        var state = this.rowEdits.Item(id);
        this.rowEdits.Change(id, !state);
    }

    async onChangeCancel(id: string): Promise<void> {
        this.rowEdits.Change(id, false);
        let index = this.menuPositions.findIndex(x => x.id == id);
        this.menuPositions[index] = this.menuPositionEditing;
    }

    async onGets(): Promise<void> {
        if (this.onGetsStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetsStatus = true;
        try {
            let response = await this.menuService.getMenuPositions(this.keyword, this.statusParam)
            if (response.status) {
                this.menuPositions = response.menuPositions as MenuPositionModel[];
                this.statuses = response.statuses;
                this.rowEdits = new Dictionary<boolean>();
                for (var i = 0; i < this.menuPositions.length; i++) {
                    var menuPosition = this.menuPositions[i];
                    this.rowEdits.Add(menuPosition.id, false);
                }
            }
            else {
                ConfigSetting.ShowErrores(response.messages);
            }
        }
        catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onGetsStatus = false;
            App.unblockUI();
        }
    }

    async onGet(id): Promise<MenuPositionModel> {
        let menuPosition = null;
        if (this.onGetStatus) {
            ConfigSetting.ShowWaiting();
            return;
        }
        App.blockUI();
        this.onGetStatus = true;
        try {
            let response = await this.menuService.getMenuPosition(id);
            if (response.status) {
                this.statuses = response.statuses;
                menuPosition = response.menuPosition as MenuPositionModel;
            }
            else {
                ConfigSetting.ShowErrores(response.messages);
            }
        }
        catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onGetStatus = false;
            App.unblockUI();
        }
        return menuPosition;
    }

    async onSave(form: any, menuPosition: MenuPositionModel, isAdd: boolean): Promise<void> {
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
                    response = await this.menuService.addMenuPosition(menuPosition.name, menuPosition.status);
                }
                else {
                    response = await this.menuService.changeMenuPosition(menuPosition.id, menuPosition.name, menuPosition.status);
                }
                if (response.status) {
                    ConfigSetting.ShowSuccess("Save sucess.");
                    await this.onGets();
                    if (isAdd) {
                        await this.onAddNewCancel();
                    }
                    else {
                        await this.rowEdits.Change(menuPosition.id, false);
                    }
                }
                else {
                    ConfigSetting.ShowErrores(response.messages);
                }
            }

        }
        catch (ex) {
            ConfigSetting.ShowErrorException(ex);
        }
        finally {
            this.onSaveStatus = false;
            App.unblockUI();
        }
    }

}
