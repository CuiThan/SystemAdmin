import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ManufacturerManagementService } from '../../../services/manufacturer-management.service';
import { ManufacturerManagerModel, CategoryManufacturerGetsRequest, ManufacturerModel } from '../../../models/manufacturer-manager-model';
import { ConfigSetting } from '../../../common/configSetting';
@Component({
  selector: 'app-manufacturer-details',
  templateUrl: './manufacturer-details.component.html',
  styleUrls: ['./manufacturer-details.component.css']
})
export class ManufacturerDetailsComponent implements OnInit {
  manufacturer: ManufacturerModel;
  constructor(
    private router: ActivatedRoute,
    private manufacturerService : ManufacturerManagementService
  ) { }

  ngOnInit() {
    this.manufacturer = new ManufacturerModel();
    this.router.paramMap.subscribe( 
      (paramMap: ParamMap) => {this.getManufacturer(paramMap.get('id'))});
  }
  

  async getManufacturer(id: string):Promise<void> {
    try 
    {
      const response = await this.manufacturerService.getManufacturerById(id);
      this.manufacturer= response.manufacturers[0];
    }
    catch (ex)
    {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
