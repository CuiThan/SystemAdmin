import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationUpdateRequest, LocationAddRequest } from '../../../models/location-add-or-update-model';
import { LocationService } from '../../../services/location.service';
import { LocationRequest } from '../../../models/location-request-model';
import { ConfigSetting } from '../../../common/configSetting';
import { LocationResponse } from '../../../models/location-response-model';

declare var $: any;
declare var App: any;

@Component({
  selector: 'app-province-detail',
  templateUrl: './province-detail.component.html',
  styleUrls: ['./province-detail.component.css']
})
export class ProvinceDetailComponent implements OnInit {
  @Input() provinceId: string;
  @Output() reloadMenu = new EventEmitter<boolean>();
  searchParams: LocationRequest;
  locationUpdateRequest: LocationUpdateRequest;
  locationAddRequest: LocationAddRequest;
  locationResponse: LocationResponse;
  submited: boolean;

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.locationUpdateRequest = new LocationUpdateRequest();
    this.locationAddRequest = new LocationAddRequest();
    this.searchParams = new LocationRequest();
    this.locationResponse = new LocationResponse();
    this.onGetProvinceById(this.provinceId);
    this.submited = false;
  }

  async onGetProvinceById(Id: string): Promise<void> {
    this.searchParams.provinceId = Id;
    const response = await this.locationService.GetProvinceById(this.searchParams);
    this.locationUpdateRequest.id = response.id;
    this.locationUpdateRequest.provinceName = response.provinceName;
    this.locationUpdateRequest.provinceNameEN = response.provinceNameEN;
  }

  async onUpdate(form): Promise<void> {
    App.blockUI();
    try {
      if (form.valid) {
        const request = this.locationUpdateRequest;
        const response = await this.locationService.AddOrUpdateProvince(request);
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

  async onAddDistrict(form): Promise<void> {
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        this.locationAddRequest.provinceId = this.locationUpdateRequest.id;
        const request = this.locationAddRequest;
        const response = await this.locationService.DistrictAdd(request);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          this.reloadMenu.emit();
          this.submited = false;
          form.reset();
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
      this.searchParams.provinceId = id;
      this.searchParams.typeLocation = 1;
      const response = await this.locationService.Delete(this.searchParams);
      ConfigSetting.ShowSuccess('Delete sucess.');
      this.reloadMenu.emit();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  onReset(form) {
    form.controls['DistrictName'].reset();
    form.controls['DistrictNameEN'].reset();
    form.controls['Prefix'].reset();
    form.controls['ShortName'].reset();
    this.submited = false;
  }
}
