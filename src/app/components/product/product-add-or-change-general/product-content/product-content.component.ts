import { ConfigSetting } from './../../../../common/configSetting';
import { KeyValueModel } from './../../../../models/result-model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductContentModel } from '../../../../models/product-model/product-content-model';
import { ManufacturerManagementService } from '../../../../services/manufacturer-management.service';
import { VariationThemeService } from '../../../../services/variation-theme.service';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.css']
})
export class ProductContentComponent implements OnInit {
  @Output() setTab = new EventEmitter<string>();

  productContent: ProductContentModel;
  typeList: KeyValueModel[];
  formValid = true;
  config = {
    allowedContent: true,
    extraPlugins: 'divarea'
  };

  constructor() { }

  ngOnInit() {
    this.productContent = new ProductContentModel();
    this.ngInitData();
  }

  ngInitData() {
    // // Đơn vị tính
    // const units = ['1 hộp', 'Bộ 4 cây', 'Chùm', 'Bom', 'Thép', 'Bắp', 'Vỉ 2 lọ', '4 chiếc/bộ', 'mét', '2 viên/vỉ', 'Phuy', '10 chiếc/vỉ',
    //   'Chai', 'Cam', 'Ống', 'Ram', '3 hộp', 'Bìa', 'Gói', 'Gọi', 'Vỉ 1 chiếc', 'Chi', 'cdac', '10 cuộn/1túi', 'Giỏ 10 quả', 'Cotton', 'Lốc 2',
    //   'Lon', '6 chiếc/bộ', 'Chai xịt', 'Hồng', 'Giỏ', 'Kg', 'Niêu', 'Thẻ', 'Củ', 'Đôi', '12 cuộn/túi', '2 chiếc/vỉ', 'Album', 'Bao', 'Đĩa', 'Bloc',
    //   'Chiết', 'Chiếu', 'Vàng', 'Cây', '2 chiếc/túi', 'Can', 'Bạc', 'Các', 'Chiếc', 'Cục', 'Enesti', 'Lốc', 'Bát', 'Cụm', 'Hộp 2 chiếc', 'PACK', 'gam',
    //   '6 cốc/bộ', 'Ca', 'Cá', 'gram', 'Bịch', 'Combo', 'Cặp', 'Cặp', 'Tập 5 cuốn', '5 đôi/vỉ', 'Chậu', 'Chậu', 'Vái', 'Bình thường', 'Bộ 4 chiếc', 'Thỏi',
    //   'Lẵng', 'Nải', 'Vỉ', 'Vỉ', 'Cây/Lọ', 'Chếc', 'LY', 'Tô', 'Tờ', 'Tộ', 'Túi lưới', 'Bánh', 'Vỉ 3 chiếc', 'Viên', '3 chiếc/bộ', 'Bóng', 'Đen', 'Hôp', 'Hộp',
    //   'PHONG', 'THANH', '2 hộp', 'Cành', 'Cuốn', 'Cuộn', 'Quả', 'Quả', 'Qủa', '20 chiếc/túi', 'Sợi', 'Vỉ 2 chiếc', 'Góp', 'Hộp 2 bóng', 'Miếng', 'Que', 'Ream',
    //   'Tủ', 'Túi', '4 chiếc/túi', 'Bình', 'Bó', 'bô', 'Bộ', 'Bộ', 'Cái', 'Chai', 'Chái', 'Chải', 'Chiếc', 'Tập', 'Xấp', '9 chiếc/bộ', 'Cốc', 'Cọc', 'Khay', 'Ly ',
    //   'Quyển', 'Quyển', 'Tuýp', 'Con', 'Hũ', 'Hủ', '9 chiếc/bộ', 'Cốc', 'Cọc', 'Khay', 'Quyển', 'Set', 'Tuýp', '20 chiếc/1túi', '3 chiếc/bộ', 'Bóng', 'Đen', 'Hộp',
    //   'PHONG', 'Thanh', 'Con', 'Hôpk', 'Hũ', 'Hủ', 'Lô', 'Lọ', 'Chi', '2 hộp', 'Cành', 'Cuốn', 'Cuộn', 'Cuộn', 'Quả', 'Cái', 'CHAI', 'Chái', 'Chải', 'Chiếc', 'Tập',
    //   'Xấp', '1 hộp', 'Bộ 4 cây', 'Chùm', '10 cuộn/1túi', '5 chiếc/vỉ', 'Giỏ 10 quả', 'Thùng'];
    // $('#measureUnitId').select2({ data: units });

    // Loại mặt hàng
    this.typeList = [{ value: '1', text: 'Bình thường', checked: false }, { value: '2', text: 'Tươi sống', checked: false },
    { value: '3', text: 'Cồng kềnh', checked: false }, { value: '4', text: 'Rau VIP', checked: false }, { value: '5', text: 'Thẻ Online', checked: false }];

    // Thương hiệu
    this.onRegisterManufacturers();

    // Đơn vị tính
    this.onRegisterMeasureUnit();

    // Nhóm thuộc tính tạo biến thể
    this.onRegisterGroupAttribute();
  }

