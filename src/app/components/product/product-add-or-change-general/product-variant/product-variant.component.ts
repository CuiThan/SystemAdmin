import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ConfigSetting } from '../../../../common/configSetting';
import { KeyValueModel } from '../../../../models/result-model';
import { VariationThemeService } from '../../../../services/variation-theme.service';
import { WarehouseService } from '../../../../services/warehouse.service';
import { MeasureUnitService } from '../../../../services/measure-unit.service';
import { WarehouseModel } from '../../../../models/warehouse/warehouse-model';
import { ProductVariantModel } from '../../../../models/product-model/product-variant-model';
import { WarehouseSearchRequest } from '../../../../models/warehouse/warehouse-search-request';
import { MeasureUnitSearchRequestModel } from '../../../../models/measure-unit-search-request-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-variant',
  templateUrl: './product-variant.component.html',
  styleUrls: ['./product-variant.component.css']
})
export class ProductVariantComponent implements OnInit {
  @Output() setTab = new EventEmitter<string>();

  productVariant: ProductVariantModel;
  warehouseParams: WarehouseSearchRequest;
  warehouses: KeyValueModel[];
  warehousesTable: KeyValueModel[];
  measureUnits: any;
  formValid = true;
  showWarehouse = false;
  showVariant = false;

  constructor(
    private variationThemService: VariationThemeService,
    private warehouseService: WarehouseService,
    private measureUnitService: MeasureUnitService
  ) { }

  ngOnInit() {
    this.warehouseParams = new WarehouseSearchRequest();
    this.productVariant = new ProductVariantModel();
    this.productVariant.attributeVariants = [];
    this.warehousesTable = [];
    this.measureUnits = [];

    // Init Data
    this.ngInitData();
  }

