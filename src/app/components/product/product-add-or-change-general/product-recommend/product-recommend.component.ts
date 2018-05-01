import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-recommend',
  templateUrl: './product-recommend.component.html',
  styleUrls: ['./product-recommend.component.css']
})
export class ProductRecommendComponent implements OnInit {
  @Output() setTab = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
