import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ManufacturerManagerModel, CategoryManufacturerGetsRequest, ManufacturerModel } from '../../../models/manufacturer-manager-model';
import { CategoryService } from '../../../services/category.service';
import { ConfigSetting } from '../../../common/configSetting';
import { ManufacturerService } from '../../../services/manufacturer.service';

declare var jquery: any;
declare var $: any;
declare var App: any;
@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private manufacturerService: ManufacturerService
  ) { }


  manufacturers: ManufacturerModel[];

  manufacturerManagerModel: ManufacturerManagerModel;
  pageIndex = 0;
  pageSize = 2;
  totalRow = 30;
  categoryManufacturerGetsRequest: CategoryManufacturerGetsRequest;
  idCategory: string;
  manufacturerRemoveId: number;
  manufacturerArrayToAdd: ManufacturerModel[];
  manufacturerAdd: ManufacturerModel;

  @Output() getManufacturer = new EventEmitter<string>();
  ngOnInit() {
    this.manufacturerAdd = new ManufacturerModel();
    this.manufacturerManagerModel = new ManufacturerManagerModel();
    this.categoryManufacturerGetsRequest = new CategoryManufacturerGetsRequest();
    this.getCategoryManufacturer();
  }
  async getCategoryManufacturer(): Promise<void> {
    try {


      this.categoryManufacturerGetsRequest.id = this.idCategory;
      const response = await this.categoryService.getCategoryManufacturer(this.categoryManufacturerGetsRequest);
      this.manufacturerManagerModel = response;
      this.totalRow = response.totalRow;
      this.manufacturerManagerModel.manufacturers.forEach(element => {
        element.logo = JSON.parse(element.logo).ImageURL;

      });

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  onShowRemoveManufacturer(id: number): void {

    try {
      this.manufacturerRemoveId = id;
      $('#manufacturer-remove').modal('show');

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }

  async onRemoveManufacturer(): Promise<void> {
    App.blockUI();

    try {

      const response = await this.manufacturerService.removeManufacturer(this.manufacturerRemoveId, this.idCategory);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save sucess.');
        $('#manufacturer-remove').modal('hide');

        this.getManufacturer.next('getListManufacturer');

      } else {
        ConfigSetting.ShowErrores(response.messages);
      }

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onShowManufacturerMappingAdd(): Promise<void> {
    App.blockUI();
    try {
      this.manufacturerAdd = new ManufacturerModel();
      const response = await this.manufacturerService.getsManufacturer(this.idCategory);
      this.manufacturerArrayToAdd = response.manufacturers;
      this.manufacturerArrayToAdd.forEach(x => x.logo = JSON.parse(x.logo).ImageURL);

      $('#manufacturer-mapping-add').modal('show');

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();

  }

  async onAdd(): Promise<void> {
    App.blockUI();
    // this.submited = true;

    try {


      const response = await this.manufacturerService.addManufacturer(this.idCategory, this.manufacturerAdd.id);
      if (response.status) {
        ConfigSetting.ShowSuccess('Save sucess.');
        $('#manufacturer-mapping-add').modal('hide');
        this.getManufacturer.next('getListManufacturer');
      } else {
        ConfigSetting.ShowErrores(response.messages);
      }

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
