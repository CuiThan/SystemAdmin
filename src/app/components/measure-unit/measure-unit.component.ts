import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ConfigSetting } from '../../common/configSetting';
import { KeyValueModel } from '../../models/result-model';
import { Dictionary } from '../../models/dictionary';
import { forEach } from '@angular/router/src/utils/collection';

import { MeasureUnitService } from '../../services/measure-unit.service';
import { MeasureUnitModel } from '../../models/measure-unit-model';
import { MeasureUnitSearchRequestModel } from '../../models/measure-unit-search-request-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-measure-unit',
  templateUrl: './measure-unit.component.html',
  styleUrls: ['./measure-unit.component.css']
})
export class MeasureUnitComponent implements OnInit {

  searchParams: MeasureUnitSearchRequestModel;
  measureUnits: MeasureUnitModel[];
  unitStatuses: KeyValueModel[];
  baseUnits: KeyValueModel[];
  measureAddNew: MeasureUnitModel;
  measureEdit: MeasureUnitModel;
  showAddNew = false;
  rowEdits: Dictionary<boolean>;
  row: Dictionary<boolean>;
  pageIndex: number = 0;
  pageSize = 30;
  totalRow = 0;
  constructor(
    private measureUnitService: MeasureUnitService,
  ) { }

  @ViewChild('measureForm') form1: any;

  ngOnInit() {
    this.searchParams = new MeasureUnitSearchRequestModel();
    this.searchParams.unitStatus = 0;
    this.unitStatuses = [];
    this.baseUnits = [];
    this.measureAddNew = new MeasureUnitModel();
    this.measureEdit = new MeasureUnitModel();
    this.rowEdits = new Dictionary<boolean>();
    this.onSearch();

  }

  async onSearch(): Promise<void> {
    try {      
      let response = await this.measureUnitService.search(this.searchParams);
      this.measureUnits = response.measureUnits as MeasureUnitModel[];
      this.unitStatuses = response.unitStatuses;
      this.baseUnits = response.baseUnits;
      this.totalRow = response.totalRow;
      this.rowEdits = new Dictionary<boolean>();
      this.row = new Dictionary<boolean>();

      for (var i = 0; i < this.measureUnits.length; i++) {
        var measure = this.measureUnits[i];
        this.rowEdits.Add(measure.unitId, false);
      }

    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onAddNew(): Promise<void> {
    try {
      this.showAddNew = !this.showAddNew;

      this.measureAddNew = new MeasureUnitModel();
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
  async onChange(id: string): Promise<void> {
    this.onAddNewCancel();
    for (let i = 0; i < this.measureUnits.length; i++) {
      if (this.rowEdits.Item(this.measureUnits[i].unitId)) {
        this.onChangeCancel(this.measureUnits[i].unitId);
      }
    }
    let measure = this.measureUnits.find(x => x.unitId == id);
    this.measureEdit = JSON.parse(JSON.stringify(measure));
    var state = this.rowEdits.Item(id);
    this.rowEdits.Change(id, !state);
  }
  async onChangeCancel(id: string): Promise<void> {
    this.rowEdits.Change(id, false);
    let index = this.measureUnits.findIndex(x => x.unitId == id);
    this.measureUnits[index] = this.measureEdit;
  }
  async onSave(id: string): Promise<void> {
    App.blockUI();
    if (this.form1.valid) {
      try {
        let measure: MeasureUnitModel = null;
        if (id == "") {
          measure = this.measureAddNew;
        }
        else {
          for (let i = 0; i <= this.measureUnits.length; i++) {
            if (this.measureUnits[i].unitId == id) {
              measure = this.measureUnits[i];
              break;
            }
          }
        }
        if (measure == null) {
          ConfigSetting.ShowSuccess("Measure not null.");
        }
        else {
          let response = await this.measureUnitService.save(measure);
          if (response.status) {
            ConfigSetting.ShowSuccess("Save sucess.");
            await this.onSearch();
            if (id == "") {
              await this.onAddNewCancel();
            }
            else {
              await this.rowEdits.Change(id, false);
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
