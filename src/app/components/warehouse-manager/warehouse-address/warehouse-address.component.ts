import { Component, OnInit, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { LocationComponent } from '../../location/location.component';
import { LocationRequest } from '../../../models/location-request-model';
import { LocationResponse } from '../../../models/location-response-model';
import { LocationService } from '../../../services/location.service';
import { LocationUpdateRequest } from '../../../models/location-add-or-update-model';
import { WarehouseAddOrChangeComponent } from '../warehouse-add-or-change/warehouse-add-or-change.component';


declare var $: any;
declare var App: any;

@Component({
  selector: 'app-warehouse-address',
  templateUrl: './warehouse-address.component.html',
  styleUrls: ['./warehouse-address.component.css']
})
export class WarehouseAddressComponent implements OnInit {

  progressbarValue: number;
  searchParams: LocationRequest;
  locationResponse: LocationResponse;
  locationUpdateRequest: LocationUpdateRequest;
  constructor(
    private locationService: LocationService,
  ) { }
 
  @Output() updateAddress = new EventEmitter<string>();

  ngOnInit() {
    this.progressbarValue = 0;
    this.locationResponse = new LocationResponse();
    this.searchParams = new LocationRequest();
    this.locationUpdateRequest = new LocationUpdateRequest();
    this.registerMenusTree();


  }



  isValidForm() {
    if (this.progressbarValue >= 75)
      return true;
    else
      return false;
  }

  resetLocation(location: string) {
    switch (location) {
      case "provinceId":
        this.locationUpdateRequest.districtName = '';
        this.locationUpdateRequest.districtId = null;
        this.locationUpdateRequest.wardName = '';
        this.locationUpdateRequest.wardId = null;
        this.locationUpdateRequest.streetName = '';
        break;
      case "district":
        this.locationUpdateRequest.wardName = '';
        this.locationUpdateRequest.wardId = null;
        this.locationUpdateRequest.streetName = '';
        break;
      case "ward":
        this.locationUpdateRequest.streetName = '';
        break;
      case "street":
        break;
      default:
        break;
    }
  }

  async registerMenusTree() {
    let response = await this.locationService.Index(this.searchParams);
    this.locationResponse.ltsProvince = response.ltsProvince;
    let menus = {
      'core': {
        'data': [],
        'check_callback': true
      }
    };
    for (let i = 0; i < this.locationResponse.ltsProvince.length; i++) {
      let item = this.locationResponse.ltsProvince[i];
      let provinceItem = {
        "id": 'provinceId_' + item.id,
        "text": item.provinceName,
        "data": item
      }
      menus.core.data.push(provinceItem);
    }
    try {
      $('#menus').jstree(true).settings.core.data = menus.core.data;
      $('#menus').jstree(true).refresh();
    }
    catch (ex) {
      $('#menus').jstree(menus);
    }

    var $that = this;
    $("#menus").on("select_node.jstree", function (event, node) {
      let typeNode = node.selected[0].split('_')[0];
      let idNode = node.selected[0].split('_')[1];
      switch (typeNode) {
        case "provinceId":
          $that.onGenerateDictrict(idNode);
          $that.onGetProvinceById(idNode);
          $that.progressbarValue = 25;
          $that.resetLocation("provinceId");
          break;
        case "district":
          $that.onGenerateWard(idNode);
          $that.onGetDistrictById(idNode);
          $that.progressbarValue = 50;
          $that.resetLocation("district");
          break;
        case "ward":
          $that.onGenerateStreet(idNode);
          $that.onGetWardById(idNode);
          $that.progressbarValue = 75;
          $that.resetLocation("ward");
          break;
        case "street":
          $that.onGetStreetById(idNode);
          $that.progressbarValue = 100;
          break;
        default:
          break;
      }
    });
  }


  async onGetProvinceById(provinceId: string): Promise<void> {
    this.searchParams.provinceId = provinceId;
    const response = await this.locationService.GetProvinceById(this.searchParams);
    this.locationUpdateRequest.id = response.id;
    this.locationUpdateRequest.provinceName = response.provinceName;
    this.locationUpdateRequest.provinceNameEN = response.provinceNameEN;
    this.locationUpdateRequest.typeLocation = 1;
  }

  async onGenerateDictrict(provinceId: string) {
    this.searchParams.provinceId = provinceId;
    let response = await this.locationService.DistrictGetByProvinceId(this.searchParams);
    let data = response.ltsDictrics;
    for (let i = 0; i < data.length; i++) {
      $('#menus').jstree('create_node', $('#provinceId_' + provinceId), { 'id': 'district_' + data[i].id, 'text': data[i].districName }, 'last', false, false);
    }
    var obj = $('#menus').jstree(true).get_node('#provinceId_' + provinceId);
    $('#menus').jstree(true).open_node(obj);
    this.locationResponse.ltsDistricts = data;
  }

  async onGenerateWard(districId: string) {
    this.searchParams.districId = districId;
    let response = await this.locationService.GetWardByDistrictId(this.searchParams);
    let data = response.ltsWard;
    for (let i = 0; i < data.length; i++) {
      $('#menus').jstree('create_node', $('#district_' + districId), { 'id': 'ward_' + data[i].id, 'text': data[i].wardName }, 'last', false, false);
    }
    var obj = $('#menus').jstree(true).get_node('#district_' + districId);
    $('#menus').jstree(true).open_node(obj);
  }

  async onGenerateStreet(wardId: string) {
    this.searchParams.wardId = wardId;
    let response = await this.locationService.GetStreetByWardId(this.searchParams);
    let data = response.ltsStreet;
    for (let i = 0; i < data.length; i++) {
      $('#menus').jstree('create_node', $('#ward_' + wardId), { 'id': 'street_' + data[i].id, 'text': data[i].streetName }, 'last', false, false);
    }
    var obj = $('#menus').jstree(true).get_node('#ward_' + wardId);
    $('#menus').jstree(true).open_node(obj);
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
    this.locationUpdateRequest.typeLocation = 2;
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
    this.locationUpdateRequest.typeLocation = 3;
  }

  async onGetStreetById(streetId: string): Promise<void> {
    this.searchParams.streetId = streetId;
    const response = await this.locationService.GetStreetById(this.searchParams);
    this.locationUpdateRequest.id = response.id;
    this.locationUpdateRequest.streetName = response.streetName;
    this.locationUpdateRequest.streetNameEN = response.streetNameEN;
    this.locationUpdateRequest.typeLocation = 4;
  }

  onSaveAddress(){
    

    $('#warehouse-address-add-or-change').modal('hide');
    this.updateAddress.next('onUpdateAddress');
   

  }

}