  async ngInitData(): Promise<void> {
    try {
      App.blockUI();

      // Nhà cung cấp
      this.onRegisterVendors();

      // Lấy danh sách thuộc tính biến thể
      const variationTheme = await this.variationThemService.getMappingByVariationThemeId(2);
      this.productVariant.attributeVariants = variationTheme.variationThemeAttributes;

      // Đơn vị
      const measureUnits = await this.measureUnitService.search(new MeasureUnitSearchRequestModel());
      this.measureUnits = measureUnits.measureUnits;

      // Đăng ký select2
      setTimeout(() => {
        $('.select2-reg').select2({ placeholder: 'Lựa chọn giá trị' });
        $('.select2-unit').select2({ placeholder: 'Lựa chọn đơn vị' });
      }, 300);

      App.unblockUI();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  ngGetDataForm() {
    //#region Trường hợp không có thuộc tính biến thể

    // Tìm kiếm các control và giá trị từ trong mảng
    for (let i = 0; i < this.warehousesTable.length; i++) {
      // Kiểm tra xem có tồn tại row không
      const selector = $('#warehouse_' + i);
      if (selector.length === 1) {
        const warehouse = this.warehousesTable[i];
        const quantity = $('#quantity_' + i).val();
        const sellPrice = $('#sellPrice_' + i).val();
        const originalPrice = $('#originalPrice_' + i).val();

        const temp = warehouse.value + '_' + warehouse.text + '_' + quantity + '_' + sellPrice + '_' + originalPrice;
        console.log(temp);
      }
    }

    //#endregion

  }

  //#region RegisterSelect2Vendors

  async onRegisterVendors(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#vendorId',
        ConfigSetting.UrlPathGetVendors,
        this.createParametersFun,
        $this,
        'Lựa chọn nhà cung cấp',
        this.processResults,
        this.formatRepo,
        this.formatRepoSelection,
        this.selectComponentEvent,
        null,
        1
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFun(params, $this) {
    if (params.term === undefined) { params.term = ''; }
    const query = {
      name: params.term
    };
    return query;
  }
  formatRepo(repo) {
    if (repo.loading) { return repo.text; }
    return repo.text;
  }
  formatRepoSelection(repo) {
    return repo.text;
  }
  processResults(data, params) {
    return {
      results: data
    };
  }
  async selectComponentEvent(e, $this) {
    const id = e.params.data.id;
    $this.productVariant.vendorId = id;

    // Lấy thông tin warehouse theo vendor
    $this.warehouseParams.vendorId = id;
    const response = await $this.warehouseService.getWarehouses($this.warehouseParams);

    // Set giá trị vào list
    $this.warehouses = response;
    $this.showWarehouse = true;

    setTimeout(() => {
      $('#warehouseSelected').select2({ placeholder: 'Lựa chọn kho hàng', allowClear: true });
    }, 300);
  }

  //#endregion

  onAddWarehouse() {
    const selector = $('#warehouseSelected');
    if (selector.length === 1) {
      const dataId = selector.select2('data');
      if (dataId.length > 0) {
        // Đẩy thông tin warehouse vào list
        const id = dataId[0].id.split(':').pop().trim();
        const text = dataId[0].text.trim();
        const temp = new KeyValueModel();
        temp.value = id;
        temp.text = text;
        this.warehousesTable.push(temp);

        // Xóa dữ liệu đã thêm
        this.warehouses = $.grep(this.warehouses, function (val) {
          return val.value !== id;
        });
      } else {
        ConfigSetting.ShowError('Lựa chọn kho hàng trước khi thêm.');
      }
    }
  }

  onRemoveWarehouse(id: string, name: string) {
    if (id.length > 0 && name.length > 0) {
      const temp = new KeyValueModel();
      temp.value = id;
      temp.text = name;
      this.warehouses.push(temp);

      // Xóa dữ liệu đã thêm
      this.warehousesTable = $.grep(this.warehousesTable, function (val) {
        return val.value !== id;
      });
    }
  }

  onAddAttributeVariant(attributeValueVariants: any) {
    // Add để tạo thêm 1 dòng lựa chọn mới
    attributeValueVariants.push(null);

    // Đăng ký lại select2, dành cho trường hợp select box
    setTimeout(() => {
      $('.select2-reg').select2({ placeholder: 'Lựa chọn giá trị' });
    }, 300);
  }

  onRemoveAttributeVariant(attributeValueVariants: any, index: any) {
    if (attributeValueVariants.length > 1) {
      // Xóa element by index
      attributeValueVariants.splice(index, 1);
    } else {
      ConfigSetting.ShowError('Cần tồn tại ít nhất 1 giá trị');
    }
  }

  async onCreateVariants() {
    // Kiểm tra xem đã lựa chọn nhà cung cấp chưa
    const vendorId = this.productVariant.vendorId;
    if (vendorId !== 0 && vendorId !== undefined) {
      // Lấy thông tin warehouse theo vendor
      this.warehouseParams.vendorId = vendorId.toString();
      const response = await this.warehouseService.getWarehouses(this.warehouseParams);
      this.warehouses = response;

      // Ánh xạ dữ liệu tạm
      const temp = JSON.parse(JSON.stringify(this.productVariant.attributeVariants));

      // Lặp lại các thuộc tính
      for (let i = 0; i < temp.length; i++) {
        const item = temp[i];
        // Trường hợp Text Area, xét giá trị vào luôn mảng giá trị
        if (item.attributeType !== 2 && item.attributeType !== 4) {
          // Lấy giá trị từ người dùng
          const selector = $('#dynamicField_' + i);
          if (selector.length === 1) {
            item.attributeValueVariants[0] = selector.val().trim();
          } else {
            item.attributeValueVariants[0] = '';
          }
        } else {
          // Lặp lại các giá trị lựa chọn
          for (let x = 0; x < item.attributeValueVariants.length; x++) {
            // Biến động chứa dữ liệu element
            const selectorVariant = $('#dynamicField_' + i + '_' + x);

            if (selectorVariant.length === 1) {
              if (selectorVariant.val() !== null) {
                item.attributeValueVariants[x] = selectorVariant.val().split(':').pop().trim();
              } else {
                item.attributeValueVariants[x] = '';
              }
            } else {
              item.attributeValueVariants[x] = '';
            }
          }
        }
      }

      // Show form biến thể
      this.showVariant = true;

      console.log(temp);
    } else {
      ConfigSetting.ShowError('Chưa chọn thông tin nhà cung cấp');
    }
  }

  onSubmit(form: any, model: ProductVariantModel) {
    this.ngGetDataForm();

    // App.blockUI();
    // this.formValid = form.valid;
    // if (this.formValid) {
    //   // Lấy thông tin form
    //   this.ngGetDataForm();

    //   // Chuyển tab
    //   this.setTab.emit('tab-5');
    // } else {
    //   App.unblockUI();
    // }
  }
}
