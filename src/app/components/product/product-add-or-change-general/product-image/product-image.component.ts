import { MultipleFileUploadComponent } from './../../../multiple-file-upload/multiple-file-upload.component';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { ProductImageModel } from '../../../../models/product-model/product-image-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {
  @Output() setTab = new EventEmitter<string>();
  @ViewChild(MultipleFileUploadComponent) multipleFileUpload: MultipleFileUploadComponent;

  productImage: ProductImageModel;
  formValid = true;

  constructor() { }

  ngOnInit() {
    this.productImage = new ProductImageModel();
    this.productImage.attributeVariants = [];
  }

  onSubmit(form: any, model: ProductImageModel) {
    debugger;
    const abc = this.multipleFileUpload.uploadedFiles;
    // console.log(abc);
    // App.blockUI();
    // this.formValid = form.valid;
    // if (this.formValid) {
    //   this.setTab.emit('tab-6');
    // } else {
    //   App.unblockUI();
    // }
  }
}
