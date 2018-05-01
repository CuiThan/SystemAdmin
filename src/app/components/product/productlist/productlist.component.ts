import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigSetting } from '../../../common/configSetting';

declare var jQuery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onDetail(): Promise<void> {
    try {
      $('#product-detail').modal('show');
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
