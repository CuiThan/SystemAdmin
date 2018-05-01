import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { ManufacturerManagementService } from '../../../services/manufacturer-management.service';
import { KeyValueModel } from '../../../models/result-model';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';
import { ManufacturerGetRequest } from '../../../models/manufacturer-management-model';
import { promise } from 'selenium-webdriver';
import { Jsonp } from '@angular/http/src/http';
import { ManufacturerModel } from '../../../models/manufacturer-manager-model';

declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-manufacturer-add-or-change',
  templateUrl: './manufacturer-add-or-change.component.html',
  styleUrls: ['./manufacturer-add-or-change.component.css']
})
export class ManufacturerAddOrChangeComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  @Output() getManufacturer= new EventEmitter<String>();
  manufacturer: ManufacturerModel;
  submited: boolean;
  requestModel:ManufacturerGetRequest;
  constructor(private testService: ManufacturerManagementService) { }

  ngOnInit() {
    this.manufacturer= new ManufacturerModel();
    this.submited = false;
  }
  async onGet(): Promise<void> {
    App.blockUI();
    try {
      if (this.manufacturer.id!= null && this.manufacturer.id!=undefined && this.manufacturer.id.length>0) {
        var response = await this.testService.getManufacturerById(this.manufacturer.id);      
        this.manufacturer= response.manufacturers[0];     
        this.manufacturer.logo.slice(15,-2);     
      }
      else {
        this.manufacturer= new ManufacturerModel();
        this.manufacturer.id="";
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onAddOrChange(form): Promise<void> {
    App.blockUI();
    
    
    this.submited = true;
    try {
      if (form.valid) {
        let img = this.fileUpload.imagePath;
        if (img != "") this.manufacturer.logo = img;
        this.requestModel= new ManufacturerGetRequest();
        this.requestModel.id = this.manufacturer.id;
        this.requestModel.name=this.manufacturer.name;
        this.requestModel.description=this.manufacturer.description;
        this.requestModel.logo=this.manufacturer.logo;
        let response = await this.testService.save(this.requestModel);
        debugger;
        if (response.status) {
          $('#manufacturer-add-or-change').modal('hide');
          ConfigSetting.ShowSuccess("Save sucess.");
          this.getManufacturer.next('getManufacturers');
          
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
