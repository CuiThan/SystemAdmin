import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { WarehouseAddOrChangeModel } from '../../../models/warehouse/warehouse-add-or-change-model';
import { KeyValueModel } from '../../../models/result-model';
import { WarehouseService } from '../../../services/warehouse.service';
import { ConfigSetting } from '../../../common/configSetting';
import { WarehouseAddressComponent } from '../warehouse-address/warehouse-address.component';



declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-warehouse-add-or-change',
  templateUrl: './warehouse-add-or-change.component.html',
  styleUrls: ['./warehouse-add-or-change.component.css']
})
export class WarehouseAddOrChangeComponent implements OnInit {

  warehouse: WarehouseAddOrChangeModel;
  types: KeyValueModel[];
  statuses: KeyValueModel[];
  title: string;
  submited: boolean;
  constructor(
    private warehouseService: WarehouseService
  ) { }
  @Output() getWarehouse = new EventEmitter<string>();
  @ViewChild(WarehouseAddressComponent) warehouseAddess: WarehouseAddressComponent;
  @ViewChild('warehouseAddOrChange') form: any;

  ngOnInit() {
    this.warehouse = new WarehouseAddOrChangeModel();
    this.warehouse.id = '';

  }


  async onShowWarehouseAddress(id: string): Promise<void> {
    try {
    
    
      // this.warehouseAddOrChange.warehouse.id = id;
      // console.log("hahah");
      
      // console.log(this.warehouseAddOrChange.warehouse);
      // this.warehouseAddOrChange.onGet();
    
      $('#warehouse-address-add-or-change').modal('show');
      //$("#warehouse-add-or-change").modal('toggle');

    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  onUpdateAddress(){
    this.warehouse.provinceId = this.warehouseAddess.locationUpdateRequest.provinceId;
    this.warehouse.provinceName = this.warehouseAddess.locationUpdateRequest.provinceName
    this.warehouse.districtId = this.warehouseAddess.locationUpdateRequest.districtId;
    this.warehouse.districtName = this.warehouseAddess.locationUpdateRequest.districtName;
    this.warehouse.villageId = this.warehouseAddess.locationUpdateRequest.wardId == null ? 0:this.warehouseAddess.locationUpdateRequest.wardId  ;
    this.warehouse.villageName = this.warehouseAddess.locationUpdateRequest.wardName;
    this.warehouse.roadId = this.warehouseAddess.locationUpdateRequest.id;
    this.warehouse.roadName  = this.warehouseAddess.locationUpdateRequest.streetName;

  }


  async onGet(): Promise<void> {
    
    App.blockUI();
    try {
      if (this.warehouse.id.length == 0)
        this.title = "Add new warehouse";
      else
        this.title = "Edit warehouse";
      let vendorId = this.warehouse.vendorId;
      var response = await this.warehouseService.get(this.warehouse.id);
      this.warehouse = response.warehouse;
      this.warehouse.vendorId = vendorId;
      this.types = response.types;
      this.statuses = response.statuses;

    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }


  async onAddOrChange(form): Promise<void> {
    App.blockUI();
    this.submited = true;
    try {
      if (form.valid) {
        let requestModel = this.warehouse;
        let response = null;
        if(this.warehouse.id !=  null)
         response = await this.warehouseService.change(requestModel);
        else
          response = await this.warehouseService.add(requestModel);
        if (response.status) {
          $('#warehouse-add-or-change').modal('hide');
          ConfigSetting.ShowSuccess("Save sucess.");
          this.getWarehouse.next('getWarehouse');
        }
        else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    
    App.unblockUI();
  }

}
