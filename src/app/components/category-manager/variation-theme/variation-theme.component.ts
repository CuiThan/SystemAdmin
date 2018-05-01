import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VariationThemeService } from '../../../services/variation-theme.service';
import { VariationThemeModel, VariationThemeChooseModel, Category_VariationTheme_AddRequest, Category_VariationThemeMapping } from '../../../models/variation-theme-model'
import { ConfigSetting } from '../../../common/configSetting';
import { KeyValueModel } from '../../../models/result-model';
import { last } from 'rxjs/operator/last';
import { ProductAttributeModel } from '../../../models/product-attr-model'
import { CategoryModel } from '../../../models/category-manager-model';


declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-variation-theme',
  templateUrl: './variation-theme.component.html',
  styleUrls: ['./variation-theme.component.css']
})
export class VariationThemeComponent implements OnInit {

  variationThemes: KeyValueModel[];
  model: VariationThemeModel;
  idCategory: string;
  productAttrs: ProductAttributeModel[];
  arrayVariationChooseNew: VariationThemeChooseModel[];
  arrayVariationChoose: VariationThemeChooseModel[];
  arrayVariationChooseExist: VariationThemeChooseModel[];
  category_VariationThemeMapping: Category_VariationThemeMapping[];
  variationChooseToRemove:VariationThemeChooseModel;
  
  constructor(
    private variationThemService: VariationThemeService

  ) { }

  ngOnInit() {
    this.model = new VariationThemeModel();
    this.arrayVariationChoose = new Array();
    this.arrayVariationChooseNew = new Array();
    this.arrayVariationChooseExist = new Array();
    this.model.variationThemeId = 0;
    this.variationChooseToRemove = new VariationThemeChooseModel();
    this.onInit();
  }
  async onInit(): Promise<void> {
    try {
      let response = await this.variationThemService.getGetVariationTheme();

      this.variationThemes = response.variationThemes;


    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }
  async getsCategoryVariationTheme(): Promise<void> {

    try {
      let response = await this.variationThemService.getsCategoryVariationTheme(this.idCategory);
      this.category_VariationThemeMapping = response.categoryVariationThemeMapping;

      console.log("poapapapapapa");
      console.log(this.category_VariationThemeMapping);

      if (this.category_VariationThemeMapping != null) {
        this.category_VariationThemeMapping.forEach(x => {
          this.getsProductAttrsExist(x.variationThemeId);
        });

      }


    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }



  async getsProductAttrsExist(variationThemeId: number): Promise<void> {
    try {

      let response = await this.variationThemService.getGetVariationTheme_Attribute(variationThemeId);
      let variationThemeChoose = new VariationThemeChooseModel();
      variationThemeChoose.id = response.variationTheme_Attribute.variationThemeId;
      variationThemeChoose.name = response.variationTheme_Attribute.variationThemeName;
      variationThemeChoose.attributes = response.variationTheme_Attribute.attributes;
      this.arrayVariationChoose.push(variationThemeChoose);
      this.arrayVariationChooseExist.push(variationThemeChoose);




    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }



  onChange() {

    if (this.model.variationThemeId != 0)
      this.getVariationThem_Attribute();


  }


  async onDelete(): Promise<void> {
   
    let index = this.arrayVariationChoose.indexOf(this.variationChooseToRemove);
    let indexOfVariationChooseNew = this.arrayVariationChooseNew.indexOf(this.variationChooseToRemove);
    let indexOfVariationChooseExist = this.arrayVariationChooseExist.indexOf(this.variationChooseToRemove);
    if (index !== -1) this.arrayVariationChoose.splice(index, 1);
    if (indexOfVariationChooseNew !== -1) {
      this.arrayVariationChooseNew.splice(indexOfVariationChooseNew, 1);
      $('#variation-theme-remove').modal('hide');
    }
    if (indexOfVariationChooseExist !== -1) {
      App.blockUI();

      try {

        let response = await this.variationThemService.remove(this.idCategory,this.variationChooseToRemove.id);
        if (response.status) {
          ConfigSetting.ShowSuccess("Save sucess.");

           this.arrayVariationChooseExist.splice(indexOfVariationChooseExist, 1);
          // this.arrayVariationChoose.splice(index, 1);
          $('#variation-theme-remove').modal('hide');
        }
        else {
          ConfigSetting.ShowErrores(response.messages);
        }

      }

      catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
      App.unblockUI();

    }


  }

  async getVariationThem_Attribute(): Promise<void> {
    try {

      if (this.arrayVariationChoose.find(x => x.id == this.model.variationThemeId) == null) {
        let response = await this.variationThemService.getGetVariationTheme_Attribute(this.model.variationThemeId);
        let variationThemeChoose = new VariationThemeChooseModel();
        variationThemeChoose.id = response.variationTheme_Attribute.variationThemeId;
        variationThemeChoose.name = response.variationTheme_Attribute.variationThemeName;
        variationThemeChoose.attributes = response.variationTheme_Attribute.attributes;
        this.arrayVariationChoose.push(variationThemeChoose);
        this.arrayVariationChooseNew.push(variationThemeChoose);



      }

    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }

  }

  onShowRemoveVariationTheme(item: VariationThemeChooseModel):void{

    try {
     this.variationChooseToRemove = item;
      $('#variation-theme-remove').modal('show');
      
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  
}





  async onAddVariationCategory(): Promise<void> {
    App.blockUI();

    if (this.arrayVariationChooseNew.length > 0) {


      try {


        ConfigSetting.ShowErrores(["success"]);
        let arrayVariationThemeId = new Array();
        this.arrayVariationChooseNew.forEach(x => arrayVariationThemeId.push(x.id));
        let newRequest = new Category_VariationTheme_AddRequest();
        newRequest.categoryId = this.idCategory;
        newRequest.variationThemeId = arrayVariationThemeId;

        let response = await this.variationThemService.add(newRequest);
        if (response.status) {
          ConfigSetting.ShowSuccess("Save sucess.");


          this.arrayVariationChooseExist = this.arrayVariationChoose;
          this.arrayVariationChooseNew = [];


        }
        else {
          ConfigSetting.ShowErrores(response.messages);
        }

      }

      catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }
    App.unblockUI();
  }

}
