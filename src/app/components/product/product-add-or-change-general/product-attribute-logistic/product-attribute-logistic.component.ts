import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductAttributeLogisticModel } from '../../../../models/product-model/product-attribute-logistic-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-attribute-logistic',
  templateUrl: './product-attribute-logistic.component.html',
  styleUrls: ['./product-attribute-logistic.component.css']
})
export class ProductAttributeLogisticComponent implements OnInit {
  @Output() setTab = new EventEmitter<string>();

  productAttributeLogistic: ProductAttributeLogisticModel;
  formValid = true;

  constructor() { }

  ngOnInit() {
    this.productAttributeLogistic = new ProductAttributeLogisticModel();
    this.productAttributeLogistic.typeId = 3;
  }

  onSubmit(form: any, model: ProductAttributeLogisticModel) {
    App.blockUI();
    this.formValid = form.valid;
    if (this.formValid) {
      this.setTab.emit('tab-4');
    } else {
      App.unblockUI();
    }
  }
}
