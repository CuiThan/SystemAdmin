import { Component, OnInit } from '@angular/core';
import { RowTemplate } from '../../../../models/marketing-management/page-builder/template/row-template';
import { TemplateService } from '../../../../services/marketing-management/page-builder/template.service';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ConfigSetting } from '../../../../common/configSetting';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-template-config-position',
  templateUrl: './template-config-position.component.html',
  styleUrls: ['./template-config-position.component.css']
})
export class TemplateConfigPositionComponent implements OnInit {  
  addedRowTemplate: RowTemplate;
  currentTemplateId: string;
  constructor(private templateService: TemplateService,
    private router: ActivatedRoute) {            
    }

  ngOnInit() {    
    this.addedRowTemplate = new RowTemplate();       
    this.router.paramMap.subscribe((param:ParamMap )=> {
      this.currentTemplateId = param.get('templateId');
    });
    this.onGetDetail();    
  }

  async onGetDetail(): Promise<void> {        
    try {
      
    }
    catch (ex) {
      ConfigSetting.ShowErrorException(ex);
    }    
  }



}
