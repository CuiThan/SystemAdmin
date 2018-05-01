import { Injectable } from '@angular/core';
import { ConfigSetting } from '../common/configSetting'
import { HttpClientService } from '../common/http-client.service';

import { DepartmentSearchRequest } from '../models/department-search-request';
import { DepartmentModel } from '../models/department-model';
import { RoleSearchRequestModel } from '../models/role-search-request-model';
import { RoleAddRequestModel } from '../models/role-add-request-model';
import { RoleChangeRequestModel } from '../models/role-change-request-model';
import { RoleModel } from '../models/role-model';
import { ActionDefineSearchRequestModel } from '../models/action-define-search-request-model';
import { PermissionChangeByRoleRequestModel } from '../models/permission-change-by-role-request-model';

@Injectable()
export class RoleService {
  constructor(private httpClient: HttpClientService) { }

  async departmentSearch(request: DepartmentSearchRequest): Promise<any> {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathDepartmentSearch, request);
    let result = response.json() as any;
    return result;
  }

  async departmentGet(id: string): Promise<any> {
    var request = {
      id
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathDepartmentGet, request);
    let result = response.json() as any;
    return result;
  }

  async departmentSave(department: DepartmentModel): Promise<any> {
    var request = department;
    let url = "";
    if (department.id != undefined && department.id != null && department.id != "") {
      url = ConfigSetting.UrlPathDepartmentChange;
    }
    else {
      url = ConfigSetting.UrlPathDepartmentAdd;
    }
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response.json() as any;
    return result;
  }

  async roleSearch(request: RoleSearchRequestModel): Promise<any> {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathRoleSearch, request);
    let result = response.json() as any;
    return result;
  }

  async roleSave(role: RoleModel): Promise<any> {
    var request = role;
    let url = "";
    if (role.id != undefined && role.id != null && role.id != "") {
      url = ConfigSetting.UrlPathRoleChange;
    }
    else {
      url = ConfigSetting.UrlPathRoleAdd;
    }
    let response = await this.httpClient.postJsonWithAuthen(url, request);
    let result = response.json() as any;
    return result;
  }

  async actiondefineSearch(request: ActionDefineSearchRequestModel): Promise<any> {
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathActionDefineSearch, request);
    let result = response.json() as any;
    return result;
  }
  async permissionChangeByRole(roleId: string, actionIdsAdd: string[], actionIdsRemove: string[]): Promise<any> {
    var request = {
      roleId, actionIdsAdd, actionIdsRemove
    };
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathPermissionChangeByRole, request);
    let result = response.json() as any;
    return result;
  }
  async permissionGetAll(): Promise<any> {
    var request = {};
    let response = await this.httpClient.postJsonWithAuthen(ConfigSetting.UrlPathPermissionPermissionGet, request);
    let result = response.json() as any;
    return result;
  }

}
