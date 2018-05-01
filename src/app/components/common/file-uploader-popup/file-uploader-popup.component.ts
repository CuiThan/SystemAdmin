import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FileUploadComponent } from '../../../components/file-upload/file-upload.component';
declare var App: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-file-uploader-popup',
  templateUrl: './file-uploader-popup.component.html',
  styleUrls: ['./file-uploader-popup.component.css']
})
export class FileUploaderPopupComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  @Output() thumbnailData = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onSave() {
    const img = this.fileUpload.imagePath;
    this.thumbnailData.emit(img);
    $('#file-uploader-popup').modal('toggle');
  }
}
