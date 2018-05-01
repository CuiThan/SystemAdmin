import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EqualValidator } from './directives/equal-validator.directive';
import {AutoCompleteModule} from 'primeng/primeng';

import { CheckPermissionService } from './services/check-permission.service';
import { LoginRedirectService } from './services/login-redirect.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ShardingConfigComponent } from './components/sharding-config/sharding-config.component';
import { ShardingConfigAddOrChangeComponent } from './components/sharding-config-add-or-change/sharding-config-add-or-change.component';
import { MenuConfigComponent } from './components/menu-config/menu-config.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerAddOrChangeComponent } from './components/customer-add-or-change/customer-add-or-change.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DepartmentComponent } from './components/department/department.component';
import { RoleComponent } from './components/role/role.component';
import { PermissionComponent } from './components/permission/permission.component';
import { ValidatePasswordDirective } from './directives/validate-password.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { LanguageComponent } from './components/language/language.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MultipleFileUploadComponent } from './components/multiple-file-upload/multiple-file-upload.component';
import { CategoryComponent } from './components/category-manager/category/category.component';
import { BaseComponent } from './components/base/base.component';
import { VariationthemeEditComponent } from './components/variationtheme/variationtheme-edit/variationtheme-edit.component';

import { FileUploadModule } from 'primeng/fileupload';

import { TemplateComponent } from './components/marketing-management/page-builder/template/template.component';
import { TemplateAddOrChangeComponent } from './components/marketing-management/page-builder/template-add-or-change/template-add-or-change.component';
import { FileUploaderPopupComponent } from './components/common/file-uploader-popup/file-uploader-popup.component';
import { TemplateConfigPositionComponent } from './components/marketing-management/page-builder/template-config-position/template-config-position.component';
import { TemplateRowComponent } from './components/marketing-management/page-builder/template-row/template-row.component';
import { TemplateConfigComponent } from './components/marketing-management/page-builder/template-config/template-config.component';
import { TemplateConfigAddOrChangeComponent } from './components/marketing-management/page-builder/template-config-add-or-change/template-config-add-or-change.component';

import { CategoryAddOrChangeComponent } from './components/category-manager/category-add-or-change/category-add-or-change.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { VendorComponent } from './components/vendor/vendor/vendor.component';
import { VendorAddOrChangeComponent } from './components/vendor/vendor-add-or-change/vendor-add-or-change.component';
import { VendorDetailComponent } from './components/vendor/vendor-detail/vendor-detail.component';

import { ProductlistComponent } from './components/product/productlist/productlist.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductDetailContentComponent } from './components/product/product-detail/product-detail-content/product-detail-content.component';
import { ProductSearchCategoryComponent } from './components/product/product-add-or-change/product-search-category/product-search-category.component';
import { ProductAddExistingComponent } from './components/product/product-add-existing/product-add-existing.component';
import { ProductAddOrChangeComponent } from './components/product/product-add-or-change/product-add-or-change.component';
import { ProductAddOrChangeGeneralComponent } from './components/product/product-add-or-change-general/product-add-or-change-general.component';
import { ProductAttributeInfoComponent } from './components/product/product-add-or-change-general/product-attribute-info/product-attribute-info.component';
import { ProductAttributeLogisticComponent } from './components/product/product-add-or-change-general/product-attribute-logistic/product-attribute-logistic.component';
import { ProductCategoryTreeComponent } from './components/product/product-add-or-change-general/product-category-tree/product-category-tree.component';
import { ProductContentComponent } from './components/product/product-add-or-change-general/product-content/product-content.component';
import { ProductImageComponent } from './components/product/product-add-or-change-general/product-image/product-image.component';
import { ProductRecommendComponent } from './components/product/product-add-or-change-general/product-recommend/product-recommend.component';
import { ProductPreviewComponent } from './components/product/product-add-or-change-general/product-preview/product-preview.component';
import { ProductSeoComponent } from './components/product/product-add-or-change-general/product-seo/product-seo.component';
import { ProductVariantComponent } from './components/product/product-add-or-change-general/product-variant/product-variant.component';

