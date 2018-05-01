import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ConfigSetting } from '../../common/configSetting';
import { RoleService } from '../../services/role.service';

import { RoleSearchRequestModel } from '../../models/role-search-request-model';
import { RoleAddRequestModel } from '../../models/role-add-request-model';
import { RoleChangeRequestModel } from '../../models/role-change-request-model';
import { RoleModel } from '../../models/role-model';
import { KeyValueModel } from '../../models/result-model';
import { Dictionary } from '../../models/dictionary';
import { forEach } from '@angular/router/src/utils/collection';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  private departmentId: string;
  private customerId: string;
  searchParams: RoleSearchRequestModel;
  statuses: KeyValueModel[];
  searchParamDepartments: KeyValueModel[];
  roles: RoleModel[];
  showAddNew = false;
  rowEdits: Dictionary<boolean>;
  roleAdnew: RoleModel;
  roleEdit: RoleModel;
  pageIndex: number = 0;
  pageSize = 30;
  totalRow = 0;

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {
    this.route.params.subscribe(params => {
      this.departmentId = params.departmentid
      this.customerId = params.customerid
    });
  }

  @ViewChild('addRole') form1: any;

  ngOnInit() {
    this.searchParams = new RoleSearchRequestModel();
    this.searchParams.status = 0;
    if (this.departmentId != '-') {
      this.searchParams.departmentId = this.departmentId;
    }
    this.rowEdits = new Dictionary<boolean>();
    this.roles = [];
    this.roleAdnew = new RoleModel();
    this.roleEdit = new RoleModel();
    this.roleAdnew.departmentId = this.departmentId;
    this.onSearch();

    $.fn.select2.defaults.set("theme", "bootstrap");
    var placeholder = "Select a State";
    $("#departmentId").select2({
      allowClear: true,
      placeholder: placeholder,
      width: null
    });
    var $searchParams = this.searchParams;
    $('#departmentId').on('select2:select', function (e) {
      var data = e.params.data;
      $searchParams.departmentId = data.id;
    });
    $('#departmentId').on('select2:unselect', function (e) {
      $searchParams.departmentId = "";
    });
  }
  async onAddNew(): Promise<void> {
    try {
      this.showAddNew = !this.showAddNew;
      this.roleAdnew = new RoleModel();
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNewCancel(): Promise<void> {
    try {
      this.showAddNew = false;;
      this.roleAdnew = new RoleModel();
      this.roleAdnew.departmentId = this.departmentId;
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onChange(roleId: string): Promise<void> {
    this.onAddNewCancel();
    for(let i=0;i<this.roles.length;i++){
      if(this.rowEdits.Item(this.roles[i].id)) {
        this.onChangeCancel(this.roles[i].id);
      }
    }
    let role = this.roles.find(x => x.id == roleId);
    this.roleEdit = JSON.parse(JSON.stringify(role));
    var state = this.rowEdits.Item(roleId);
    this.rowEdits.Change(roleId, !state);
  }
  async onChangeCancel(roleId: string): Promise<void> {
    this.rowEdits.Change(roleId, false);
    let index = this.roles.findIndex(x => x.id == roleId);
    this.roles[index] = this.roleEdit;
  }
  async onSearch(): Promise<void> {
    try {
      let response = await this.roleService.roleSearch(this.searchParams);
      this.statuses = response.statuses;
      this.roles = response.roles;
      this.searchParamDepartments = response.departments as KeyValueModel[];
      this.rowEdits = new Dictionary<boolean>();
      for (var i = 0; i < this.roles.length; i++) {
        var role = this.roles[i];
        this.rowEdits.Add(role.id, false);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onSave(roleId: string): Promise<void> {
    App.blockUI();
    if (this.form1.valid) {
      try {
        let role: RoleModel = null;
        if (roleId == "") {
          role = this.roleAdnew;
        }
        else {
          for (let i = 0; i <= this.roles.length; i++) {
            if (this.roles[i].id == roleId) {
              role = this.roles[i];
              break;
            }
          }
        }
        if (role == null) {
          ConfigSetting.ShowSuccess("Role not null.");
        }
        else {
          let response = await this.roleService.roleSave(role);
          if (response.status) {
            ConfigSetting.ShowSuccess("Save sucess.");
            await this.onSearch();
            if (roleId == "") {
              await this.onAddNewCancel();
            }
            else {
              await this.rowEdits.Change(roleId, false);
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
    }
    App.unblockUI();

  }


}


