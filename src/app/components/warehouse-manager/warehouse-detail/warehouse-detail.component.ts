import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WarehouseAddOrChangeModel } from '../../../models/warehouse/warehouse-add-or-change-model';
import { WarehouseService } from '../../../services/warehouse.service';
import { ConfigSetting } from '../../../common/configSetting';


declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {

  
  warehouse: WarehouseAddOrChangeModel;
  constructor(
    private router: ActivatedRoute,
   private warehouseService:WarehouseService
  ) { }

  ngOnInit() {
    this.warehouse = new WarehouseAddOrChangeModel();
    let $that = this;
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.warehouse.id = param.get('id');
    });
    this.onGetWarehouse();
   
  }

  async onGetWarehouse():Promise<void>{
      
    App.blockUI();
    try {
    
    
      var response = await this.warehouseService.get(this.warehouse.id);
      this.warehouse = response.warehouse;
      console.log(this.warehouse);
    
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }


}