import { BannerComponent } from './components/marketing-management/banner/banner/banner.component';
import { BannerItemComponent } from './components/marketing-management/banner/banner-item/banner-item.component';
import { BannerAddOrChangeComponent } from './components/marketing-management/banner/banner-add-or-change/banner-add-or-change.component';
import { BannerItemAddOrChangeComponent } from './components/marketing-management/banner/banner-item-add-or-change/banner-item-add-or-change.component';
import { ProductAttributeComponent } from './components/product-attribute/product-attribute/product-attribute.component';
import { ProductAttributeAddOrUpdateComponent } from './components/product-attribute/product-attribute-add-or-update/product-attribute-add-or-update.component';
import { ProductAttributeValueComponent } from './components/product-attribute/product-attribute-value/product-attribute-value.component';
import { ProductAttributeValueAddOrUpdateComponent } from './components/product-attribute/product-attribute-value-add-or-update/product-attribute-value-add-or-update.component';
import { MeasureUnitComponent } from './components/measure-unit/measure-unit.component';
import { EmailOrSmsComponent } from './components/email-or-sms/email-or-sms.component';
import { EmaiOrSmsDetailComponent } from './components/emai-or-sms-detail/emai-or-sms-detail.component';
import { EmailOrSmsVerifyDetailComponent } from './components/email-or-sms-verify-detail/email-or-sms-verify-detail.component';
import { CategoryAttrAddOrChangeComponent } from './components/category-manager/category-attr-add-or-change/category-attr-add-or-change.component';
import { VariationThemeComponent } from './components/category-manager/variation-theme/variation-theme.component';
import { ManufacturerComponent } from './components/category-manager/manufacturer/manufacturer.component';
import { MenuBannerMappingComponent } from './components/menu-config/menu-banner-mapping.component';
import { ProductGroupConfigComponent } from './components/product-group-config/product-group-config.component';
import { ProductGroupConfigCategoryComponent } from './components/product-group-config/product-group-config-category.component';
import { ProductGroupConfigVenderComponent } from './components/product-group-config/product-group-config-vendor.component';
import { ProductGroupConfigAttributeComponent } from './components/product-group-config/product-group-config-attribute.component';
import { ManufacturerManagementComponent } from './components/manufacturer/manufacturer-management/manufacturer-management.component';
import { ManufacturerAddOrChangeComponent } from './components/manufacturer/manufacturer-add-or-change/manufacturer-add-or-change.component';
import { ManufacturerDetailsComponent } from './components/manufacturer/manufacturer-details/manufacturer-details.component';
import { LocationComponent } from './components/location/location.component';

import { ProductGroupConfigPriceComponent } from './components/product-group-config/product-group-config-price.component';
import { ProductGroupConfigQuantityComponent } from './components/product-group-config/product-group-config-quantity.component';
import { WarehouseComponent } from './components/warehouse-manager/warehouse/warehouse.component';
import { WarehouseAddOrChangeComponent } from './components/warehouse-manager/warehouse-add-or-change/warehouse-add-or-change.component';
import { WarehouseAddressComponent } from './components/warehouse-manager/warehouse-address/warehouse-address.component';
import { VariationthemeManagerComponent } from './components/variationtheme/variationtheme-manager/variationtheme-manager.component';

import { ProductGroupConfigManufacturerComponent } from './components/product-group-config/product-group-config-manufacturer.component';
import { ProductGroupConfigWarehouseComponent } from './components/product-group-config/product-group-config-warehouse.component';
import { ProductGroupConfigProductComponent } from './components/product-group-config/product-group-config-product.component';
// import { WarehouseDetailComponent } from './components/warehouse-manager/warehouse-detail/warehouse-detail.component';

import { MenuPositionComponent } from './components/menu-config/menu-position.component';
import { ProvinceAddComponent } from './components/location/province-add/province-add.component';
import { ProvinceDetailComponent } from './components/location/province-detail/province-detail.component';
import { DistrictComponent } from './components/location/district/district.component';
import { WardComponent } from './components/location/ward/ward.component';
import { StreetComponent } from './components/location/street/street.component';
import { ConfigComponent } from './components/config/config.component';
import { TemplateDefineComponent } from './components/marketing-management/template-define.component';
import { TemplateDefineHtmlComponent } from './components/marketing-management/template-define-html.component';
import { StreetListComponent } from './components/location/street-list/street-list.component';






