import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';

import { MenuManagerModel, MenuModel } from '../../models/menu-manager-model';
import { KeyValueModel } from '../../models/result-model';

import { MenuService } from '../../services/menu.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MenuBannerMappingComponent } from '../menu-config/menu-banner-mapping.component';

declare var App: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-menu-config',
  templateUrl: './menu-config.component.html',
  styleUrls: ['./menu-config.component.css']
})
export class MenuConfigComponent implements OnInit {
  @ViewChild(MenuBannerMappingComponent) menuBannerMapping: MenuBannerMappingComponent;
  model: MenuManagerModel;
  onGetStatus: boolean;
  onAddOrChangeStatus: boolean;
  formValid: boolean;
  onInitStatus: boolean;
  showFormMenu: boolean;
  componentType: number;
  languageIdSearchParam = '';
  positionIdSearchParam = '';
  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.model = new MenuManagerModel();
    this.model.menu = new MenuModel();
    this.model.menu.type = 0;
    this.model.menu.positionId = '';
    this.model.formState = 0;
    this.formValid = true;
    this.onInit();
  }
  async onInit(): Promise<void> {
    this.showFormMenu = false;
    if (this.onInitStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onInitStatus = true;
    try {
      const languageId = this.languageIdSearchParam;
      const positionId = this.positionIdSearchParam;
      const response = await this.menuService.gets(languageId, positionId);
      this.model.languages = response.languages;
      this.model.menus = response.menus;
      this.model.positions = response.positions;
      this.componentType = response.componentType;
      if (this.languageIdSearchParam === '') {
        this.languageIdSearchParam = response.languageDefaultId;
      }
      this.registerMenusTree();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onInitStatus = false;
      App.unblockUI();
    }
  }
  async onGet(id: string, formState: number): Promise<void> {
    this.showFormMenu = true;
    if (this.onGetStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onGetStatus = true;
    try {
      const languageId = this.languageIdSearchParam;
      const positionId = this.positionIdSearchParam;
      const response = await this.menuService.get(languageId, id, positionId);
      this.model.formState = formState;
      this.model.types = response.types;
      this.model.positions = response.positions;
      this.model.parents = response.parents;
      this.model.languages = response.languages;
      this.model.menu = response.menu;
      this.registerParentsTree();
      this.onShowFormBannerMapping();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onGetStatus = false;
      App.unblockUI();
    }
  }
  registerParentsTree(): void {
    const menus = {
      'core': {
        'data': []
      }
    };
    for (let i = 0; i < this.model.parents.length; i++) {
      const menu = this.model.parents[i];
      const menuItem = {
        'id': menu.id,
        'parent': menu.parentId === '' ? '#' : menu.parentId,
        'text': menu.name,
        'data': menu
      };
      menus.core.data.push(menuItem);
    }
    try {
      $('.parents').jstree(true).settings.core.data = menus.core.data;
    } catch (ex) {
      $('.parents').jstree(menus);
    }
    const $that = this;
    $('.parents').on('select_node.jstree', function (event, node) {
      const selectedNode = node.node;
      $that.model.menu.parentId = selectedNode.data.id;
    });
    if (this.model.menu.parentId != null && this.model.menu.parentId !== undefined && this.model.menu.parentId.length > 0) {
      $('.parents').one('refresh.jstree', function () { $('.parents').jstree(true).select_node($that.model.menu.parentId); });
    } else {
      $('.parents').one('refresh.jstree', function () { $('.parents').jstree('deselect_all'); });
    }
    $('.parents').jstree(true).refresh();
  }
  registerMenusTree(): void {
    const menus = {
      'core': {
        'data': []
      }
    };
    if (this.model.menus == null || this.model.menus === undefined || this.model.menus.length <= 0) {
      menus.core.data = [];
    } else {
      for (let i = 0; i < this.model.menus.length; i++) {
        const menu = this.model.menus[i];
        const menuItem = {
          'id': menu.id,
          'parent': menu.parentId === '' ? '#' : menu.parentId,
          'text': menu.name,
          'data': menu
        };
        menus.core.data.push(menuItem);
      }
    }
    try {
      $('#menus').jstree(true).settings.core.data = menus.core.data;
      $('#menus').jstree(true).refresh();
    } catch (ex) {
      $('#menus').jstree(menus);
      // $('#menus').jstree(true).refresh();
    }
    const $that = this;
    $('#menus').on('select_node.jstree', function (event, node) {
      const selectedNode = node.node;
      $that.onGet(selectedNode.data.id, 2);
    });

  }
  async onAddOrChange(form): Promise<void> {
    if (this.onAddOrChangeStatus) {
      ConfigSetting.ShowWaiting();
      return;
    }
    App.blockUI();
    this.onAddOrChangeStatus = true;
    try {
      this.formValid = form.valid && this.model.menu.type > 0;
      if (this.formValid) {
        const requestModel = this.model.menu;
        const response = await this.menuService.addOrChange(requestModel);
        if (response.status) {
          this.onInit();
          ConfigSetting.ShowSuccess('Register success.');
        } else {
          ConfigSetting.ShowErrores(response.messages);
        }
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    finally {
      this.onAddOrChangeStatus = false;
      App.unblockUI();
    }
  }
  async onShowFormBannerMapping(): Promise<void> {
    await this.menuBannerMapping.getBanners(this.componentType, this.model.menu.id);
  }
  async onClearSelected(): Promise<void> {
    $('.parents').jstree('deselect_all');
    this.model.menu.parentId = '';
  }
}
