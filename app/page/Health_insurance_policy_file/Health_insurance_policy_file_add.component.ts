import { Component,OnInit,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import {HealthInsurancePolicyAddFileService} from './Health_insurance_policy_file_add.service';
import {InsuranceAddDetail} from './insurance_add_datail';
 
import {TablePlugin} from '../common/ug-table/table.module';
import {DialogPlugin} from '../common/ug-dialog/dialog';
declare var UE: any;
@Component({
	selector:'Health_insurance_policy_file_add',
	templateUrl:'Health_insurance_policy_file_add.component.html',
	styleUrls:['Health_insurance_policy_file_add.component.css','../../app.component.css'],
	providers:[HealthInsurancePolicyAddFileService]
})


export class HealthInsurancePolicyFileAddComponent implements OnInit{
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	//特殊字符
    private specialPattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]");
	private isEdit: boolean = false;
	private auditOptions: any = {};
	
	history: any = window.history;
	insuranceAddDetail: InsuranceAddDetail = new InsuranceAddDetail();
	
	policyId:number;	
	
	sub: any;
	params: string;
	docInfo: any = {};
	bookName: string;
	drugName: string;
	
	constructor(
		private healthInsurancePolicyAddFileService:HealthInsurancePolicyAddFileService,
		private router: Router,
		private activeRouter: ActivatedRoute,
		private route: ActivatedRoute,
	) { }
	
	ngOnInit(){
		let policyId :any = this.activeRouter.params['value'].id;
		console.log(policyId)
       this.getDocInfo();
   }
//  获取所有的数据
    getDocInfo(){
    	this.healthInsurancePolicyAddFileService.getHistoryInfo(this.insuranceAddDetail)
    	  .then(docInfo =>{
              this.docInfo = docInfo;
              console.log(this.docInfo);
              for(let i=0;i<docInfo.length;i++){
              	 this.drugName = docInfo[i].id;
              	 console.log(this.drugName);
              }
//            console.log(this.drugName);
    	  })
    }
	
	
	
//	//添加医保政策内容
	saveInsurance(){
		console.log(66666)
		console.log(this.insuranceAddDetail)
//		this.insuranceAddDetail
//		this.getContent();   //从富文本框中取得内容

        if(this.insuranceAddDetail){
        	this.healthInsurancePolicyAddFileService.getInsuranceData(this.insuranceAddDetail)
				 .then(res => {
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
		                        setTimeout(() => {
		                            this.auditOptions.show = false;
		                            this.auditOptions.string = "";
		                        }, 1500);
		                    }
//		             this.setContent(res.contents);        
			     })
        }else{
//      	this.setContent("");
        }
		
		 
    }
	
    
     /*************富文本****************
    * 功能：点击获取富文本
    *      设置富文本内容
    *      获取符文本内容
    */
//  UEditor: any;
//  private setEditorContent(content: string) {
//      this.UEditor.setContent(content.replace(/\"\/api/g, "\"http://" + window.location.host + "/api"));
//  }
//  setContent(content: string) {
//      if (this.UEditor) {
//          this.setEditorContent(content);
//      } else {
//          this.UEditor = new UE.ui.Editor({ initialFrameWidth: 100 + '%' });
//          this.UEditor.render('ueInstructions');
//
//          this.UEditor.addListener('ready', () => {
//              this.UEditor.setHeight(400);
//              this.setEditorContent(content);
//          });
//      }
//  }
//  getContent() {
//      this.insuranceAddDetail.content = this.UEditor.getContent().replace("\"http://" + window.location.host + "/api", "\"/api");
//  }
    
    
    
	
}
