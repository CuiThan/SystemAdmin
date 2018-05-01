import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-detail-content',
  templateUrl: './product-detail-content.component.html',
  styleUrls: ['./product-detail-content.component.css']
})
export class ProductDetailContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#etalage').etalage({
      zoom_area_width: 500,
      zoom_area_height: 500,
      zoom_area_distance: 5,
      small_thumbs: 4,
      smallthumb_inactive_opacity: 0.3,
      smallthumbs_position: 'left',
      show_icon: false,
      autoplay: false,
      keyboard: false,
      zoom_easing: false
    });
  }
}
