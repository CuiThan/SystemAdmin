import { LocationAddRequest } from './../../../models/location-add-or-update-model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationUpdateRequest, StreetAddOrUpdate } from '../../../models/location-add-or-update-model';
import { LocationService } from '../../../services/location.service';
import { LocationRequest } from '../../../models/location-request-model';
import { LocationResponse } from '../../../models/location-response-model';
import { ConfigSetting } from '../../../common/configSetting';
// import { AutoCompleteModule } from 'primeng/autocomplete';


declare var App: any;

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {
  @Input() wardId: string;
  @Output() reloadMenu = new EventEmitter<boolean>();
  searchParams: LocationRequest;
  locationResponse: LocationResponse;
  locationUpdateRequest: LocationUpdateRequest;
  locationAddRequest: LocationAddRequest;
  streets: StreetAddOrUpdate[];
  filteredCountriesMultiple: any[];

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.locationResponse = new LocationResponse();
    this.locationUpdateRequest = new LocationUpdateRequest();
    this.locationAddRequest = new LocationAddRequest();
    this.searchParams = new LocationRequest();
    this.onGetWardById(this.wardId);
    this.onGetStreets();
  }

  async onGetWardById(wardId: string): Promise<void> {
    this.searchParams.wardId = wardId;
    const response = await this.locationService.GetWardById(this.searchParams);
    this.locationUpdateRequest.id = response.id;
    this.locationUpdateRequest.wardName = response.wardName;
    this.locationUpdateRequest.wardNameEN = response.wardNameEN;
    this.locationUpdateRequest.prefix = response.prefix;
    this.locationUpdateRequest.shortName = response.shortName;
    this.locationUpdateRequest.provinceId = response.provinceId;
    this.locationUpdateRequest.provinceName = response.provinceName;
    this.locationUpdateRequest.districtId = response.districtId;
    this.locationUpdateRequest.districtName = response.districtName;
    const provinceResponse = await this.locationService.Index(this.searchParams);
    this.locationResponse.ltsProvince = provinceResponse.ltsProvince;
    this.searchParams.provinceId = response.provinceId;
    const districtResponse = await this.locationService.DistrictGetByProvinceId(this.searchParams);
    this.locationResponse.ltsDistricts = districtResponse.ltsDictrics;
  }

  async onGetStreets() {
    const response = await this.locationService.GetStreetByWardId(this.searchParams);
    this.locationResponse.ltsStreet = response.ltsStreet;
  }

  async onWardUpdate(form): Promise<void> {
    App.blockUI();
    try {
      if (form.valid) {
        const request = this.locationUpdateRequest;
        const response = await this.locationService.WardUpdate(request);
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
      this.searchParams.wardId = id;
      this.searchParams.typeLocation = 3;
      const response = await this.locationService.Delete(this.searchParams);
      ConfigSetting.ShowSuccess('Delete sucess.');
      this.reloadMenu.emit();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onChange(provinceId) {
    this.searchParams.provinceId = provinceId;
    const districtResponse = await this.locationService.DistrictGetByProvinceId(this.searchParams);
    this.locationResponse.ltsDistricts = districtResponse.ltsDictrics;
  }

  async onAddStreet(form) {
    App.blockUI();
    const ids: any[] = [];
    for (let i = 0; i < this.streets.length; i++) {
      ids.push(this.streets[i].id);
    }
    this.locationAddRequest.streetIds = ids;
    this.locationAddRequest.wardId = this.locationUpdateRequest.id;
    try {
      const response = await this.locationService.StreetAddByWardId(this.locationAddRequest);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save sucess.');
        form.reset();
        this.reloadMenu.emit();
        this.onGetStreets();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  filterStreetMultiple(event) {
    this.searchParams.streetName = event.query;
    this.locationService.StreetSearch(this.searchParams).then(response => {
      this.filteredCountriesMultiple = this.filterStreet(this.searchParams.streetName, response.streets);
    });
  }

  filterStreet(query, streets: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < streets.length; i++) {
      const item = streets[i];
      if (item.streetName.toLowerCase().indexOf(query.toLowerCase()) > -1 && this.locationResponse.ltsStreet.find(x => x.id === item.id) === undefined) {
        filtered.push(item);
      }
    }
    return filtered;
  }

  async onDeleteStreet(streetId: string): Promise<void> {
    App.blockUI();
    try {
      this.searchParams.streetId = streetId;
      const response = await this.locationService.WardStreetDelete(this.searchParams);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save sucess.');
        this.reloadMenu.emit();
        this.onGetStreets();
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
