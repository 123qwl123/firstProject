import { Component,OnInit,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
//引入插件
import { DialogPlugin, DialogModel } from '../../common/ug-dialog/dialog';

import {TypesOfInsuranceCatalogModificationInsuranceService}  from './Types_of_insurance_catalog_midioficationInsurance.service';

import {AddInsuranceDetail} from './Type_insurance_addInsurance_detail';

@Component({
	selector:'Types_of_insurance_catalog_midioficationInsurance',
	templateUrl:'Types_of_insurance_catalog_midioficationInsurance.component.html',
	styleUrls:['Types_of_insurance_catalog_midioficationInsurance.component.css'],
	providers:[TypesOfInsuranceCatalogModificationInsuranceService]
})


export class TypesOfInsuranceCatalogModificationInsuranceComponent implements OnInit{
	//参数列表
	addInsuranceDetail: AddInsuranceDetail = new AddInsuranceDetail();
	history: any = window.history;
	
	
	//判断显示与隐藏
	private isShow:boolean=true;
	private isTextShow:boolean=false;
	private isInputShow:boolean=true;
	private isTexShow:boolean=false;
	private isInputclassifyShow:boolean=true;
	private isTexclassifyShow:boolean=false;
	private finishApplyClassifyShow:boolean=true;
	private finishApplyClassifyHide:boolean=false;
	
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;//对话框
	
	//特殊字符
    private specialPattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]");
	private isEdit: boolean = false;
	private auditOptions: any = {};
	constructor(
		private typesOfInsuranceCatalogModificationInsuranceService: TypesOfInsuranceCatalogModificationInsuranceService,
        private router: Router,
        private activeRouter: ActivatedRoute
	) {
		
	}
	
	ngOnInit(){ 
	   let id = this.activeRouter.params['value'].id;

        if (id) {
            this.isEdit = true;
        }
    }
	

	 
//保存
    saveAuditPlan(): void {
    	console.log(this.addInsuranceDetail)
    	this.typesOfInsuranceCatalogModificationInsuranceService.addAuditPlan(this.addInsuranceDetail)
    			  .then(res => {
    				console.log(res)
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
//                      this.auditOptions.string = `保存失败！ ${data.message}`;
                        setTimeout(() => {
                            this.auditOptions.show = false;
                            this.auditOptions.string = "";
                        }, 1500);
                    }
      });  	
    }
//	对话框取消
    cancelButtom(){
    	this.dialogPlugin.myModule();
    }
	
}
   


