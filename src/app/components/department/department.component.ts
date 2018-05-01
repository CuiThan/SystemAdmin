import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { RoleService } from '../../services/role.service';
import { DepartmentModel } from '../../models/department-model';
import { DepartmentSearchRequest } from '../../models/department-search-request';
import { KeyValueModel } from '../../models/result-model';
import { Dictionary } from '../../models/dictionary';
import { forEach } from '@angular/router/src/utils/collection';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  searchParams: DepartmentSearchRequest;
  statuses: KeyValueModel[];
  departments: DepartmentModel[];
  departmentAdnew: DepartmentModel;
  departmentEdit: DepartmentModel;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  showAddNew = false;
  rowEdits: Dictionary<boolean>;

  @ViewChild('addForm') form1: any;
  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.searchParams = new DepartmentSearchRequest();
    this.searchParams.status = 0;
    this.departments = [];
    this.departmentAdnew = new DepartmentModel();
    this.departmentEdit = new DepartmentModel();
    this.statuses = [];
    this.rowEdits = new Dictionary<boolean>();
    this.onSearch();
  }
  async onSearch(): Promise<void> {
    try {
      let response = await this.roleService.departmentSearch(this.searchParams);
      this.statuses = response.statuses;
      this.departments = response.departments as DepartmentModel[];
      this.totalRow = response.totalRow;
      this.rowEdits = new Dictionary<boolean>();
      for (var i = 0; i < this.departments.length; i++) {
        var department = this.departments[i];
        this.rowEdits.Add(department.id, false);
      }

    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNew(): Promise<void> {
    try {
      this.showAddNew = !this.showAddNew;
      this.departmentAdnew = new DepartmentModel();
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNewCancel(): Promise<void> {
    try {
      this.showAddNew = false;;
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onChange(departmentId: string): Promise<void> {
    this.onAddNewCancel();
    for(let i=0;i<this.departments.length;i++){
      if(this.rowEdits.Item(this.departments[i].id)) {
        this.onChangeCancel(this.departments[i].id);
      }
    }
    let department = this.departments.find(x => x.id == departmentId);
    this.departmentEdit = JSON.parse(JSON.stringify(department));
    var state = this.rowEdits.Item(departmentId);
    this.rowEdits.Change(departmentId, !state);
  }
  async onChangeCancel(departmentId: string): Promise<void> {
    this.rowEdits.Change(departmentId, false);
    let index = this.departments.findIndex(x => x.id == departmentId);
    this.departments[index] = this.departmentEdit;
  }
  async onSave(departmentId: string): Promise<void> {
    App.blockUI();
    if (this.form1.valid) {
      try {
        let department: DepartmentModel = null;
        if (departmentId == "") {
          department = this.departmentAdnew;
        }
        else {
          for (let i = 0; i <= this.departments.length; i++) {
            if (this.departments[i].id == departmentId) {
              department = this.departments[i];
              break;
            }
          }
        }
        if (department == null) {
          ConfigSetting.ShowSuccess("Department not null.");
        }
        else {
          let response = await this.roleService.departmentSave(department);
          if (response.status) {
            ConfigSetting.ShowSuccess("Save sucess.");
            await this.onSearch();
            if (departmentId == "") {
              await this.onAddNewCancel();
            }
            else {
              await this.rowEdits.Change(departmentId, false);
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
