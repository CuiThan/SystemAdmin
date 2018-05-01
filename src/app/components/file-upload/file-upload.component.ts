import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FileUploadResponseModel } from '../../models/file-upload-response-model';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  errors: Array<string> = [];
  dragAreaClass = 'dragarea';
  @Input() fileExt = 'JPG, GIF, PNG';
  @Input() maxFiles = 100;
  @Input() maxSize = 100; // 5MB
  @Input() imageUrl = '';

  imagePath: string;
  constructor(private fileService: FileService) { }
  ngOnInit() {
    // this.imageUrl = "";
    this.imagePath = '';
  }

  onFileChange(event) {
    const files = event.target.files;
    this.saveFiles(files);
  }
  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    this.saveFiles(files);
  }
  async saveFiles(files): Promise<void> {
    if (files.length > 0 && (!this.isValidFiles(files))) {
      return;
    }
    if (files.length > 0) {
      const file = files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
      const response = await this.fileService.upload(formData);
      const responseObject = JSON.parse(response) as FileUploadResponseModel;
      if (responseObject.status) {
        this.imageUrl = responseObject.fullUrl;
        this.imagePath = responseObject.path + '/' + responseObject.name;
      } else {
        for (let i = 0; i < responseObject.messages.length; i++) {
          this.errors.push(responseObject.messages[i]);
        }
      }
    }
  }
  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }
  private isValidFileExtension(files) {
    // Make array of file extensions
    const extensions = (this.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim(); });
    for (let i = 0; i < files.length; i++) {
      // Get file extension
      const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      const exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push('Error (Extension): ' + files[i].name);
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }
  private isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize) {
      this.errors.push('Error (File Size): ' + file.name + ': exceed file size limit of ' + this.maxSize + 'MB ( ' + size + 'MB )');
    }
  }
  public get getImageUrl() {
    return this.imageUrl;
  }
  public get getImagePath() {
    return this.imagePath;
  }

}
