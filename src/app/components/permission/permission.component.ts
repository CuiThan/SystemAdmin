import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ConfigSetting } from '../../common/configSetting';
import { RoleService } from '../../services/role.service';
import { ActionDefineSearchRequestModel } from '../../models/action-define-search-request-model';
import { ActionDefineKeyValuePairModel } from '../../models/action-define-key-value-pair-model';
import { ActionDefineViewModel } from '../../models/action-define-view-model';
import { PermissionChangeByRoleRequestModel } from '../../models/permission-change-by-role-request-model';
import { Dictionary } from '../../models/dictionary';

declare var jquery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {
  private roleId: string;
  searchParams: ActionDefineSearchRequestModel;
  actionDefines: ActionDefineKeyValuePairModel[];
  actionDefinesDefault: Dictionary<ActionDefineViewModel[]>;
  actionDefinesChanged: Dictionary<ActionDefineViewModel[]>;
  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {
    this.route.params.subscribe(params => {
      this.roleId = params.roleid;
    });
  }

  ngOnInit() {
    this.searchParams = new ActionDefineSearchRequestModel();
    this.searchParams.roleId=this.roleId;
    this.actionDefinesDefault = new Dictionary<ActionDefineViewModel[]>();
    this.actionDefinesChanged = new Dictionary<ActionDefineViewModel[]>();
    this.onSearch();
  }
  async onSearch(): Promise<void> {
    try {
      let response = await this.roleService.actiondefineSearch(this.searchParams);
      if (response.status) {
        this.actionDefines = response.actionDefines as ActionDefineKeyValuePairModel[];
        this.actionDefinesDefault = new Dictionary<ActionDefineViewModel[]>();
        for (let i = 0; i < this.actionDefines.length; i++) {
          let item = this.actionDefines[i];
          let valueClone = JSON.parse(JSON.stringify(item.value));
          this.actionDefinesDefault.Add(item.key, valueClone);
        }
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async actionOnChange(actionDefinesGroup: ActionDefineKeyValuePairModel): Promise<void> {
    try {
      var items = this.actionDefinesChanged.Item(actionDefinesGroup.key);
      if (items == null || items == undefined) {
        this.actionDefinesChanged.Add(actionDefinesGroup.key, actionDefinesGroup.value);
      }
      else {
        console.log(1);
        var defaultItem = <ActionDefineViewModel[]>this.actionDefinesDefault.Item(actionDefinesGroup.key);
        let itemChangedRemove = false;
        if (defaultItem == null) {
          itemChangedRemove = true;
        }
        else {
          let countItemDefault = 0;
          for (let i = 0; i < defaultItem.length; i++) {
            for (let j = 0; j < actionDefinesGroup.value.length; j++) {
              if (defaultItem[i].id == actionDefinesGroup.value[j].id) {
                if (defaultItem[i].checked == actionDefinesGroup.value[j].checked) {
                  countItemDefault++;
                }
              }
            }
          }
          if (countItemDefault == defaultItem.length) {
            itemChangedRemove = true;
          }
        }
        if (itemChangedRemove) {
          this.actionDefinesChanged.Remove(actionDefinesGroup.key);
        }
        else {
          this.actionDefinesChanged.Change(actionDefinesGroup.key, actionDefinesGroup.value);
        }

      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onSave(departmentId: string): Promise<void> {
    App.blockUI();
    try {
      let roleId = this.roleId;
      let actionIdsAdd: string[] = []
      let actionIdsRemove: string[] = [];
      let itemsGroupChanged = this.actionDefinesChanged.Values();
      for (let i = 0; i < itemsGroupChanged.length; i++) {
        let items = itemsGroupChanged[i];
        for (let j = 0; j < items.length; j++) {
          let item = items[j];
          if (item.checked) {
            actionIdsAdd.push(item.id);
          }
          else {
            actionIdsRemove.push(item.id);
          }
        }
      }
      let response = await this.roleService.permissionChangeByRole(roleId, actionIdsAdd, actionIdsRemove);
      if (response.status) {
        ConfigSetting.ShowSuccess("Save sucess.");
        await this.onSearch();
        this.actionDefinesChanged = new Dictionary<ActionDefineViewModel[]>();
      }
      else {
        ConfigSetting.ShowErrores(response.messages);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
