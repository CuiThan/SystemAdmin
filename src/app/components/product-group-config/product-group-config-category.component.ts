import { Component, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { ProductGroupModel } from '../../models/product-group-model';
import { ConfigSetting } from '../../common/configSetting';
import { JstreeStateModel } from '../../models/result-model';
import { ProductGroupService } from '../../services/product-group.service';
declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'product-group-config-category',
  templateUrl: './product-group-config-category.component.html',
})

export class ProductGroupConfigCategoryComponent implements OnInit {
  productGroupId: string;
  categories: JstreeStateModel[];
  categoryIds: string[];
  onSaveStatus: boolean;
  constructor(private productGroupService: ProductGroupService) { }

  ngOnInit() {

  }
  async onGetCategories(productGroupId: string): Promise<void> {
    this.productGroupId = productGroupId;
    let response = await this.productGroupService.onGetCategories(this.productGroupId);
    if (response.status) {
      this.categories = response.categories;
      this.categoryIds = response.categoryIds;
      this.registerCategoryTree();
    }
    else {
      this.categories = new JstreeStateModel[0];
      this.categoryIds = null;
      ConfigSetting.ShowErrores(response.messages);
    }
  }
  private registerCategoryTree() {
    let categories = this.categories;
    $('#productGroupCategories').jstree({
      'core': {
        'data': categories
      },
      "plugins": ["checkbox", "sort"]
    });
    // $("#productGroupCategories").on("select_node.jstree", function (event, node) {
    //   let selectedNode = node.node;
    //   debugger;
    // });
  }

  async onSave(): Promise<void> {
    if (this.onSaveStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onSaveStatus = true;
    try {
      let categoryIds = $('#productGroupCategories').jstree(true).get_selected();
      let response = await this.productGroupService.onChangeCategories(this.productGroupId, categoryIds);
      if (response.status) {
        ConfigSetting.ShowSuccess("Save sucess.");
        this.categories = null;
        this.categoryIds = null;
        $('#productgroup-category-change').modal('hide');
      }
      else {
        ConfigSetting.ShowErrores(response.messages);
      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    this.onSaveStatus = false;
    App.unblockUI();
  }
}