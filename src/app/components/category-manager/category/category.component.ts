import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { CategoryModel, CategoryManagerModel, LogoCategoryModel, CategoryAttrRequest, CategoryAttrModel, CategoryAttrManagerModel, CategoryManufacturerRequest } from '../../../models/category-manager-model';
import { Console } from '@angular/core/src/console';
import { ConfigSetting } from '../../../common/configSetting';
import { CategoryService } from '../../../services/category.service';

import { Convert } from '../../../common/Convert';
import { KeyValueModel } from '../../../models/result-model';
import { VariationThemeComponent } from '../../../components/category-manager/variation-theme/variation-theme.component';
import { ManufacturerManagerModel, CategoryManufacturerGetsRequest } from '../../../models/manufacturer-manager-model';
import { ManufacturerComponent } from '../manufacturer/manufacturer.component';
import { CategoryAddOrChangeComponent } from '../category-add-or-change/category-add-or-change.component';
import { CategoryAttrAddOrChangeComponent } from '../category-attr-add-or-change/category-attr-add-or-change.component';




declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  // templateUrl: './categorydemo.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild(CategoryAddOrChangeComponent) categoryAddOrChange: CategoryAddOrChangeComponent;
  @ViewChild(CategoryAttrAddOrChangeComponent) categoryAttrAddOrChange: CategoryAttrAddOrChangeComponent;
  @ViewChild(VariationThemeComponent) variationTheme: VariationThemeComponent;
  @ViewChild(ManufacturerComponent) manufacturer: ManufacturerComponent;

  model: CategoryManagerModel;
  // data:CategoryModel[];
  parentFolder: CategoryModel;
  selected: Boolean;
  linkImage: string;
  linkLogo: string;
  statuses: KeyValueModel[];
  groupChild: CategoryModel[];
  categoryAttrModel: CategoryAttrManagerModel;
  pageIndex = 0;
  pageSize = 2;
  totalRow = 30;
  categoryAttrRequest: CategoryAttrRequest;
  categoryManufacturerGetsRequest: CategoryManufacturerGetsRequest;
  manufacturerManagerModel: ManufacturerManagerModel;
  constructor(
    private categoryService: CategoryService

  ) { }

  ngOnInit() {

    this.model = new CategoryManagerModel();
    this.model.category = new CategoryModel();
    this.categoryAttrModel = new CategoryAttrManagerModel();
    this.categoryAttrRequest = new CategoryAttrRequest();
    this.categoryManufacturerGetsRequest = new CategoryManufacturerGetsRequest();
    this.manufacturerManagerModel = new ManufacturerManagerModel();
    this.model.category.name = '';
    this.model.category.description = '';
    this.model.formState = 0;



    this.onInit();

  }
  async onInit(): Promise<void> {
    try {
      const response = await this.categoryService.gets('');
      this.model.languages = response.languages;
      this.model.category.languageId = response.languageDefaultId;
      this.model.categories = response.categories;
      this.statuses = response.statuses;
      this.parentFolder = new CategoryModel();
      this.registerMenusTree();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }


  getChild(): void {


    this.groupChild = this.model.categories.filter(x => x.parentId === this.model.category.id);


    this.groupChild.forEach(x => x.nameStatus = this.getNameStatus(x.status.toString()));

  }

  getNameStatus(status: string): string {

    return this.statuses.find(x => x.value === status).text;
  }

  async onGet(languageId: string, id: string, formState: number): Promise<void> {
    try {

      this.selected = true;

      const responseCategories = await this.categoryService.gets('');
      this.model.categories = responseCategories.categories;

      //  var response = this.getSelectedTreeCategory(id);
      const response = await this.categoryService.get(languageId, id);

      this.model.formState = formState;
      this.statuses = response.statuses;
      this.model.parents = response.parents;
      this.model.languages = response.languages;
      this.model.category.id = response.category.id;
      this.model.category.code = response.category.code;

      this.model.category.languageId = response.category.languageId;
      this.model.category.isPublish = response.category.isPublish;
      this.model.category.parentId = response.category.parentId;
      this.model.category.name = response.category.name;
      this.model.category.status = response.category.status;
      this.model.category.nameStatus = this.statuses.find(x => x.value === this.model.category.status.toString()).text;
      this.model.category.displayOrder = response.category.displayOrder;
      this.model.category.description = response.category.description;
      const parent = this.model.categories.find(x => x.id === this.model.category.parentId);

      // this.variationTheme.getsCategoryVariationTheme();
      this.getListVariationTheme();

      const logoResponse = response.category.logos;


      if (logoResponse.length > 0) {
        const data = JSON.parse(logoResponse);
        const arrImage = [];
        const arrLogo = [];

        for (let i = 0; i < data.length; i++) {

          if (data[i].LogoType === 1) {
            arrImage.push(data[i]);

            continue;
          } else if (data[i].LogoType === 2) {
            arrLogo.push(data[i]);


            continue;
          }
        }
        // this.model.category.logos = new LogoCategoryModel(data[0].ImageURL, data[0].LogoType, data[0].DisplayOrder);
        if (arrImage.length > 0) {
          this.linkImage = arrImage[0].ImageURL;
        }
        if (arrLogo.length > 0) {
          this.linkLogo = arrLogo[0].ImageURL;
        }

      } else {
        this.linkLogo = '';
        this.linkImage = '';
      }

      if (parent == null) {
        this.parentFolder.name = '';
      } else {
        this.parentFolder = parent;
      }
      //   this.registerParentsTree();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.getChild();
      this.getCategoryAttr();

      this.manufacturer.idCategory = id;
      this.getListManufacturer();
      // this.manufacturer.getCategoryManufacturer();
    }
  }


  getListVariationTheme() {
    this.variationTheme.idCategory = this.model.category.id;
    this.variationTheme.arrayVariationChoose = [];
    this.variationTheme.getsCategoryVariationTheme();
  }


  getListManufacturer() {
    this.manufacturer.getCategoryManufacturer();
  }

  async getCategoryAttr(): Promise<void> {
    try {


      this.categoryAttrRequest.id = this.model.category.id;
      const response = await this.categoryService.getCategoryAttr(this.categoryAttrRequest);
      this.categoryAttrModel = response;
      this.totalRow = response.totalRow;

      this.categoryAttrModel.categoryAttrs.forEach(x => x.nameAttributeType = this.getNameAttributeType(x.attributeType.toString()));
      this.categoryAttrModel.categoryAttrs.forEach(x => x.nameIsFilter = this.getNameIsFilter(x.isFilter));
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }

  getNameAttributeType(type: string): string {

    return this.categoryAttrModel.attributeType.find(x => x.value === type).text;
  }

  getNameIsFilter(filter: boolean): string {
    if (filter === true) {
      return 'Có';
    } else {
      return 'Không';
    }
  }

  registerMenusTree(): void {
    const menus = {
      'core': {
        'data': []
      }
    };
    for (let i = 0; i < this.model.categories.length; i++) {
      const category = this.model.categories[i];
      const categoryItem = {
        'id': category.id,
        'parent': category.parentId === '' ? '#' : category.parentId,
        'text': category.name,
        'data': category
      };
      menus.core.data.push(categoryItem);
    }

    try {

      $('.menus').jstree(true).settings.core.data = menus.core.data;
      $('.menus').jstree(true).refresh();

    } catch (ex) {

      $('#menus').jstree(menus);
    }
    const $that = this;
    $('#menus').on('select_node.jstree', function (event, node) {
      const selectedNode = node.node;
      $that.onGet(selectedNode.data.languageId, selectedNode.data.id, 2);
    });
  }

  registerParentsTree(): void {
    const menus = {
      'core': {
        'data': []
      }
    };
    for (let i = 0; i < this.model.parents.length; i++) {
      const menu = this.model.parents[i];
      const menuItem = {
        'id': menu.id,
        'parent': menu.parentId === '' ? '#' : menu.parentId,
        'text': menu.name,
        'data': menu
      };
      menus.core.data.push(menuItem);
    }
    try {
      $('.parents').jstree(true).settings.core.data = menus.core.data;
    } catch (ex) {
      $('.parents').jstree(menus);
    }
    const $that = this;
    $('.parents').on('select_node.jstree', function (event, node) {
      const selectedNode = node.node;
      $that.model.category.parentId = selectedNode.data.id;
    });
    if (this.model.category.parentId.length > 0) {
      $('.parents').one('refresh.jstree', function () { $('.parents').jstree(true).select_node($that.model.category.parentId); });
    } else {
      $('.parents').one('refresh.jstree', function () { $('.parents').jstree('deselect_all'); });
    }
    $('.parents').jstree(true).refresh();
  }

  onAddOrChange(form): void {
    try {
      if (form.valid) {
        const requestModel = this.model.category;
        const response = this.categoryService.addOrChange(requestModel);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowAddOrChangeForm(id: string): Promise<void> {
    try {

      if (id.length === 0) {
        this.categoryAddOrChange.categoryManager.category.id = '';

      } else {
        this.categoryAddOrChange.categoryManager.category.id = id;
      }

      // this.categoryAddOrChange.statuses = this.statuses;
      this.categoryAddOrChange.onGet();
      $('#category-add-or-change').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowAddFormCategoryAttr(): Promise<void> {
    try {
      // this.categoryAttrAddOrChange.attrCategoryAdd.categoryId = this.model.category.id;
      this.categoryAttrAddOrChange.attrCategoryAdd.categoryId = this.model.category.id;
      this.categoryAttrAddOrChange.getProductAttr(this.categoryAttrAddOrChange.attrCategoryAdd.categoryId);
      $('#category-attr-add-form').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowChangeFormCategoryAttr(attrCategory: CategoryAttrModel): Promise<void> {
    try {
      this.categoryAttrAddOrChange.attrCategoryChange.attributeId = attrCategory.attributeId;
      this.categoryAttrAddOrChange.attrCategoryChange.categoryId = this.model.category.id;
      this.categoryAttrAddOrChange.getAttrCategory(this.categoryAttrAddOrChange.attrCategoryChange.attributeId, this.categoryAttrAddOrChange.attrCategoryChange.categoryId);
      $('#category-attr-change-form').modal('show');

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  onShowRemoveCategoryAttr(attributeId: number): void {
    try {
      this.categoryAttrAddOrChange.attrCategoryChange.attributeId = attributeId;
      this.categoryAttrAddOrChange.attrCategoryChange.categoryId = this.model.category.id;
      $('#category-attr-remove').modal('show');

    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

}
