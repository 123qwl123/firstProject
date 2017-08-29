import { Component,OnInit,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DialogPlugin, DialogModel } from '../../common/ug-dialog/dialog';//引入插件
import {TypesOfInsuranceCatalogAddInsuranceService}  from './Types_of_insurance_catalog_addInsurance.service';//服务
import {AddInsuranceDetail} from './Type_insurance_addInsurance_detail';//保存中的数据
import {AddInsuranceDesignation} from './Type_insurance_addInsurance_designation';//报销分类
import {AddInsuranceMap} from './Type_insurance_addInsurance_map';//装列表数据的

import {TestDatail} from './test';

@Component({
	selector:'Types_of_insurance_catalog_addInsurance',
	templateUrl:'Types_of_insurance_catalog_addInsurance.component.html',
	styleUrls:['Types_of_insurance_catalog_addInsurance.component.css'],
	providers:[TypesOfInsuranceCatalogAddInsuranceService]
})
export class TypesOfInsuranceCatalogAddInsuranceComponent implements OnInit{		
	addInsuranceDetail: AddInsuranceDetail = new AddInsuranceDetail();//参数列表
	addInsuranceDesignation:AddInsuranceDesignation[]=[];
	history: any = window.history;	
	//判断显示与隐藏
	private isShow:boolean=true;
	private isTextShow:boolean=false;
	private isInputShow:boolean=true;
	private isTexShow:boolean=false;
	
	private isInputShow1:boolean=true;
	private isTexShow1:boolean=false;
	
	private isInputclassifyShow:boolean=true;
	private isTexclassifyShow:boolean=false;
	private finishApplyClassifyShow:boolean=true;
	private finishApplyClassifyHide:boolean=false;
//	报销分类
	private isShowBtn:boolean = true;
	private reimbursements: AddInsuranceDesignation[] = [];
	private reimbursementObject: AddInsuranceDesignation  = new  AddInsuranceDesignation();
//	投保人员类别参数
    private personCategorys: AddInsuranceDetail[] = [];
    
    private testDatail:TestDatail[] = [];
    
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;//对话框
	
	//特殊字符
    private specialPattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]");
	private isEdit: boolean = false;
	private auditOptions: any = {};
	
	private optRecipenput: any = {};//route方法
	private recipeId: string;//route方法id
	private optRecipeList: AddInsuranceMap[] = [];//用来装列表数据的
	
	
	info:any;
	insuranceName:any;
	insuranceDescription:any;
	insurancedrugNumbers:any;
	
    insuranceId:number;
    
    a:any;
    b:any;
    
    TestInsuranceName:boolean = false;
    TestClassifyName:boolean = false;
    TestScale:boolean = true;
    TestPeople:boolean = true;
    CheckSameName:boolean = true;
    CheckPersonName:boolean = true;
    
    
    
    
    
	constructor(
		private typesOfInsuranceCatalogAddInsuranceService: TypesOfInsuranceCatalogAddInsuranceService,
        private router: Router,
        private route: ActivatedRoute,
        private activeRouter: ActivatedRoute
	) {}
	ngOnInit(){ 
		this.route.params.subscribe(optRecipenput => {
            this.optRecipenput = optRecipenput;
            this.getInsuranceList(this.optRecipenput.recipeId);           
      });
    }	
    
    //	获取险种列表信息
	getInsuranceList(insuranceId:number):void{
		this.typesOfInsuranceCatalogAddInsuranceService.getInsuranceList(insuranceId)
		 .then(result=>{
		 	console.log(result)
            this.a = result.data;
		 	for(let i=0;i<result.data.length;i++){
		 		this.a = result.data[i].insuranceId;
		 	}
			this.optRecipeList = [];
			for(let item of result){
              	  this.optRecipeList.push(item);
           	}
	  })	
	}   
//保存
    saveAuditPlan(): void {
    	if(this.TestInsuranceName && this.TestPeople && this.CheckPersonName){
// 报销分类   	
    		for(let i = 0;i<this.reimbursements.length;i++){
				delete this.reimbursements[i].isShow ;
// 是否可以编辑
				if(this.reimbursements){
					this.reimbursements[i].isEnableModify=1;
				}else{
					this.reimbursements[i].isEnableModify=0;
				}
				//险种id
				this.reimbursements[i].insuranceId = this.a;
			}
    		this.addInsuranceDetail.reimbursements = this.reimbursements;
    	
    	
// 投保人员比例     
        	this.addInsuranceDetail.personCategory = this.personCategorys.join(",");
        
        
       		this.insuranceName =  this.addInsuranceDetail.name;//险种名称
       		this.insuranceDescription =  this.addInsuranceDetail.description;//险种简介
      		 this.insurancedrugNumbers =  this.addInsuranceDetail.drugNumbers;//复方位数
    		this.typesOfInsuranceCatalogAddInsuranceService.addAuditPlan(this.addInsuranceDetail)
    			  .then(res => {
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
      		});  	
    	}else if(!this.TestInsuranceName){
    		this.dialogPlugin.tip("险种名格式错误",null,"error");
    	}else if(!this.TestPeople){
    		this.dialogPlugin.tip("投保人员格式错误",null,"error");
    	}else if(!this.CheckPersonName){
    		this.dialogPlugin.tip("投保人员重名",null,"error");
    	}

    }

//   点击添加投保人员类别  
    addPersonCategory(){
          this.personCategorys.push(this.info);
          console.log(this.personCategorys)
    }
    
//点击增加
	addDetails(){
	 	let reimbursementObject: AddInsuranceDesignation  = new  AddInsuranceDesignation();
		this.isShowBtn = false;
	 	this.reimbursements.push(reimbursementObject);
//	   	this.isShowBtn = false;
	}
//完成
	renderData(obj,i){
		console.log(obj)
		if(this.TestClassifyName && this.TestScale && this.CheckSameName){
			this.reimbursements[i].summary = obj.summary;
			this.reimbursements[i].rate = obj.rate;
			this.reimbursements[i].description = obj.description;
			obj.isShow = false;
			this.isShowBtn = true;
			this.testDatail.push(obj.summary);
			console.log(this.testDatail)
		}else if(!this.TestClassifyName){
			this.dialogPlugin.tip("分类名错误",null,"error");
		}else if(!this.TestScale){
			this.dialogPlugin.tip("比例格式错误",null,"error");
		}else if(!this.CheckSameName){
			this.dialogPlugin.tip("用户名重名",null,"error");
		}
		
		
		
		
	}
	
//	对话框取消
    cancelButtom(){
    	this.dialogPlugin.myModule();
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
	
//	删除投保人
	deleatePerson(i){		
		this.personCategorys.splice(i,1)		
		this.deleateCheckName(this.personCategorys)	
	}
//	删除分类
	deleateClassify(i){
		this.reimbursements.splice(i,1);
		this.testDatail.splice(i,1);
		this.isShowBtn = true;
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
//	检测投保人重名
	checkPersonName(personName){
		console.log(personName)
		console.log(this.personCategorys)
		for(let i=0;i<this.personCategorys.length;i++){
			if(personName == this.personCategorys[i]){
				this.CheckPersonName=false;
				this.dialogPlugin.tip('投保人同名',null,'error');
				return false;
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
	
	
}
   


