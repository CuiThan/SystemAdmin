import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  constructor() { }

  ngOnInit() {
    let t = [];
    for (let i = 0; i < 3; i++) {
      let a: any = {};
      a.name = 1;
      a.x = [];
      for (let j = 0; j < 3; j++) {
        a.x.push(i+'-'+j);
      }
      t.push(a);
    }
    console.log(t);
    let count = 1;
    for (let i = 0; i < t.length; i++) {
      count = count + t[i].x.length;
    }
    let tmp = [];
    debugger;
    for (let i = 0; i < t.length; i++) {
      if (tmp.length <= 0) {
        for (let j = 0; j < t[i].x.length; j++) {
          tmp.push(t[i].x[j]);
        }
      } else {
        let tmp1 = JSON.parse(JSON.stringify(tmp));
        let tmp2 = [];
        for (let j = 0; j < t[i].x.length; j++) {
          let l = tmp1.length;
          for (let k = 0; k < l; k++) {
            let item = tmp1[k];
            item = item + '  ' + t[i].x[j];
            tmp2.push(item);
          }
        }
        tmp = tmp2;
      }

    }
    console.log(tmp);
  }

  onSave() {
    const img = this.fileUpload.imagePath;
    console.log(img);

  }

}
