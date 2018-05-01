import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTabChangeEvent, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

declare var jQuery: any;
declare var $: any;
declare var App: any;
declare var CKEDITOR: any;

@Component({
  selector: 'app-product-add-or-change-general',
  templateUrl: './product-add-or-change-general.component.html',
  styleUrls: ['./product-add-or-change-general.component.css']
})
export class ProductAddOrChangeGeneralComponent implements OnInit {
  @ViewChild('tabs') tabs: NgbTabset;

  constructor() {
  }

  ngOnInit() {
  }

  setTab(activeId: string) {
    this.tabs.activeId = activeId;
    this.tabs.select(activeId);
  }

  public beforeChange($event: NgbTabChangeEvent) {
    const currentTab = $event.nextId;
    switch (currentTab) {
      case 'tab-1':
        break;
      case 'tab-2':
        break;
    }

    $('html, body').animate({ scrollTop: 0 }, 'slow');
  }
}
