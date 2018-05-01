import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { LocationRequest } from '../../models/location-request-model';
import { LocationResponse } from '../../models/location-response-model';
import { LocationUpdateRequest } from '../../models/location-add-or-update-model';
import { ConfigSetting } from '../../common/configSetting';
import { ProvinceDetailComponent } from './province-detail/province-detail.component';

declare var $: any;
declare var App: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @ViewChild(ProvinceDetailComponent) provinceDetail: ProvinceDetailComponent;
  typeLocation = 0;
  searchParams: LocationRequest;
  locationResponse: LocationResponse;
  locationUpdateRequest: LocationUpdateRequest;
  showVar = false;

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.locationResponse = new LocationResponse();
    this.searchParams = new LocationRequest();
    this.locationUpdateRequest = new LocationUpdateRequest();
    this.registerMenusTree();
  }

  async registerMenusTree() {
    const response = await this.locationService.Index(this.searchParams);
    this.locationResponse.ltsProvince = response.ltsProvince;
    const menus = {
      'core': {
        'data': [],
        'check_callback': true
      }
    };
    for (let i = 0; i < this.locationResponse.ltsProvince.length; i++) {
      const item = this.locationResponse.ltsProvince[i];
      const provinceItem = {
        'id': 'provinceId_' + item.id,
        'text': item.provinceName,
        'data': item
      };
      menus.core.data.push(provinceItem);
    }
    try {
      $('#menus').jstree(true).settings.core.data = menus.core.data;
      $('#menus').jstree(true).refresh();
    } catch (ex) {
      $('#menus').jstree(menus);
    }

    const $that = this;
    $('#menus').on('select_node.jstree', function (event, node) {
      const typeNode = node.selected[0].split('_')[0];
      const idNode = node.selected[0].split('_')[1];
      switch (typeNode) {
        case 'provinceId':
          $that.onGenerateDictrict(idNode);
          break;
        case 'district':
          $that.onGenerateWard(idNode);
          break;
        case 'ward':
          $that.onGenerateStreet(idNode);
          break;
        case 'street':
          $that.onGetStreetDetail(idNode);
          break;
        default:
          break;
      }
    });
  }

  async onGenerateDictrict(provinceId: string) {
    this.typeLocation = 0;
    this.searchParams.provinceId = provinceId;
    const response = await this.locationService.DistrictGetByProvinceId(this.searchParams);
    const data = response.ltsDictrics;
    for (let i = 0; i < data.length; i++) {
      const checkExits = $('#menus').jstree(true).get_node('#district_' + data[i].id);
      if (checkExits === false) {
        $('#menus').jstree('create_node', $('#provinceId_' + provinceId), { 'id': 'district_' + data[i].id, 'text': data[i].districName }, 'last', false, false);
      }
    }
    const obj = $('#menus').jstree(true).get_node('#provinceId_' + provinceId);
    $('#menus').jstree(true).open_node(obj);
    this.locationResponse.ltsDistricts = data;
    this.typeLocation = 1;
  }

  async onGenerateWard(districId: string) {
    this.typeLocation = 0;
    this.searchParams.districId = districId;
    const response = await this.locationService.GetWardByDistrictId(this.searchParams);
    const data = response.ltsWard;
    for (let i = 0; i < data.length; i++) {
      const checkExits = $('#menus').jstree(true).get_node('#ward_' + data[i].id);
      if (checkExits === false) {
        $('#menus').jstree('create_node', $('#district_' + districId), { 'id': 'ward_' + data[i].id, 'text': data[i].wardName }, 'last', false, false);
      }
    }
    const obj = $('#menus').jstree(true).get_node('#district_' + districId);
    $('#menus').jstree(true).open_node(obj);
    this.typeLocation = 2;
  }

  async onGenerateStreet(wardId: string) {
    this.typeLocation = 0;
    this.searchParams.wardId = wardId;
    const response = await this.locationService.GetStreetByWardId(this.searchParams);
    const data = response.ltsStreet;
    for (let i = 0; i < data.length; i++) {
      const checkExits = $('#menus').jstree(true).get_node('#street_' + data[i].id);
      if (checkExits === false) {
        $('#menus').jstree('create_node', $('#ward_' + wardId), { 'id': 'street_' + data[i].id, 'text': data[i].streetName }, 'last', false, false);
      }
    }
    const obj = $('#menus').jstree(true).get_node('#ward_' + wardId);
    $('#menus').jstree(true).open_node(obj);
    this.typeLocation = 3;
  }

  onGetStreetDetail(streetId: string) {
    this.typeLocation = 0;
    this.searchParams.streetId = streetId;
    this.typeLocation = 4;
  }

  display(show: boolean) {
    this.typeLocation = 0;
    this.showVar = show;
  }
}
