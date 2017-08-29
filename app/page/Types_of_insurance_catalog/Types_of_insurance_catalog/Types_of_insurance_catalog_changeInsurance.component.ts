import { Component,OnInit,ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TypesOfInsuranceCatalogChangeInsuranceService} from './Types_of_insurance_catalog_changeInsurance.service';


//引入插件
import {DialogPlugin} from '../../common/ug-dialog/dialog';
import {TablePlugin} from '../../common/ug-table/table.module';

import {AddInsuranceDetail} from './Type_insurance_addInsurance_detail.ts';
//import { AddInsuranceDesignation } from './Type_insurance_addInsurance_designation.ts';
//import { AddInsuranceMap } from './Type_insurance_addInsurance_map.ts';

import {InsuranceModificationDetail} from './modification_insurance_detail';
import {InsuranceModificationListDetail} from './modification_list_detail';

import {Test} from './changeTest';

@Component({
	selector:'Types_of_insurance_catalog_changeInsurance',
	templateUrl:'Types_of_insurance_catalog_changeInsurance.component.html',
	styleUrls:['Types_of_insurance_catalog_changeInsurance.component.css'],
	providers:[TypesOfInsuranceCatalogChangeInsuranceService]
})


export class TypesOfInsuranceCatalogChangeInsuranceComponent implements OnInit{	
	private auditPlan: AddInsuranceDetail = new AddInsuranceDetail();
	//参数列表
	addInsuranceDetail: AddInsuranceDetail = new AddInsuranceDetail();
	history: any = window.history;
	
	insuranceModificationDetail:InsuranceModificationDetail = new InsuranceModificationDetail();
	
	insuranceModificationListDetail:InsuranceModificationListDetail[]=[];
	//判断显示影藏
	private isShow:boolean=true;
	private isTextShow:boolean=false;
	private isShow1:boolean=false;
	private isTextShow1:boolean=false;
	private isInputShow:boolean=true;
	private isTexShow:boolean=false;
	private isPenShow:boolean=true;
	private isPenHide:boolean=false;
	private isPersonClassifyShow:boolean=true;
	private isPersonClassifyHide:boolean=false;
	private isShowBtn:boolean = true;
	private reimbursements: InsuranceModificationListDetail[] = [];
	
	private testDatail:Test[] = [];
	
	private reimbursementObject: InsuranceModificationListDetail  = new  InsuranceModificationListDetail();
	handleType: number = 0;	//0 =>修改展示的信息, 1 => 完成后的信息
	
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	insuranceId: number;
	
	//根据险种id来查看数据,将数据展示出来
	modificationName:any;
	modificationDescription:any;
	modificationPersonCategory:any;
	modificationativeDrugNumbers:any;
	modificationativeId:any;
	Infodata:any;
	
	 infoactive:any;
	 rateactive:any;
	 descriptionactive:any;
	 idactive:any;
	
	//特殊字符
    private specialPattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]");
	private isEdit: boolean = false;
	
	activeIdx:number = 0;
	personCategory1:any;
	personCategory2:any;
	personCategory3:any;
//	history: any = window.history;
	private auditOptions: any = {};
	
	
	TestInsuranceName:boolean = true;
    TestClassifyName:boolean = false;
    TestScale:boolean = true;
    TestPeople:boolean = true;
    CheckSameName:boolean = true;
    CheckPersonName:boolean = true;
	 constructor(
        private router: Router,
        private activeRouter: ActivatedRoute,
        private typesOfInsuranceCatalogChangeInsuranceService: TypesOfInsuranceCatalogChangeInsuranceService
    ) { } 
	
//初始化	

	ngOnInit(){
		let insuranceId :any = this.activeRouter.params['value'].id;
		console.log(insuranceId)
	        if (insuranceId) {
	            this.getOptRecipe(insuranceId);
	        }     
	     let id = this.activeRouter.params['value'].id;     
	}
	info:any;
	insuranceIdIndex:any;
    getOptRecipe(insuranceId: number): void {
	        this.typesOfInsuranceCatalogChangeInsuranceService.getOptRecipe(insuranceId)
	        .then(auditPlan => {
	        	console.log(auditPlan)
	        	this.auditPlan = auditPlan.data;
	        	
//  	        报销分类下面的参数
//              this.reimbursements = this.auditPlan.reimbursements;
                this.infoactive=(this.auditPlan.reimbursements[0].summary)
	        	this.rateactive=(this.auditPlan.reimbursements[0].rate)
	        	this.descriptionactive=(this.auditPlan.reimbursements[0].description)
	        	this.idactive=(this.auditPlan.reimbursements[0].id)	
	        	this.insuranceIdIndex=(this.auditPlan.reimbursements[0].insuranceId)	
	        	console.log(this.insuranceIdIndex)
	        	
//	                初始的值	
                this.modificationName =this.auditPlan.name;
	        	this.modificationDescription =this.auditPlan.description;
	        	this.modificationativeDrugNumbers =this.auditPlan.drugNumbers;
	        	this.modificationativeId =this.auditPlan.id;	
    	        

            	        
//  	        投保人员比例
    	        this.info = this.auditPlan.personCategory;
    	        this.info =this.info.split(",");
//  	        console.log(this.info)  	        	        	
	        })
      } 
      
//  添加人员类别
    addPersonCategory(){
        this.info.push("");
        console.log(this.info)                
    }
    
