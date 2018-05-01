import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationUpdateRequest, LocationAddRequest } from '../../../models/location-add-or-update-model';
import { LocationService } from '../../../services/location.service';
import { LocationRequest } from '../../../models/location-request-model';
import { LocationResponse } from '../../../models/location-response-model';
import { ConfigSetting } from '../../../common/configSetting';

declare var $: any;
declare var App: any;

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  @Input() districtId: string;
  @Output() reloadMenu = new EventEmitter<boolean>();
  searchParams: LocationRequest;
  locationResponse: LocationResponse;
  locationUpdateRequest: LocationUpdateRequest;
  locationAddRequest: LocationAddRequest;
  submited: boolean;

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.locationResponse = new LocationResponse();
    this.locationUpdateRequest = new LocationUpdateRequest();
    this.locationAddRequest = new LocationAddRequest();
    this.searchParams = new LocationRequest();
    this.onGetDistrictById(this.districtId);
    this.submited = false;
  }

  async onGetDistrictById(districId: string): Promise<void> {
    this.searchParams.districId = districId;
    const response = await this.locationService.GetDistrictById(this.searchParams);
    this.locationUpdateRequest.id = response.id;
    this.locationUpdateRequest.districtName = response.districtName;
    this.locationUpdateRequest.districtNameEN = response.districtNameEN;
    this.locationUpdateRequest.provinceId = response.provinceId;
    this.locationUpdateRequest.provinceName = response.provinceName;
    this.locationUpdateRequest.prefix = response.prefix;
    this.locationUpdateRequest.shortName = response.shortName;
    const getProvinceResponse = await this.locationService.Index(this.searchParams);
    this.locationResponse.ltsProvince = getProvinceResponse.ltsProvince;
  }

  async onDistrictUpdate(form): Promise<void> {
    App.blockUI();
    try {
      if (form.valid) {
        const request = this.locationUpdateRequest;
        const response = await this.locationService.DistrictUpdate(request);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          this.reloadMenu.emit();
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onDelete(id: string, typeLocation: string): Promise<void> {
    App.blockUI();
    try {
      this.searchParams.districId = id;
      this.searchParams.typeLocation = 2;
      const response = await this.locationService.Delete(this.searchParams);
      ConfigSetting.ShowSuccess('Delete sucess.');
      this.reloadMenu.emit();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onAddWard(form): Promise<void> {
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        this.locationAddRequest.districtId = this.locationUpdateRequest.id;
        const request = this.locationAddRequest;
        const response = await this.locationService.WardAdd(request);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          this.reloadMenu.emit();
          this.submited = false;
          form.controls['WardName'].reset();
          form.controls['WardNameEN'].reset();
          form.controls['Prefix'].reset();
          form.controls['ShortName'].reset();
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  onReset(form) {
    form.controls['WardName'].reset();
    form.controls['WardNameEN'].reset();
    form.controls['Prefix'].reset();
    form.controls['ShortName'].reset();
    this.submited = false;
  }
}
