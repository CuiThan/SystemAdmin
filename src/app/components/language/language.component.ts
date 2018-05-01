import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigSetting } from '../../common/configSetting';
import { LanguageService } from '../../services/language.service';
import { LanguageModel } from '../../models/language-model';
import { LanguageSearchRequest } from '../../models/language-search-request';
import { Dictionary } from '../../models/dictionary';
import { forEach } from '@angular/router/src/utils/collection';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  @ViewChild('f') form: any;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  searchParams: LanguageSearchRequest;
  languages: LanguageModel[];
  languageAddnew: LanguageModel;
  languageEdit: LanguageModel;
  name: string;
  pageIndex = 0;
  pageSize = 30;
  totalRow = 0;
  showAddNew = false;
  rowEdits: Dictionary<boolean>;
  submited: boolean;
  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.searchParams = new LanguageSearchRequest();
    this.languages = [];
    this.languageEdit = new LanguageModel();
    this.languageAddnew = new LanguageModel();
    this.rowEdits = new Dictionary<boolean>();
    this.onSearch();
  }
  async onSearch(): Promise<void> {
    //var t = JSON.parse(JSON.stringify(this.languageAddnew));
    try {
      const response = await this.languageService.search(this.searchParams);
      this.languages = response.languages as LanguageModel[];
      this.totalRow = response.totalRow;
      this.rowEdits = new Dictionary<boolean>();
      for (let i = 0; i < this.languages.length; i++) {
        const language = this.languages[i];
        this.rowEdits.Add(language.id, false);
      }
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNew(): Promise<void> {
    try {
      this.submited = false;
      this.showAddNew = !this.showAddNew;
      // this.rowEdits.ContainsKey
      for (let i = 0; i < this.languages.length; i++) {
        if (this.rowEdits.Item(this.languages[i].id)) {
          this.onChangeCancel(this.languages[i].id);
          break;
        }
      }
      this.languageAddnew = new LanguageModel();
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onAddNewCancel(): Promise<void> {
    try {
      this.showAddNew = false;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
  async onChange(languageId: string): Promise<void> {
    this.submited = false;
    this.onAddNewCancel();
    for (let i = 0; i < this.languages.length; i++) {
      if (this.rowEdits.Item(this.languages[i].id)) {
        this.onChangeCancel(this.languages[i].id);
      }
    }
    const language = this.languages.find(x => x.id === languageId);
    this.languageEdit = JSON.parse(JSON.stringify(language));
    const state = this.rowEdits.Item(languageId);
    this.rowEdits.Change(languageId, !state);
  }
  async onChangeCancel(languageId: string): Promise<void> {
    this.rowEdits.Change(languageId, false);
    const index = this.languages.findIndex(x => x.id === languageId);
    this.languages[index] = this.languageEdit;
  }

  async onSave(languageId: string): Promise<void> {
    App.blockUI();
    this.submited = true;
    const img = this.fileUpload.imagePath;
    if (this.form.valid) {
      try {
        let language: LanguageModel = null;
        if (languageId === '') {
          language = this.languageAddnew;
        } else {
          for (let i = 0; i <= this.languages.length; i++) {
            if (this.languages[i].id === languageId) {
              language = this.languages[i];
              break;
            }
          }
        }
        if (img !== '') { language.flagImageFileName = img; }

        if (language == null) {
          ConfigSetting.ShowSuccess('Language not null.');
        } else {
          const response = await this.languageService.languageSave(language);
          if (response.status) {
            ConfigSetting.ShowSuccess('Save sucess.');
            await this.onSearch();
            if (languageId === '') {
              await this.onAddNewCancel();
            } else {
              await this.rowEdits.Change(languageId, false);
            }
          } else {
            ConfigSetting.ShowErrores(response.messages);
          }
        }
      } catch (ex) {
        ConfigSetting.ShowErrorException(ex);
      }
    }

    App.unblockUI();
  }
}
