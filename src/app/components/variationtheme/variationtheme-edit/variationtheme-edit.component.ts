import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { VariationThemeModel, AttributeModel } from '../../../models/variation-theme-model';
import { VariationThemeService } from '../../../services/variation-theme.service';
import { ConfigSetting } from '../../../common/configSetting';
import { VariationThemeEditModel, VariationThemeEditRequest } from '../../../models/variationtheme/VariationThemeEditModel';
import { ProductAttributeService } from '../../../services/product-attribute.service';
import { ProductAttributeModel } from '../../../models/product-attr-model';
import { KeyValueModel } from '../../../models/result-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-variationtheme-edit',
  templateUrl: './variationtheme-edit.component.html',
  styleUrls: ['./variationtheme-edit.component.css']
})
export class VariationthemeEditComponent implements OnInit {
  variationthemeEdit: VariationThemeEditModel;
  attributeType: KeyValueModel[];
  attributeTypeAdd: number;
  attributes: AttributeModel[];
  @ViewChild('variationThemeEditForm') form1: any;
  @Output() getAttribute = new EventEmitter<string>();
  constructor(
    private variationThemeService: VariationThemeService

  ) {

  }

  ngOnInit() {
    this.variationthemeEdit = new VariationThemeEditModel();
    this.variationthemeEdit.variationThemeName = '1111';
  }

  async getListVariationTheme(): Promise<void> {
    try {
      debugger;
      const response = await this.variationThemeService.getById(this.variationthemeEdit.variationThemeId, this.variationthemeEdit.attributeId);
      this.variationthemeEdit = response.variationThemeAttributeMapping;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
  // async getListtAttribute(variationThemeId: number): Promise<void> {
  //   try {
  //     const response = await this.variationThemeService.variationThemeGetListAttribute(variationThemeId);
  //     this.attributes = response.VariationThemeAttributes;
  //     // this.attributeType = response.attributeType;
  //   } catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  // }
  // async onChange(form1): Promise<void> {
  //   App.blockUI();
  //   try {
  //     ConfigSetting.ShowErrores(["success"]);
  //     let requestModel = new VariationThemeEditRequest(this.variationthemeEdit);
  //     let response = await this.variationThemeService.EditVariation(requestModel);
  //   }
  //   catch (ex) {
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   App.unblockUI();
  // }
  // async removeAttribute():Promise<void>{
  //   debugger;
  //   App.unblockUI();
  //   try{
  //     if(this.form1.valid){
  //       ConfigSetting.ShowErrores(['Success']);
  //       const requestModel = new VariationThemeEditRequest(this.variationthemeEdit);
  //       const response=await this.variationThemeService.RemoveVariation(this.variationthemeEdit.variationThemeId,this.variationthemeEdit.attributeId);
  //       ConfigSetting.ShowSuccess('Save sucess');
  //       $('#variationtheme-remove').modal('hide');
  //       this.getAttribute.next('getAttribute');
  //     }
  //   }catch(ex){
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   App.unblockUI();
  // }
}
