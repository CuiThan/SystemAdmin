import { Component, OnInit } from '@angular/core';
import { ConfigSetting } from '../../../../common/configSetting';
import { CategoryService } from '../../../../services/category.service';
import { CategoryManagerModel, CategoryModel } from '../../../../models/category-manager-model';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-product-search-category',
  templateUrl: './product-search-category.component.html',
  styleUrls: ['./product-search-category.component.css']
})
export class ProductSearchCategoryComponent implements OnInit {
  model: CategoryManagerModel;

  constructor(
    private categoryService: CategoryService
  ) { }

  async ngOnInit() {
    try {
      this.model = new CategoryManagerModel();
      this.model.category = new CategoryModel();
      this.model.category.name = '';
      this.model.category.description = '';

      const response = await this.categoryService.gets('');
      this.model.languages = response.languages;
      this.model.category.languageId = response.languageDefaultId;
      this.model.categories = response.categories;
      this.jsTreeCategory();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }

  jsTreeCategory() {
    const menus = {
      'plugins': ['wholerow', 'types'],
      'core': {
        'check_callback': true,
        'data': []
      },
      'types': {
        'default': {
          'icon': 'fa fa-folder icon-state-warning icon-lg'
        },
        'file': {
          'icon': 'fa fa-file icon-state-warning icon-lg'
        }
      }
    };
    for (let i = 0; i < this.model.categories.length; i++) {
      const category = this.model.categories[i];
      const categoryItem = {
        'id': category.id,
        'parent': category.parentId === '' ? '#' : category.parentId,
        'text': category.name,
        'data': category
      };
      menus.core.data.push(categoryItem);
    }
    try {

      $('#tree_2').jstree(true).settings.core.data = menus.core.data;
      $('#tree_2').jstree(true).refresh();

    } catch (ex) {
      $('#tree_2').jstree(menus);
    }

    $('#tree_2').on('changed.jstree', function (e, data) {
      if (data.selected.length > 0) {
        if (data.selected.length === 1) {
          const id = data.selected[0];
          const li = $('#' + id);
          if (li.hasClass('jstree-leaf')) {
            const categoryId = data.instance.get_node(data.selected[0]).id;
            // angular.element($('#productForm')).scope().$apply('setCategoryId(' + categoryId + ')');
          } else {
            ConfigSetting.ShowError('Bạn phải chọn mức ngành hàng thấp nhất!');
          }
          // $('#tree_2').jstree('create_node', $('#' + id), {'id' : '1945', 'text' : 'subnode1_1'});
        } else {
          ConfigSetting.ShowError('Bạn chỉ được lựa chọn 1 ngành hàng duy nhất!');
        }
      }
    });
  }
}


