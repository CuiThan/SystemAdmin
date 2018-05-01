import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryManagerModel, CategoryModel } from '../../../models/category-manager-model';
import { CategoryService } from '../../../services/category.service';
import { ConfigSetting } from '../../../common/configSetting';
import { CKEditorComponent } from 'ng2-ckeditor'
import { KeyValueModel } from '../../../models/result-model';
import { fail } from 'assert';


declare var jquery: any;
declare var $: any;

declare var App: any;

@Component({
  selector: 'app-category-add-or-change',
  templateUrl: './category-add-or-change.component.html',
  styleUrls: ['./category-add-or-change.component.css']
})
export class CategoryAddOrChangeComponent implements OnInit {

  categoryManager: CategoryManagerModel;
  submited: boolean;
  @ViewChild('categoryAddOrChange') form: any;

  selectedFolder: CategoryModel;
  title: string;
  statuses: KeyValueModel[];
  languages: KeyValueModel[];
  selected: boolean;

  constructor(
    private categoryService: CategoryService

  ) { }

  ngOnInit() {

    this.categoryManager = new CategoryManagerModel();
    this.selectedFolder = new CategoryModel();
    this.selectedFolder.name = "Không có";
    this.categoryManager.category = new CategoryModel();
    this.submited = false;

    this.categoryManager.category.status = 1;

    this.categoryManager.category.languageId = "2";


  }


  registerMenusTree(): void {
    let menus = {
      'core': {
        'data': []
      }
    };
    if (this.categoryManager.category.parentId != null) {
      
      if (this.categoryManager.category.parentId.length > 0) {
        this.selectedFolder = this.categoryManager.parents.find(x => x.id == this.categoryManager.category.parentId);

      }
    }
   
      for (let i = 0; i < this.categoryManager.parents.length; i++) {
        let category = this.categoryManager.parents[i];

        
        let categoryItem = {
          "id": category.id,
          "parent": category.parentId == "" ? "#" : category.parentId,
          "text": category.name,
          "data": category,



        }
        console.log(categoryItem);
        menus.core.data.push(categoryItem);

      }
    
    try {

      $('.menus').jstree(true).settings.core.data = menus.core.data;
      $('.menus').jstree(true).refresh();

    }
    catch (ex) {
      console.log("id them danh muc da chay");

      $('#menus2').jstree(menus);


    }
    var $that = this;


    $("#menus2").on("select_node.jstree", function (event, node) {
      var selectedNode = node.node;
      // $that.onGet(selectedNode.data.languageId, selectedNode.data.id, 2);
      $that.onGetSelect(selectedNode.data.id);
    });

  }

  onGetSelect(id: string): void {


    // this.selectedFolder = this.categoryManager.categories.find(x => x.id == id);
    this.selectedFolder = this.categoryManager.parents.find(x => x.id == id);
    this.categoryManager.category.parentId = this.selectedFolder.id;


  }

  onCancel() {
    this.selectedFolder.name = "Không có";
    this.categoryManager.category.parentId = "";
    console.log(this.categoryManager.category.parentId);
  }


  async onAddOrChange(form): Promise<void> {
    App.blockUI();
    this.submited = true;

    try {
      if (this.form.valid) {
        ConfigSetting.ShowErrores(["success"]);
        let requestModel = this.categoryManager.category;

        let response = await this.categoryService.addOrChange(requestModel);
        if (response.status) {
          ConfigSetting.ShowSuccess("Save sucess.");
        }
        else {
          ConfigSetting.ShowErrores(response.messages);
        }

      }
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }




  async onGet(): Promise<void> {
    App.blockUI();;
    try {

    
     
      var response = await this.categoryService.get(this.categoryManager.category.languageId, this.categoryManager.category.id);

      //this.categoryManager.categories = response.parents;
      this.categoryManager.parents = response.parents;
    
      
      this.categoryManager.category.code = response.category.code;
      this.languages = response.languages;



      this.categoryManager.category.parentId = response.category.parentId;
      this.categoryManager.category.name = response.category.name;
      this.categoryManager.category.languageId = response.category.languageId;

      if (this.categoryManager.category.id.length > 0) {
        this.categoryManager.category.status = response.category.status;

      }


      this.categoryManager.category.displayOrder = response.category.displayOrder;
      this.categoryManager.category.description = response.category.description;
      this.statuses = response.statuses;

     
      // this.categoryManager.category = model.category;
      if (this.categoryManager.category.id.length == 0) {
        this.ngOnInit();
        
        
        //this.categoryManager.categories = response.parents;
        this.categoryManager.parents = response.parents;
        this.title = "Thêm mới danh mục";


      }
      else {
        this.title = "Sửa đổi danh mục";

      }
      this.registerMenusTree();
      // this.categoryManager.languages = model.languages;
      // this.categoryManager.categories = model.categories;
      // this.categoryManager.parents = model.parents;




    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
    App.unblockUI();
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
