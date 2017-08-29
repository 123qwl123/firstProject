//import 'rxjs/add/operator/switchMap';
import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
//import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import { MaterialVersionManagementService } from './Material_version_management.service';
//引入插件
import { DialogPlugin, DialogModel } from '../common/ug-dialog/dialog';

import {AddManagementDetail} from './version_management_detail';
import {AddVersionManagementDesignation} from './version_management_designation';

import {MaterialVersionManagementSave} from './material_version_management_save';
import {VersionManagementmodification} from './version_management_modification';
@Component({
	selector:'Material_version_management',
	templateUrl:'Material_version_management.component.html',
	styleUrls:['Material_version_management.component.css','../../app.component.css'],
	providers:[MaterialVersionManagementService]
})
export class MaterialVersionManagementComponent implements OnInit{
	//	获取险种列表信息
	private optRecipeList: AddManagementDetail[] = [];//用来装列表数据的
	private selectList:any;//用来装下拉菜单的数据
//	private tableList:any[]=[];
	private tableList:any;
	private auditPlan: AddVersionManagementDesignation = new AddVersionManagementDesignation();
	private optRecipenput: any = {};//route方法
	private recipeId: string;//route方法id
	private name:any;
    private versionId:any;
    private id:any;
    private summary:any;
    activeVersonId :any;
    //下拉菜单默认选中第一个
    activeIdx:number = 0;
    changeIndex:number = 0;
    list:any;//版本数据集合
    private index:any;
    
	private info:any;
	private changeInfo:any;
	private item:any = {};
	
	private auditOptions: any = {};
	history: any = history;
	
	private title:any;
	
	modifyDrugsTemplate:boolean = false;//修改模板
	
	private currentIndex:number; //修改保存中当前的数据
	
   materialVersionManagementSave:MaterialVersionManagementSave = new MaterialVersionManagementSave();
   versionManagementmodification:VersionManagementmodification = new VersionManagementmodification();
	
	//  判断显示隐藏
	private isTextShow:boolean = false;
	private isShow:boolean = true;
	private isCatalogShow:boolean = false;
	private isRulesShow:boolean = true;
	private isChangeHide:boolean = false;
	private isChangeShow:boolean = true;
	private isdialogHide:boolean = false;
	private isdialogShow:boolean = true;
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	constructor(
		private materialVersionManagementService:MaterialVersionManagementService,
		private router: Router,
		private route: ActivatedRoute,
		private activeRouter: ActivatedRoute
	) {}

    ngOnInit() { 
    	console.log(this.dialogPlugin)
    	
       //	获取险种列表信息初始化
		this.route.params.subscribe(optRecipenput => {
            this.optRecipenput = optRecipenput;
            this.getVersionManagementList(this.optRecipenput.recipeId);
            
       });
       console.log(this.versionId)
        this.versionId = this.activeRouter.params['value'].id;
	        if (this.versionId) {
	            this.getVersionManagementList(this.versionId);
	            this.getVersionList(this.versionId);
	        }
    
    }
    
 //	获取药品管理下拉列表信息数据
	getVersionManagementList(versionId:number):void{
		this.materialVersionManagementService.getVersionManagementList(versionId)
		   .then(res=>{
		   	this.auditPlan=res;
		   		this.optRecipeList = [];
		     	for(let item of res){
              	   this.optRecipeList.push(item);    
             }  
	   } )
   }
	
	
//   修改  
modificationsummary:any;
modificationdescription:any;
modificationId:any;
     choose(data,i):void{
     	this.dialogPlugin.myModule();
     	this.currentIndex = i;
     	this.modificationsummary = this.optRecipeList[i].summary;
     	this.modificationdescription = this.optRecipeList[i].description;  
     	this.modificationId = this.optRecipeList[i].id;
    }
 //  修改中的保存
    modificationSave():void{
    	  this.versionManagementmodification.summary = this.modificationsummary;
    	  this.versionManagementmodification.description = this.modificationdescription;
    	  this.versionManagementmodification.id = this.modificationId;
    	  this.materialVersionManagementService.getmodificationdata(this.versionManagementmodification)
    	  .then(data =>{    	  	 
                if(data.code == 200){
                	this.optRecipeList[this.currentIndex].summary = this.modificationsummary;
                	this.optRecipeList[this.currentIndex].description = this.modificationdescription;
                	this.dialogPlugin.tip("保存成功",null,'success');
                	this.dialogPlugin.onClose(); 
                }else{
                	this.dialogPlugin.myModule();
                }
            })   
    }
  //获取下拉列表
    getVersionList(versionId:number):void{
        this.materialVersionManagementService.getVersionManagementcommomList(versionId)
            .then(res => {  
            	this.selectList = res;
            	console.log(this.selectList)
            	this.activeVersonId = this.selectList[0].id;
            	this.name = this.selectList[this.activeIdx].name;
            	this.id = this.selectList[this.activeIdx].id;
            })
    }  
// select的change事件
    optionClick($event){
    	this.name = this.selectList[this.activeIdx].name;
    	this.id= this.selectList[this.activeIdx].id;
    }    
//  点击 添加版本按钮管理数据
     addVersionManagement(){
     	if(this.versionId){
     		this.dialogPlugin.myModule();
     		this.getVersionList(this.versionId);
     	}
     }    
//   添加版本点击确认
    description:any;
    sureAddVersion(){
    	if(this.id){
    		this.materialVersionManagementService.getOptRecipe(this.id)
         	  .then(res =>{
         	  	this.info = res.data;
                this.description = this.info.description
         	})
    	}    
    }    
//  点击添加版本按钮保存版本
     saveVersion():void{
     	this.materialVersionManagementSave.summary = this.name;
     	this.materialVersionManagementSave.description = this.description;
     	this.materialVersionManagementSave.oldId = this.id;
     	this.materialVersionManagementSave.insuranceId = this.versionId;
     	this.materialVersionManagementSave.category = 'CL';
         	this.materialVersionManagementService.addVersionManagement(this.materialVersionManagementSave)
         	  .then(data =>{
         		if(data.code == 200){
         			this.dialogPlugin.tip("保存成功",null,'success');
         			this.dialogPlugin.onClose();
         			this.getVersionManagementList(this.versionId);
                }else{
                	this.dialogPlugin.myModule();
                }
            })    
      }



}

