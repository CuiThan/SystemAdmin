import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';
import { ProductContentModel } from '../../../../models/product-model/product-content-model';
import { ProductAttributeInfoModel, ProductAttributeInfo } from '../../../../models/product-model/product-attribute-info-model';
import { MeasureUnitSearchRequestModel } from '../../../../models/measure-unit-search-request-model';
import { AttributeCategoryMappingService } from '../../../../services/attribute-category-mapping.service';
import { MeasureUnitService } from '../../../../services/measure-unit.service';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-attribute-info',
  templateUrl: './product-attribute-info.component.html',
  styleUrls: ['./product-attribute-info.component.css']
})
export class ProductAttributeInfoComponent implements OnInit {
  @Output() setTab = new EventEmitter<string>();

  productModel: ProductAttributeInfoModel;
  productAttributeInfo: ProductAttributeInfo;
  attributes: any;
  measureUnits: any;
  formValid = true;

  constructor(
    private attrCategoryService: AttributeCategoryMappingService,
    private measureUnitService: MeasureUnitService
  ) { }

  ngOnInit() {
    this.attributes = [];
    this.measureUnits = [];
    this.productModel = new ProductAttributeInfoModel();
    this.productModel.ProductAttributeInfo = new Array<ProductAttributeInfo>();
    this.productAttributeInfo = new ProductAttributeInfo();

    // Khởi tạo dữ liệu ban đầu
    this.ngInitData();
  }

  async ngInitData(): Promise<void> {
    try {
      App.blockUI();

      const attrCategories = await this.attrCategoryService.getAttributeCategoryByCategoryId('611C3508-8183-4CDC-BF53-5BC1FC642C04');
      this.attributes = attrCategories.attributes;

      const measureUnits = await this.measureUnitService.search(new MeasureUnitSearchRequestModel());
      this.measureUnits = measureUnits.measureUnits;

      // Sau khi init data load select2 vào các select box
      $('.select2').select2({ placeholder: 'Lựa chọn thuộc tính', allowClear: true });
      $('.select2-unit').select2({ placeholder: 'Lựa chọn đơn vị', allowClear: true });

      App.unblockUI();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  ngGetDataForm() {
    // Khởi tạo lại mảng dữ liệu
    this.productModel.ProductAttributeInfo = new Array<ProductAttributeInfo>();
    // Tìm kiếm các control và giá trị
    for (let i = 0; i < this.attributes.length; i++) {
      // Select các dữ liệu chung như select, text, textarea
      const selector = $('#dynamicField_' + i);
      // Dữ liệu Unit
      const unitId = $('#unitId_' + i);
      if (selector.length === 1) {
        const attribute = this.attributes[i];
        const attributeId = selector.attr('attributeId');
        const attributeType = selector.attr('attributeType');
        let value = '';
        let measureUnit = '';
        // Kiểm tra nếu selector tồn tại thì lấy giá trị
        if (selector.val() != null) {
          value = selector.val().split(':').pop().trim();
        }
        // Kiểm tra nếu dữ liệu Unit tồn tại thì lấy giá trị
        if (unitId.val() != null && unitId.val() !== undefined) {
          measureUnit = unitId.val().split(':').pop().trim();
        } else {
          measureUnit = '';
        }
        // const temp = attributeId + '_' + attributeType + '_' + attribute.attributeName + '_' + value + '_' + measureUnit;

        // Tạo object lưu trữ dữ liệu
        this.productAttributeInfo = new ProductAttributeInfo();
        this.productAttributeInfo.attributeId = attributeId;
        this.productAttributeInfo.attributeType = attributeType;
        this.productAttributeInfo.attributeName = attribute.attributeName;
        this.productAttributeInfo.value = value;
        this.productAttributeInfo.unitId = measureUnit;

        // Đẩy vào mảng dữ liệu
        this.productModel.ProductAttributeInfo.push(this.productAttributeInfo);
      }
    }
  }

  onSubmit(form: any, model: ProductAttributeInfoModel) {
    App.blockUI();
    this.formValid = form.valid;
    if (this.formValid) {
      // Lấy thông tin form
      this.ngGetDataForm();

      // Chuyển tab
      this.setTab.emit('tab-3');
    } else {
      App.unblockUI();
    }
  }
}
