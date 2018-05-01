import { Component, OnInit, ViewChild } from '@angular/core';
import { WarehouseService } from '../../../services/warehouse.service';
import { WarehouseSearchRequest } from '../../../models/warehouse/warehouse-search-request';
import { ConfigSetting } from '../../../common/configSetting';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { KeyValueModel } from '../../../models/result-model';
import { WarehouseModel } from '../../../models/warehouse/warehouse-model';
import { WarehouseAddOrChangeComponent } from '../warehouse-add-or-change/warehouse-add-or-change.component';
import { WarehouseAddOrChangeModel } from '../../../models/warehouse/warehouse-add-or-change-model';


declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  @ViewChild(WarehouseAddOrChangeComponent) warehouseAddOrChange: WarehouseAddOrChangeComponent;

  id:string;
  searchParams: WarehouseSearchRequest;
  types: KeyValueModel[];
  statuses: KeyValueModel[];
  warehouses:WarehouseModel[];

  
  constructor(
     private warehouseService: WarehouseService,
     private router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.searchParams = new WarehouseSearchRequest();
    this.searchParams.type = 0;
    this.searchParams.status = 0;
    let $that = this;
    this.router.paramMap.subscribe((param: ParamMap) => {
        $that.searchParams.vendorId = param.get('id');
    });
    this.getWarehouse();
    
  }

  async getWarehouse(): Promise<void> {
    // if (this.form.valid) {
      try {
        let response = await this.warehouseService.search(this.searchParams);
        if(response.status == false)
        {
          ConfigSetting.ShowErrores(response.messages);
        }
        this.types = response.types;
        this.statuses = response.statuses;
        this.warehouses = response.warehouses;
        
      
       // this.totalRow = response.totalRow;
     
      }
      catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    // }
  }

  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {
      this.warehouseAddOrChange.warehouse.id = id;
      this.warehouseAddOrChange.warehouse.vendorId = this.searchParams.vendorId;
      this.warehouseAddOrChange.onGet();
      $('#warehouse-add-or-change').modal('show');
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  onShowRemoveForm(id:string){
    this.id = id;
    $('#warehouse-remove').modal('show');
  }

  async onRemove(): Promise<void> {
 
      try {
        let response = await this.warehouseService.remove(this.id);

       
        if(response.status){
          $('#warehouse-remove').modal('hide');
          ConfigSetting.ShowSuccess("Save sucess.");
          this.getWarehouse();
        }
        else
        {
          ConfigSetting.ShowErrores(response.messages);
        }

     
      }
      catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    
  }

}
