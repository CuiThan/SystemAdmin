import { Component, OnInit } from '@angular/core';
import { CustomerModel} from '../../models/customer-model';
import {ActivatedRoute,ParamMap} from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ConfigSetting } from '../../common/configSetting';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
   customer: CustomerModel;
  constructor(
    
    private router: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customer= new CustomerModel();
    this.router.paramMap.subscribe((param:ParamMap )=> {
      this.onGet(param.get('id'));
    });
  }
  async onGet(id:string): Promise<void> {
    try {
      var response = await this.customerService.get(id);
      this.customer = response.customer;
      console.log(this.customer);
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }
  }
}
