import { Component, OnInit, ViewChild } from '@angular/core';
import { VariationThemeSearchRequest } from '../../../models/variationtheme/VariationThemeSearchRequest';
import { VariationThemeModel } from '../../../models/variation-theme-model';
import { VariationThemeService } from '../../../services/variation-theme.service';
import { ConfigSetting } from '../../../common/configSetting';
import { VariationthemeEditComponent } from '../variationtheme-edit/variationtheme-edit.component';
import { Router } from '@angular/router';
declare var jquery: any;
declare var $: any;
declare var App: any;
// declare var count: number;
@Component({
  selector: 'app-variationtheme-manager',
  templateUrl: './variationtheme-manager.component.html',
  styleUrls: ['./variationtheme-manager.component.css']
})
export class VariationthemeManagerComponent implements OnInit {
  @ViewChild('f') form: any;
  @ViewChild(VariationthemeEditComponent) variationThemeEdit: VariationthemeEditComponent;
  searchParams: VariationThemeSearchRequest;
  variationThemes: VariationThemeModel[];
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  variationThemeModel: VariationThemeModel;
  constructor(
    private variationThemeService: VariationThemeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchParams = new VariationThemeSearchRequest();
    this.searchParams.attributeName = '';
    this.searchParams.variationThemeName = '';

    this.variationThemes = [];
    this.getVariationTheme();
  }
  async getVariationTheme(): Promise<any> {
    try {
      const response = await this.variationThemeService.search(this.searchParams);
      this.variationThemes = response.variationThemeModels;
      console.log(this.variationThemes);
      this.totalRow = response.totalRow;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  async onShowEditForm(variationThemeId: number, attributeId: number): Promise<void> {
    App.blockUI();
    try {
      this.variationThemeEdit.variationthemeEdit.variationThemeId = variationThemeId;
      this.variationThemeEdit.variationthemeEdit.attributeId = attributeId;
      console.log(variationThemeId);
      await this.variationThemeEdit.getListVariationTheme();
      debugger;
      $('#variationtheme-edit').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
  // async onGetDetail(variationId:number,attributeId:number):Promise<void>{
  //   App.blockUI();;
  //   try{
  //     if(variationId!=0){
  //       this.router.navigateByUrl(ConfigSetting.UrlPathVariationThemeAttributeGetByID+variationId);
  //     }
  //   }catch(ex){
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  //   App.unblockUI();
  // }
  // onRemoveAtt(variationId:number):void{
  //   try{
  //   //   this.variationThemeEdit.variationthemeEdit.variationThemeId = variationId;
  //   // this.variationThemeEdit.variationthemeEdit.attributeId = this.variationThemeModel.attributeId;
  //   // $('#variationTheme-variation-remove').modal('show');
  //   }catch(ex){
  //     ConfigSetting.ShowErrorException(ex);
  //   }
  // }

}
