import { Component, OnInit, Input } from '@angular/core';
import { RowTemplate } from '../../../../models/marketing-management/page-builder/template/row-template';
import { Template } from '../../../../models/marketing-management/page-builder/template/template';
import { TemplateService } from '../../../../services/marketing-management/page-builder/template.service';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;
declare var App: any;

@Component({
  selector: 'app-template-row',
  templateUrl: './template-row.component.html',
  styleUrls: ['./template-row.component.css']
})
export class TemplateRowComponent implements OnInit {
  @Input() rowTemplate: RowTemplate;  
  template: Template;

  constructor(private templateService: TemplateService,
    private router: Router) { 
    
  }
    
  ngOnInit() {
  }

}
