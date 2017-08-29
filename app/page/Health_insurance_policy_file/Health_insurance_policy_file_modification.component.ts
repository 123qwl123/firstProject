import { Component,OnInit,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {HealthInsurancePolicyFileModificationService} from './Health_insurance_policy_file_modification.service';

import { DialogPlugin } from '../common/ug-dialog/dialog';
//引入插件

//import { DialogModel } from '../common/ug-dialog/dialog.model';
import {TablePlugin} from '../common/ug-table/table.module';
//import {DialogPlugin} from '../common/ug-dialog/dialog';

import {InsuranceDetail} from './insurance_detail';
import {InsuranceModificationDetail} from './insurance_modification_datail';

declare var UE: any;

@Component({
	selector:'Health_insurance_policy_file_modification',
	templateUrl:'Health_insurance_policy_file_modification.component.html',
	styleUrls:['Health_insurance_policy_file_modification.component.css','../../app.component.css'],
	providers:[HealthInsurancePolicyFileModificationService]
})


export class HealthInsurancePolicyFileModificationComponent implements OnInit{
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	private auditPlan: InsuranceDetail = new InsuranceDetail();
	insuranceModificationDetail:InsuranceModificationDetail = new InsuranceModificationDetail();
	private auditOptions: any = {};
	history: any = window.history;
	policyId:number;	
	constructor(
		private healthInsurancePolicyFileModificationService:HealthInsurancePolicyFileModificationService,
		private router: Router,
		private activeRouter: ActivatedRoute
	) { }
	ngOnInit(){
		let policyId :any = this.activeRouter.params['value'].id;
//		console.log(policyId)
	        if (policyId) {
	            this.getOptRecipe(policyId);
	        }        
	}
	
	
	
//	修改第一步,根据医保政策信息id查询
modificationsummary:any;
modificationsource:any;
modificationcontent:any;
modificationativeDate:any;
modificationativeId:any;
    getOptRecipe(policyId: number): void {
    	if(this.policyId){
    		this.healthInsurancePolicyFileModificationService.getOptRecipe(policyId)
	        .then(auditPlan => {
	        	console.log(auditPlan)
	        	this.auditPlan = auditPlan.data;
	        	this.modificationsummary =this.auditPlan.summary;
	        	this.modificationsource =this.auditPlan.source;
//	        	this.modificationcontent =this.auditPlan.content;//文本框内容
	        	this.modificationativeDate =this.auditPlan.ativeDate;
	        	this.modificationativeId =this.auditPlan.id;
	        	
	        	
	        	this.setContent(this.auditPlan.content);
	        	
	        })
    	}else{
    		this.setContent("");
    	}
	        
      } 
    

 /*************富文本****************
    * 功能：点击获取富文本
    *      设置富文本内容
    *      获取符文本内容
    */
    UEditor: any;
    private setEditorContent(content: string) {
        this.UEditor.setContent(content.replace(/\"\/api/g, "\"http://" + window.location.host + "/api"));
    }
    setContent(content: string) {
        if (this.UEditor) {
            this.setEditorContent(content);
        } else {
            this.UEditor = new UE.ui.Editor({ initialFrameWidth: 100 + '%' });
            this.UEditor.render('ueInstructions');

            this.UEditor.addListener('ready', () => {
                this.UEditor.setHeight(400);
                this.setEditorContent(content);
            });
        }
    }
    getContent() {
        this.insuranceModificationDetail.content = this.UEditor.getContent().replace("\"http://" + window.location.host + "/api", "\"/api");
    }
 
 
 
    
 //  修改中的保存 
    save() {
    	console.log(6666)
    	this.insuranceModificationDetail.summary = this.modificationsummary;
    	this.insuranceModificationDetail.source = this.modificationsource;
    	this.insuranceModificationDetail.content = this.modificationcontent;//文本框内容
    	this.insuranceModificationDetail.ativeDate = this.modificationativeDate;
    	this.insuranceModificationDetail.id = this.modificationativeId;
        this.getContent();                      //从富文本框中取得内容
        this.healthInsurancePolicyFileModificationService.save(this.insuranceModificationDetail)
         .then(res =>{
         	console.log(res);
         	 if (res.code == 200) {
		                        this.auditOptions.show = true;
		                        this.auditOptions.string = '保存成功';
		                        setTimeout(() => {
		                            this.auditOptions.show = false;
		                            this.auditOptions.string = "";
		                            this.history.back();
		                        }, 1500);
		                    }else {
		                        this.auditOptions.show = true;
		                        this.auditOptions.string = '保存失败';
		                        setTimeout(() => {
		                            this.auditOptions.show = false;
		                            this.auditOptions.string = "";
		                        }, 1500);
		                    }
         })
    }   
    
}
