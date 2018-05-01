import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ConfigSetting } from '../../../common/configSetting';
import { VendorAddOrChangeModel } from '../../../models/vendor-model/vendor-add-or-change-model';
import { VendorService } from '../../../services/vendor.service';
import { KeyValueModel } from '../../../models/result-model';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';

import { promise } from 'selenium-webdriver';
import { Jsonp } from '@angular/http/src/http';

declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vendor-add-or-change',
  templateUrl: './vendor-add-or-change.component.html',
  styleUrls: ['./vendor-add-or-change.component.css']
})
export class VendorAddOrChangeComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  @Output() getVendors = new EventEmitter<string>();
  vendor: VendorAddOrChangeModel;
  types: KeyValueModel[];
  statuses: KeyValueModel[];
  submited: boolean;
  _type:Int8Array[1];
  _typeDirty:boolean;

  constructor(
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.vendor = new VendorAddOrChangeModel();
    this.submited = false;
    this._type=0;
  }
  async onGet(): Promise<void> {
    App.blockUI();
    try {
      var response = await this.vendorService.get(this.vendor.id);
      this.vendor = response.vendor;
      this.types = response.types;
      this.statuses = response.statuses;
      if(this.vendor.id!='')this._type=response.vendor.type;
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
    let type = 0;
    this.types.forEach(element => {
      if (element.checked) {
        type += parseInt(element.value);
      }
    });
    this.vendor.type = type;
    this.submited = true;
    try {
      if (form.valid && type != 0) {
        let img = this.fileUpload.imagePath;
        if (img != "") this.vendor.logo = img;
        let requestModel = this.vendor;
        let response = await this.vendorService.save(requestModel);
        if (response.status) {
          $('#vendor-add-or-change').modal('hide');
          ConfigSetting.ShowSuccess("Save sucess.");
          this.getVendors.next('getVendors');
          
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
  async checkedType(event):Promise<void>  {
    this._typeDirty = true;
    if (event.checked) {
      this._type -= parseInt(event.value);
    }
    else {
      this._type += parseInt(event.value);
    }
  }
}

