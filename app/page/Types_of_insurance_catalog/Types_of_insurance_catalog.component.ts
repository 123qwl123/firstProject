import 'rxjs/add/operator/switchMap';
import { Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {TypesOfInsuranceCatalogComponentService} from './Types_of_insurance_catalog.service';

import { DialogPlugin, DialogModel } from '../common/ug-dialog/dialog';
import {AddInsuranceMap} from './Type_insurance_addInsurance_map';

@Component({
	selector:'Types_of_insurance_catalog',
	templateUrl:'Types_of_insurance_catalog.component.html',
	styleUrls:['Types_of_insurance_catalog.component.css'],
	providers:[TypesOfInsuranceCatalogComponentService]
})


export class TypesOfInsuranceCatalogComponent implements OnInit{ 
	//	获取险种列表信息
	private optRecipeList: AddInsuranceMap[] = [];//用来装列表数据的
	private optRecipenput: any = {};//route方法
	private recipeId: string;//route方法id
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	constructor(
		private typesOfInsuranceCatalogComponentService:TypesOfInsuranceCatalogComponentService,
		private route: ActivatedRoute,
		private router: Router
	) {}
	
	ngOnInit(){
		//	获取险种列表信息初始化
		this.route.params.subscribe(optRecipenput => {
            this.optRecipenput = optRecipenput;
            this.getInsuranceList(this.optRecipenput.recipeId);
            
       });
	}
	
	
	
//	获取险种列表信息
	getInsuranceList(insuranceId:number):void{
		this.typesOfInsuranceCatalogComponentService.getInsuranceList(insuranceId)
		 .then(result=>{
		 	console.log(result);
			this.optRecipeList = [];
		   if(result==''){
	           for(let item of result){
                  this.optRecipeList.push(item);
               }
           }else{
           		for(let item of result){
              	  this.optRecipeList.push(item);
           	    }
           }	
	   } )
	
	}
 
    
//  修改数据
    goToEditPage(insuranceId?: number){
   	  let link:any[] = ['page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_changeInsurance'];
   	   if (insuranceId)
       link.push(insuranceId);
   	   this.router.navigate(link);
   }
 //添加数据
    addInsurance(){
    	let link:any[] = ['page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_addInsurance'];
   	    this.router.navigate(link);  
    }
}