  //#region RegisterSelect2Manufacturers

  async onRegisterManufacturers(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#manufacturerId',
        ConfigSetting.UrlPathGetManufacturers,
        this.createParametersFunManufacturers,
        $this,
        'Lựa chọn thương hiệu',
        this.processResultsManufacturers,
        this.formatRepoManufacturers,
        this.formatRepoSelectionManufacturers,
        this.selectComponentEventManufacturers,
        null,
        1
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunManufacturers(params, $this) {
    if (params.term === undefined) { params.term = ''; }
    const query = {
      name: params.term
    };
    return query;
  }
  formatRepoManufacturers(repo) {
    if (repo.loading) { return repo.text; }
    return repo.text;
  }
  formatRepoSelectionManufacturers(repo) {
    return repo.text;
  }
  processResultsManufacturers(data, params) {
    return {
      results: data
    };
  }
  selectComponentEventManufacturers(e, $this) {
    const id = e.params.data.id;
    $this.productContent.manufacturerId = id;
  }

  //#endregion

  //#region RegisterSelect2MeasureUnit

  async onRegisterMeasureUnit(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#measureUnitId',
        ConfigSetting.UrlPathGetManufacturers,
        this.createParametersFunMeasureUnit,
        $this,
        'Chọn đơn vị',
        this.processResultsMeasureUnit,
        this.formatRepoMeasureUnit,
        this.formatRepoSelectionMeasureUnit,
        this.selectComponentEventMeasureUnit,
        null,
        1
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunMeasureUnit(params, $this) {
    if (params.term === undefined) { params.term = ''; }
    const query = {
      name: params.term
    };
    return query;
  }
  formatRepoMeasureUnit(repo) {
    if (repo.loading) { return repo.text; }
    return repo.text;
  }
  formatRepoSelectionMeasureUnit(repo) {
    return repo.text;
  }
  processResultsMeasureUnit(data, params) {
    return {
      results: data
    };
  }
  selectComponentEventMeasureUnit(e, $this) {
    const id = e.params.data.id;
    $this.productContent.measureUnitId = id;
  }

  //#endregion

  //#region RegisterSelect2GroupAttribute

  async onRegisterGroupAttribute(): Promise<void> {
    const $this = this;
    try {
      ConfigSetting.Select2AjaxRegister(
        '#groupAttributeId',
        ConfigSetting.UrlPathGetCategoryVariationThemes,
        this.createParametersFunGroupAttribute,
        $this,
        'Lựa chọn nhóm thuộc tính tạo biến thể',
        this.processResultsGroupAttribute,
        this.formatRepoGroupAttribute,
        this.formatRepoSelectionGroupAttribute,
        this.selectComponentEventGroupAttribute,
        null,
        0,
        0
      );
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  createParametersFunGroupAttribute(params, $this) {
    if (params.term === undefined) { params.term = ''; }
    const query = {
      // CategoryId: params.term
      CategoryId: '611C3508-8183-4CDC-BF53-5BC1FC642C04'
    };
    return query;
  }
  formatRepoGroupAttribute(repo) {
    if (repo.loading) { return repo.text; }
    return repo.text;
  }
  formatRepoSelectionGroupAttribute(repo) {
    return repo.text;
  }
  processResultsGroupAttribute(data, params) {
    return {
      results: data
    };
  }
  selectComponentEventGroupAttribute(e, $this) {
    const id = e.params.data.id;
    $this.productContent.groupAttributeId = id;
  }

  //#endregion

  onSubmit(form: any, model: ProductContentModel) {
    App.blockUI();
    this.formValid = form.valid;
    if (this.formValid) {
      this.setTab.emit('tab-2');
    } else {
      App.unblockUI();
    }
  }
}
