import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-seo',
  templateUrl: './product-seo.component.html',
  styleUrls: ['./product-seo.component.css']
})
export class ProductSeoComponent implements OnInit {
  @Output() setTab = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