const routesConfig: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'login/:returnUrl',
    component: LoginComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'g',
    component: LayoutComponent,
    canActivate: [CheckPermissionService],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'shardingconfig',
        component: ShardingConfigComponent
      },
      {
        path: 'menuconfig',
        component: MenuConfigComponent
      },
      {
        path: 'menuposition',
        component: MenuPositionComponent
      },
      {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'DetailCustomer/:id',
        component: CustomerDetailComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'roles/:departmentid/:customerid',
        component: RoleComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'permission/:roleid',
        component: PermissionComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'language',
        component: LanguageComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template',
        component: TemplateComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template-add',
        component: TemplateAddOrChangeComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template-change/:id',
        component: TemplateAddOrChangeComponent,
        canActivate: [CheckPermissionService]
      },      
      {
        path: 'measure-unit',
        component: MeasureUnitComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'email-or-sms',
        component: EmailOrSmsComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'DetailEmailSms/:id',
        component: EmaiOrSmsDetailComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'VerifyDetailEmailSms/:id',
        component: EmailOrSmsVerifyDetailComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'vendor',
        component: VendorComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'DetailVendor/:id',
        component: VendorDetailComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template/template-config-position/:templateId',
        component: TemplateConfigPositionComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template/template-config/:templateId',
        component: TemplateConfigComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template/template-config-add/:templateId',
        component: TemplateConfigAddOrChangeComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template/template-config-change/:templateId/:id',
        component: TemplateConfigAddOrChangeComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'products',
        component: ProductlistComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'product/search-category',
        component: ProductSearchCategoryComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'product/:id',
        component: ProductAddOrChangeComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'product/add-existing/:id',
        component: ProductAddExistingComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'banner',
        component: BannerComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'banner-item/:bannerId',
        component: BannerItemComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'product-attribute',
        component: ProductAttributeComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'product-attribute/:attributeId',
        component: ProductAttributeValueComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'product-group-config',
        component: ProductGroupConfigComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'location',
        component: LocationComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'manufacturer',
        component: ManufacturerManagementComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'manufacturerdetails/:id',
        component: ManufacturerDetailsComponent,
        canActivate: [CheckPermissionService]
      },

      {
        path: 'warehouse/:id',
        component: WarehouseComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'location/province-add',
        component: ProvinceAddComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'location/province-detail',
        component: ProvinceDetailComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'location/district',
        component: DistrictComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'location/ward',
        component: WardComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'location/street',
        component: StreetComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'config',
        component: ConfigComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'template-define',
        component: TemplateDefineComponent,
        canActivate: [CheckPermissionService]
      },
      {
        path: 'street-list',
        component: StreetListComponent,
        canActivate: [CheckPermissionService]
      },
      // {
      //   path: 'warehouse-detail/:id',
      //   component: WarehouseDetailComponent,
      //   canActivate: [CheckPermissionService]
      // },
      // {
      //   path: 'DetailVariationTheme/:id',
      //   component: VariationDetailComponent,
      //   canActivate: [CheckPermissionService]
      // },

    
      {
        path: 'variationtheme',
        component: VariationthemeManagerComponent,
        canActivate: [CheckPermissionService]
      }
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EqualValidator,
    ShardingConfigComponent,
    ShardingConfigAddOrChangeComponent,
    MenuConfigComponent,
    CustomerComponent,
    CustomerAddOrChangeComponent,
    LayoutComponent,
    DepartmentComponent,
    RoleComponent,
    PermissionComponent,
    ValidatePasswordDirective,
    CustomerDetailComponent,
    LanguageComponent,
    FileUploadComponent,
    MultipleFileUploadComponent,
    CategoryComponent,
    BaseComponent,
    TemplateComponent,
    TemplateAddOrChangeComponent,
    FileUploaderPopupComponent,
    TemplateConfigPositionComponent,
    TemplateRowComponent,
    TemplateConfigComponent,
    TemplateConfigAddOrChangeComponent,
    BannerComponent,
    BannerItemComponent,
    BannerAddOrChangeComponent,
    BannerItemAddOrChangeComponent,    
    MeasureUnitComponent,
    EmailOrSmsComponent,
    EmaiOrSmsDetailComponent,
    EmailOrSmsVerifyDetailComponent,
    VendorComponent,
    VendorAddOrChangeComponent,
    VendorDetailComponent,
    CategoryAddOrChangeComponent,
    ProductlistComponent,
    ProductDetailComponent,
    ProductDetailContentComponent,
    ProductAddExistingComponent,
    ProductAddOrChangeComponent,
    ProductSearchCategoryComponent,
    ProductAddOrChangeGeneralComponent,
    ProductAttributeInfoComponent,
    ProductAttributeLogisticComponent,
    ProductCategoryTreeComponent,
    ProductContentComponent,
    ProductImageComponent,
    ProductPreviewComponent,
    ProductRecommendComponent,
    ProductSeoComponent,
    ProductVariantComponent,
    ProductAttributeComponent,
    ProductAttributeAddOrUpdateComponent,
    ProductAttributeValueComponent,
    ProductAttributeValueAddOrUpdateComponent,
    CategoryAttrAddOrChangeComponent,    
    VariationThemeComponent,
    ManufacturerComponent,
    MenuBannerMappingComponent,
    ProductGroupConfigComponent,
    ProductGroupConfigCategoryComponent,
    ProductGroupConfigVenderComponent,
    ProductGroupConfigAttributeComponent,
    ProductGroupConfigCategoryComponent,
    MenuBannerMappingComponent,
    ManufacturerManagementComponent,
    ManufacturerAddOrChangeComponent,
    ManufacturerDetailsComponent,
    ProductGroupConfigAttributeComponent,
    ProductGroupConfigPriceComponent,
    ProductGroupConfigQuantityComponent,
    MenuBannerMappingComponent,
    LocationComponent,
    WarehouseComponent,
    WarehouseAddOrChangeComponent,
    WarehouseAddressComponent,
    ProductGroupConfigManufacturerComponent,
    ProductGroupConfigWarehouseComponent,
    ProductGroupConfigProductComponent,
    MenuPositionComponent,
    ProductGroupConfigWarehouseComponent,
    ProvinceAddComponent,
    ProvinceDetailComponent,
    DistrictComponent,
    WardComponent,
    StreetComponent,
    ConfigComponent,
    TemplateDefineComponent,
    TemplateDefineHtmlComponent,
    StreetListComponent,
    // WarehouseDetailComponent,
    ProductGroupConfigQuantityComponent,
    MenuBannerMappingComponent,
    VariationthemeEditComponent,
    ProductGroupConfigCategoryComponent,
    LocationComponent,
    
    VariationthemeManagerComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routesConfig),
    NgxPaginationModule,
    CKEditorModule,
    NgbModule.forRoot(),
    // FileUploadModule,
    AutoCompleteModule
  ],
  exports: [
    RouterModule,
    EqualValidator
  ]
})

export class AppRoutingModule {

}