//保存
    submitHosp(){
    	if(this.TestInsuranceName && this.TestPeople && this.CheckPersonName){
	    	this.insuranceModificationDetail.name =  this.modificationName;//险种名称
	    	this.insuranceModificationDetail.description =  this.modificationDescription;//描述
	    	this.insuranceModificationDetail.personCategory =  this.info.join(",");//投保人员比例
	    	this.insuranceModificationDetail.drugNumbers =  this.modificationativeDrugNumbers;//复方位数
	    	this.insuranceModificationDetail.id =  this.modificationativeId; //id 
	//  	报销分类
			for(let i = 0;i<this.reimbursements.length;i++){
				delete this.reimbursements[i].isShow ;
				//  	是否可以编辑
				if(this.reimbursements){
					this.reimbursements[i].isEnableModify=1;
				}else{
					this.reimbursements[i].isEnableModify=0;
				}
	            this.reimbursements[i].insuranceId = this.insuranceIdIndex; 
			}
		
	        this.insuranceModificationDetail.reimbursements = this.reimbursements;
	    	this.typesOfInsuranceCatalogChangeInsuranceService.updateInsurance(this.insuranceModificationDetail)
	    	  .then(res =>{
	    	  	  console.log(res);
	    	  	  console.log(res.code);
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
	    	  })
	    }else if(!this.TestInsuranceName){
    		this.dialogPlugin.tip("险种名格式错误",null,"error");
    	}else if(!this.TestPeople){
    		this.dialogPlugin.tip("投保人员格式错误",null,"error");
    	}else if(!this.CheckPersonName){
    		this.dialogPlugin.tip("投保人员重名",null,"error");
    	}
    } 	
    

//点击增加
 addDetails(){
 	let reimbursementObject: InsuranceModificationListDetail  = new  InsuranceModificationListDetail();
	this.isShowBtn = false;
 	this.reimbursements.push(reimbursementObject);
 }
//完成
	renderData(obj,i){
		if(this.TestClassifyName && this.TestScale && this.CheckSameName){
			this.reimbursements[i].summary = obj.summary;
			this.reimbursements[i].rate = obj.rate;
			this.reimbursements[i].description = obj.description;
			obj.isShow = false;
			this.isShowBtn = true;
			this.testDatail.push(obj.summary);
		}else if(!this.TestClassifyName){
			this.dialogPlugin.tip("分类名错误",null,"error");
		}else if(!this.TestScale){
			this.dialogPlugin.tip("比例格式错误",null,"error");
		}else if(!this.CheckSameName){
			this.dialogPlugin.tip("用户名重名",null,"error");
		}
	}
	
	
	
	//  输入框校验
//	保险名称
	testInsuranceName(value){
		let reg =/^[\u4e00-\u9fa5]{2,10}$/g;
		let result = reg.test(value);
		if(result){
			this.TestInsuranceName = true;
		}else{
			this.dialogPlugin.tip("保险输入有误",null,"error");
			this.TestInsuranceName = false;
		}
	}
	//	分类名称
	testClassifyName(value){
		if(value){
				let reg =/^[\u4e00-\u9fa5]{2,5}$/g;
			let result = reg.test(value);
			if(result){
				this.TestClassifyName = true;
			}else{
				this.dialogPlugin.tip("分类名有误",null,"error");
				this.TestClassifyName = false;
			}
		}else{
			this.dialogPlugin.tip("分类名不能为空",null,"error");
			this.TestClassifyName = false;
		}
		
	}
	//	比例校验
	testScale(value){
		if(value){
			let reg = /^[0-9]{1}$/g;
			let reg1 = /^[1-9][0-9]{1}$/g
			if(value.length==1){
				let result = reg.test(value);
				if(result){
					this.TestScale = true;
				}else{
					this.dialogPlugin.tip('比例输入有误',null,'error');
					this.TestScale = false;
				}
			}else if(value.length == 2){
				let result1 = reg1.test(value);
				if(result1){
					this.TestScale = true;
				}else{
					this.dialogPlugin.tip('比例输入有误',null,'error');
					this.TestScale = false;
				}
			}else if(value == 100){
				this.TestScale = true;
			}else{
				this.dialogPlugin.tip('比例输入有误',null,'error');
				this.TestScale = false;
			}
		}else{
			this.TestScale = true;
		}
		
	}
//	删除投保人
	deleatePerson(i){
		
		this.info.splice(i,1)
		this.deleateCheckName(this.info)
	
	}
//	删除分类
	deleateClassify(i){
		this.reimbursements.splice(i,1);
		this.testDatail.splice(i,1)
		this.isShowBtn = true;
	}
	//	检测投保人重名
	checkPersonName(personName){
		console.log(personName)
		console.log(this.info)
		for(let i=0;i<this.info.length;i++){
			if(personName == this.info[i]){
				this.CheckPersonName=false;
				this.dialogPlugin.tip('投保人同名',null,'error');
				return false;
         	}
		}
	}
	//	检测报销分类同名
	checkSameName(classifyName){
		if(this.testDatail){
			for(let i=0;i<this.testDatail.length;i++){
				if(classifyName == this.testDatail[i]){
					this.CheckSameName=false;
					this.dialogPlugin.tip('分类名同名',null,'error');
					return false;
				}
			}
		}
		
	}
	//	删除投保人之后重新检测重名
	deleateCheckName(personArray){
		console.log(personArray)
		if(personArray.length>1){
			for(let i=0;i<personArray.length;i++){
				for(let j=i+1;j<personArray.length;j++){
					if(personArray[i]===personArray[j]){
						this.CheckPersonName=false;
						return false;
					}else{
						this.CheckPersonName=true;
					}
				}
			}
		}else{
			this.CheckPersonName=true;
		}
		
	}
	//	测试投保人校验
	testPeople(value){
		if(value){
			let reg =/^[\u4e00-\u9fa5]{1,10}$/g;
			let result = reg.test(value);
			
			console.log(result)
			if(result){
				this.TestPeople = true;
			}else{
				this.dialogPlugin.tip('投保人输入有误',null,'error');
				this.TestPeople = false;
			}
		}
			
	}
}
    	
  

