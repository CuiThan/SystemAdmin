import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationUpdateRequest } from '../../../models/location-add-or-update-model';
import { LocationService } from '../../../services/location.service';
import { ConfigSetting } from '../../../common/configSetting';

declare var App: any;

@Component({
  selector: 'app-province-add',
  templateUrl: './province-add.component.html',
  styleUrls: ['./province-add.component.css']
})
export class ProvinceAddComponent implements OnInit {
  @Output() displayChild = new EventEmitter<boolean>();
  @Output() reloadMenu = new EventEmitter<boolean>();
  locationUpdateRequest: LocationUpdateRequest;
  submited: boolean;

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.locationUpdateRequest = new LocationUpdateRequest();
    this.submited = false;
  }

  cancelAdd() {
    this.displayChild.emit(false);
  }

  async onAdd(form): Promise<void> {
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        const request = this.locationUpdateRequest;
        const response = await this.locationService.AddOrUpdateProvince(request);
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
}
