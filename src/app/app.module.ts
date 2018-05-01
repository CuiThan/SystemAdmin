import { NgModule } from '@angular/core';

import { EqualValidator } from './directives/equal-validator.directive';

import { Convert } from './common/Convert';
import { ConfigSetting } from './common/configSetting';
import { HttpClientService } from './common/http-client.service';

import { CheckPermissionService } from './services/check-permission.service';
import { LoginRedirectService } from './services/login-redirect.service';
import { AccountService } from './services/account.service';
import { ShardingConfigService } from './services/sharding-config.service';
import { MenuService } from './services/menu.service';
import { CustomerService } from './services/customer.service';
import { RoleService } from './services/role.service';
import { LanguageService } from './services/language.service';
import { ProductAttributeService } from './services/product-attribute.service';
import { AttributeCategoryMappingService } from './services/attribute-category-mapping.service';
import { VariationThemeService } from './services/variation-theme.service';
import { ManufacturerService } from './services/manufacturer.service';
import { FileService } from './services/file.service';
import { TemplateService } from './services/marketing-management/page-builder/template.service';
import { VendorService } from './services/vendor.service';
import { CategoryService } from './services/category.service';
import { BannerService } from './services/marketing-management/banner/banner.service';
import { MeasureUnitService } from './services/measure-unit.service';
import { EmailOrSmsService } from './services/email-or-sms.service';
import { LocationService } from './services/location.service';
import { ProductGroupService } from './services/product-group.service';
// import { ManufacturerManagementService } from './services/manufacturer-management.service';
import { WarehouseService } from './services/warehouse.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigService } from './services/config.service';
import { TemplateDefineService } from './services/marketing-management/template-define.service';
// import { WarehouseDetailComponent } from './components/warehouse-manager/warehouse-detail/warehouse-detail.component';


import { ManufacturerManagementService } from './services/manufacturer-management.service';


@NgModule({
  declarations: [
    AppComponent,
    
    
      ],
  imports: [
    AppRoutingModule
  ],
  providers: [
    HttpClientService,
    CheckPermissionService,
    LoginRedirectService,
    AccountService,
    ShardingConfigService,
    MenuService,
    CustomerService,
    RoleService,
    LanguageService,
    FileService,
    MeasureUnitService,
    EmailOrSmsService,
    CategoryService,
    TemplateService,
    BannerService,
    VendorService,    
    ProductAttributeService,
    AttributeCategoryMappingService,
    VariationThemeService,
    ManufacturerService,
    ProductGroupService,
    ManufacturerManagementService,
    LocationService,
    ProductGroupService,
    WarehouseService,
    ConfigService,
    TemplateDefineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
