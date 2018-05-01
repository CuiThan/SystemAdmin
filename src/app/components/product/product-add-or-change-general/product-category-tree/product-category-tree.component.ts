import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-category-tree',
  templateUrl: './product-category-tree.component.html',
  styleUrls: ['./product-category-tree.component.css']
})
export class ProductCategoryTreeComponent implements OnInit {
  @Output() setTab = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
}
