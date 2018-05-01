import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationUpdateRequest } from '../../../models/location-add-or-update-model';
import { LocationService } from '../../../services/location.service';
import { LocationRequest } from '../../../models/location-request-model';
import { LocationResponse } from '../../../models/location-response-model';
import { ConfigSetting } from '../../../common/configSetting';

declare var App: any;

@Component({
  selector: 'app-street',
  templateUrl: './street.component.html',
  styleUrls: ['./street.component.css']
})
export class StreetComponent implements OnInit {
  @Input() streetId: string;
  @Output() reloadMenu = new EventEmitter<boolean>();
  searchParams: LocationRequest;
  locationResponse: LocationResponse;
  locationUpdateRequest: LocationUpdateRequest;
  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.locationResponse = new LocationResponse();
    this.locationUpdateRequest = new LocationUpdateRequest();
    this.searchParams = new LocationRequest();
    this.onGetStreetById(this.streetId);
  }

  async onGetStreetById(streetId: string): Promise<void> {
    this.searchParams.streetId = streetId;
    const response = await this.locationService.GetStreetById(this.searchParams);
    this.locationUpdateRequest.id = response.id;
    this.locationUpdateRequest.streetName = response.streetName;
    this.locationUpdateRequest.streetNameEN = response.streetNameEN;
    this.locationUpdateRequest.wards = response.wards;
    this.locationUpdateRequest.typeLocation = 4;
  }

  // async onStreetUpdate(form): Promise<void> {
  //   App.blockUI();
  //   try {
  //     if (form.valid) {
  //       const request = this.locationUpdateRequest;
  //       const response = await this.locationService.UpdateStreet(request);
  //       if (response.status) {
  //         ConfigSetting.ShowSuccess('Save sucess.');
  //         this.reloadMenu.emit();
  //       } else {
  //         ConfigSetting.ShowErrores(response.messages);
  //       }
  //     }
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   App.unblockUI();
  // }

  async onDelete(id: string, typeLocation: string): Promise<void> {
    App.blockUI();
    try {
      this.searchParams.streetId = id;
      this.searchParams.typeLocation = 4;
      const response = await this.locationService.Delete(this.searchParams);
      ConfigSetting.ShowSuccess('Delete sucess.');
      this.reloadMenu.emit();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
