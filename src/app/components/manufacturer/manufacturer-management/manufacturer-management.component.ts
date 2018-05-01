import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ManufacturerManagerModel, CategoryManufacturerGetsRequest, ManufacturerModel } from '../../../models/manufacturer-manager-model';
import { ManufacturerGetRequest } from '../../../models/manufacturer-management-model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ManufacturerManagementService } from '../../../services/manufacturer-management.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { ConfigSetting } from '../../../common/configSetting';
import { PatternValidator } from '@angular/forms';
import { ManufacturerAddOrChangeComponent } from '../../../components/manufacturer/manufacturer-add-or-change/manufacturer-add-or-change.component';

declare var jquery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'app-manufacturer-management',
  templateUrl: './manufacturer-management.component.html',
  styleUrls: ['./manufacturer-management.component.css']
})
export class ManufacturerManagementComponent implements OnInit {
  @ViewChild(ManufacturerAddOrChangeComponent) v: ManufacturerAddOrChangeComponent; 
  @ViewChild('f') form: any;  
  @ViewChildren('name') nameOfSearchParams: string
  searchParams:ManufacturerGetRequest;
  manufacturers: ManufacturerModel[];
  testString: string;
  pageIndex = 0;
  pageSize = 2;
  totalRow = 0;
  constructor(
    private testService: ManufacturerManagementService,
    private router: Router
  ) { }
  async getManufacturers(): Promise<void> { 
    try {   
      
      this.searchParams.id="";
      this.searchParams.description=null;
      this.searchParams.pageIndex=this.pageIndex;
      this.searchParams.pageSize=this.pageSize;
      this.searchParams.totalRow=this.totalRow;
      let response = await this.testService.getManufacturers(this.searchParams);         
      this.manufacturers=response.manufacturers;     
    }
    catch(ex) {
      ConfigSetting.ShowErrorException(ex);
    }  
  }  
  ngOnInit() {
    this.searchParams= new ManufacturerGetRequest();       
    this.getManufacturers();
  }

  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {
      
      this.v.manufacturer.id=id;
      this.v.onGet();
      
      $('#manufacturer-add-or-change').modal('show');
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
