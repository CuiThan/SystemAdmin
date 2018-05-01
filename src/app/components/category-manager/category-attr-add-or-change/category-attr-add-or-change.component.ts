import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ProductAttributeService } from '../../../services/product-attribute.service';
import { ConfigSetting } from '../../../common/configSetting';
import { ProductAttributeModel } from '../../../models/product-attr-model';
import { KeyValueModel } from '../../../models/result-model';
import { CategoryAttrManagerModel, CategoryAttrModel, AttrCategoryChangeRequest, AttrCategoryAddRequest } from '../../../models/category-manager-model';
import { CategoryService } from '../../../services/category.service';
import { AttributeCategoryMappingService } from '../../../services/attribute-category-mapping.service';
import { CategoryComponent } from '../category/category.component';




declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-category-attr-add-or-change',
  templateUrl: './category-attr-add-or-change.component.html',
  styleUrls: ['./category-attr-add-or-change.component.css']
})
export class CategoryAttrAddOrChangeComponent implements OnInit {

  productAttr: ProductAttributeModel[];
  attributeType: KeyValueModel[];
  attrCategoryAdd: CategoryAttrModel;
  attrCategoryChange: CategoryAttrModel;
  checkStatus: boolean;
  submited: boolean;
  attributeIdAdd:number;
  attributeTypeAdd:number;
  displayOrderAdd:number;
  @ViewChild('attrCategoryAdd') form: any;
  @ViewChild('attrCategoryChangeForm') formChange: any;

  @Output() getCategoryAttr = new EventEmitter<string>();
  constructor(
    private productAttrService: ProductAttributeService,
    private attrCategoryService: CategoryService,
    private attrCategoryMappingService: AttributeCategoryMappingService
  ) { }

  ngOnInit() {
    
    this.attrCategoryAdd = new CategoryAttrModel();
    this.attrCategoryChange = new CategoryAttrModel();
   
  }

  async getProductAttr(categoryId: string): Promise<void> {
    try {
      const response = await this.productAttrService.gets(categoryId);
      this.productAttr = response.productAttributes;
      this.attributeType = response.attributeType;     
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async getAttrCategory(attrId: number, categoryId: string): Promise<void> {
    try {
      const response = await this.attrCategoryMappingService.getAttrCategory(attrId, categoryId);
      this.productAttr = response.productAttributes;
      this.attributeType = response.attributeType;
      this.attrCategoryChange = response.attrCategory;
      let addProductAttr = new ProductAttributeModel();
      addProductAttr.attributeId = this.attrCategoryChange.attributeId;
      addProductAttr.attributeName = this.attrCategoryChange.attributeName;
      this.productAttr.push(addProductAttr);

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }



  async onAdd(form): Promise<void> {
    App.blockUI();
     this.submited = true;

    try {
    
      debugger;
      if (this.form.valid) {
        ConfigSetting.ShowErrores(['success']);
        this.attrCategoryAdd.attributeId = this.attributeIdAdd;
        this.attrCategoryAdd.attributeType = this.attributeTypeAdd;
        this.attrCategoryAdd.displayOrder = this.displayOrderAdd;
        const requestModel = new AttrCategoryAddRequest(this.attrCategoryAdd);
        debugger;
        console.log(requestModel);
        debugger;
      
        const response = await this.attrCategoryService.addCategoryAttr(requestModel);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          $('#category-attr-add-form').modal('hide');    
          this.getCategoryAttr.next('getCategoryAttr');

        } else {
          ConfigSetting.ShowErrores(response.messages);
        }

      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async onChange(formChange): Promise<void> {
    App.blockUI();
    this.submited = true;
    console.log(this.attrCategoryChange);
    debugger;
    try {
      console.log(this.attrCategoryChange);

      if (true) {
        ConfigSetting.ShowErrores(['success']);
        const requestModel = new AttrCategoryChangeRequest(this.attrCategoryChange);
        debugger;

        const response = await this.attrCategoryService.changeCategoryAttr(requestModel);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          $('#category-attr-change-form').modal('hide');
          this.getCategoryAttr.next('getCategoryAttr');
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }

      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }

  async removeCategoryAttr(): Promise<void> {

    App.blockUI();

    try {
      if (this.form.valid) {
        ConfigSetting.ShowErrores(['success']);
        const requestModel = new AttrCategoryChangeRequest(this.attrCategoryChange);
        const response = await this.attrCategoryMappingService.removeCategoryAttr(this.attrCategoryChange.attributeId, this.attrCategoryChange.categoryId);
        if (response.status) {
          ConfigSetting.ShowSuccess('Save sucess.');
          $('#category-attr-remove').modal('hide');

          this.getCategoryAttr.next('getCategoryAttr');

        } else {
          ConfigSetting.ShowErrores(response.messages);
        }

      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
}
