import { Component,OnInit,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import {TypeOfInsuranceService} from './Types_of_insurance_catalog_lookInsurance.service';


import {AddInsuranceDetail} from './Type_insurance_addInsurance_detail.ts';
import { AddInsuranceDesignation } from './Type_insurance_addInsurance_designation.ts';
import { AddInsuranceMap } from './Type_insurance_addInsurance_map.ts';

@Component({
	selector:'Types_of_insurance_catalog_lookInsurance',
	templateUrl:'Types_of_insurance_catalog_lookInsurance.component.html',
	styleUrls:['Types_of_insurance_catalog_lookInsurance.component.css'],
	providers:[AddInsuranceDetail,TypeOfInsuranceService]
})



export class TypesOfInsuranceCatalogLookInsuranceComponent implements OnInit{	
//	列表参数
	 private auditPlan: AddInsuranceDetail = new AddInsuranceDetail();

	constructor(
		private typeOfInsuranceService: TypeOfInsuranceService,
		private router: Router,
		private activeRouter: ActivatedRoute
	) {}  
	
	ngOnInit(){
         let insuranceId :any = this.activeRouter.params['value'].id;
	        if (insuranceId) {
	            this.getOptRecipe(insuranceId);
	        }
         
     }
	
	
	 //根据险种id来查看数据,将数据展示出来
	 infoactive:any;
	 rateactive:any;
	 descriptionactive:any;
      getOptRecipe(insuranceId: number): void {
	        this.typeOfInsuranceService.getOptRecipe(insuranceId)
	        .then(res => {
//	        	console.log(res)
	        	this.auditPlan = res;
	        	this.infoactive=(this.auditPlan.reimbursements[0].summary)
	        	this.rateactive=(this.auditPlan.reimbursements[0].rate)
	        	this.descriptionactive=(this.auditPlan.reimbursements[0].description)
	        	console.log(this.infoactive)
	        	console.log(this.rateactive)
	        	console.log(this.descriptionactive)
	        })
       } 
       
//     完成按钮
       
}
   


