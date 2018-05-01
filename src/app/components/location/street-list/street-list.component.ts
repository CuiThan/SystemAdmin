import { StreetAddOrUpdate } from './../../../models/location-add-or-update-model';
import { LocationRequest } from './../../../models/location-request-model';
import { LocationService } from './../../../services/location.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Dictionary } from '../../../models/dictionary';
import { ConfigSetting } from '../../../common/configSetting';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-street-list',
  templateUrl: './street-list.component.html',
  styleUrls: ['./street-list.component.css']
})
export class StreetListComponent implements OnInit {
  @ViewChild('streetForm') form1: any;
  searchParams: LocationRequest;
  streets: StreetAddOrUpdate[];
  rowEdits: Dictionary<boolean>;
  row: Dictionary<boolean>;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  showAddNew = false;
  streetAddNew: StreetAddOrUpdate;
  streetEdit: StreetAddOrUpdate;

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.searchParams = new LocationRequest();
    this.rowEdits = new Dictionary<boolean>();
    this.streetAddNew = new StreetAddOrUpdate();
    this.streetEdit = new StreetAddOrUpdate();
    this.onSearch();
  }

  async onSearch(): Promise<void> {
    try {
      const response = await this.locationService.StreetSearch(this.searchParams);
      this.streets = response.streets as StreetAddOrUpdate[];
      this.totalRow = response.totalRow;
      this.rowEdits = new Dictionary<boolean>();
      this.row = new Dictionary<boolean>();
      for (let i = 0; i < this.streets.length; i++) {
        const street = this.streets[i];
        this.rowEdits.Add(street.id, false);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onAddNew(): Promise<void> {
    try {
      this.showAddNew = !this.showAddNew;
      this.streetAddNew = new StreetAddOrUpdate();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onAddNewCancel(): Promise<void> {
    try {
      this.showAddNew = false;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onSaveAdd(): Promise<void> {
    App.blockUI();
    if (this.form1.valid) {
      try {
        const response = await this.locationService.StreetAdd(this.streetAddNew);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          await this.onSearch();
          await this.onAddNewCancel();
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      } catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
    App.unblockUI();
  }

  async onChange(id: string): Promise<void> {
    this.onAddNewCancel();
    for (let i = 0; i < this.streets.length; i++) {
      if (this.rowEdits.Item(this.streets[i].id)) {
        this.onChangeCancel(this.streets[i].id);
      }
    }
    const config = this.streets.find(x => x.id === id);
    this.streetEdit = JSON.parse(JSON.stringify(config));
    const state = this.rowEdits.Item(id);
    this.rowEdits.Change(id, !state);
  }

  async onChangeCancel(id: string): Promise<void> {
    this.rowEdits.Change(id, false);
    const index = this.streets.findIndex(x => x.id === id);
    this.streets[index] = this.streetEdit;
  }

  async onSaveUpdate(id: string): Promise<void> {
    App.blockUI();
    if (this.form1.valid) {
      try {
        let street: StreetAddOrUpdate = null;
        for (let i = 0; i <= this.streets.length; i++) {
          if (this.streets[i].id === id) {
            street = this.streets[i];
            break;
          }
        }
        const response = await this.locationService.UpdateStreet(street);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          await this.onSearch();
          await this.rowEdits.Change(street.id, false);
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      } catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
    App.unblockUI();
  }

}
