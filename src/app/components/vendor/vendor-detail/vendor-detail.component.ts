import { Component, OnInit } from '@angular/core';
import { VendorModel } from '../../../models/vendor-model/vendor-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { VendorService } from '../../../services/vendor.service';
import { ConfigSetting } from '../../../common/configSetting';
@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

  vendor: VendorModel;
  constructor(
    private router: ActivatedRoute,
    private vendorService: VendorService
  ) { }

  ngOnInit() {
    this.vendor = new VendorModel();
    this.router.paramMap.subscribe((param: ParamMap) => {
      this.onGet(param.get('id'));
    });
  }
  async onGet(id: string): Promise<void> {
    try {
      const response = await this.vendorService.get(id);
      this.vendor = response.vendor;
    } catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
