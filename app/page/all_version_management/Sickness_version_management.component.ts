import 'rxjs/add/operator/switchMap';
import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import { SicknessVersionManagementService } from './Sickness_version_management.service';
//引入插件
import { DialogPlugin, DialogModel } from '../common/ug-dialog/dialog';

import {AddManagementDetail} from './version_management_detail';
import {AddVersionManagementDesignation} from './version_management_designation';

import {SicenessAddDetail} from './siceness_add_datail';
import {VersionManagementmodification} from './version_management_modification';

import {SicknessDetail} from './siceness_detail';

@Component({
	selector:'Sickness_version_management',
	templateUrl:'Sickness_version_management.component.html',
	styleUrls:['Sickness_version_management.component.css','../../app.component.css'],
	providers:[SicknessVersionManagementService]
})
export class SicknessVersionManagementComponent implements OnInit{
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
	
   sicenessAddDetail:SicenessAddDetail = new SicenessAddDetail();
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
	private currentIndex:number; //修改保存中当前的数据
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	
	modificationsummary:any;
	modificationdescription:any;
	modificationId:any;
	
	sicknessDetail:SicknessDetail = new SicknessDetail();
	
	constructor(
		private sicknessVersionManagementService:SicknessVersionManagementService,
		private router: Router,
		private route: ActivatedRoute,
		private activeRouter: ActivatedRoute
	) {}

    ngOnInit() { 
		this.route.params.subscribe(optRecipenput => {
            this.optRecipenput = optRecipenput;
            this.getVersionManagementList(this.optRecipenput.recipeId);
            
         });   
    }
    private data:any;
    
    description:any;
    summarydata:any;
    
 //	获取药品管理下拉列表信息数据
	getVersionManagementList(data):void{
		this.sicknessVersionManagementService.getVersionManagementList(data)
		   .then(res=>{
		   	    this.optRecipeList = [];
		     	for(let item of res){
              	   this.optRecipeList.push(item);    
             }  
	   } )
    }	
//   修改
     choose(data,i):void{
     	this.dialogPlugin.myModule();
     	this.currentIndex = i;
     	this.modificationsummary = this.optRecipeList[i].summary;
     	this.modificationdescription = this.optRecipeList[i].description;
     	this.modificationId = this.optRecipeList[i].id;
     }
//修改中的保存
    modificationSave():void{
    	this.versionManagementmodification.summary = this.modificationsummary;
    	this.versionManagementmodification.description = this.modificationdescription;
    	this.versionManagementmodification.id = this.modificationId;
    	  this.sicknessVersionManagementService.getmodificationdata(this.versionManagementmodification)
    	  .then(data =>{    	  	 
                if(data.code == 200){
                	this.optRecipeList[this.currentIndex].summary = this.modificationsummary;
                	this.optRecipeList[this.currentIndex].description = this.modificationdescription;
                	this.dialogPlugin.tip("保存成功",null,'success');
                	this.dialogPlugin.onClose(); 
                }else{
                	this.dialogPlugin.tip("保存失败",null,'error');
                	this.dialogPlugin.myModule();
                }
            })   
    }
  //获取下拉列表
    getVersionList(data):void{
        this.sicknessVersionManagementService.getVersionManagementcommomList(data)
            .then(res => {  
            	this.selectList = res;
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
     		this.dialogPlugin.myModule();
     		this.getVersionList(this.versionId);
     }    
//   添加版本点击确认
    sureAddVersion(){
//  	console.log(this.id)
    	if(this.id){
    		this.sicknessVersionManagementService.getOptRecipe(this.id)
         	  .then(res =>{
         	  	this.info = res.data;
                this.description = this.info.description;
                this.summarydata = this.info.summary;
         	})
    	}    
    }    
//  点击添加版本按钮保存版本
     saveVersion():void{
     	this.sicenessAddDetail.summary = this.summarydata;
     	this.sicenessAddDetail.description = this.description;
     	this.sicenessAddDetail.oldId = this.id;
     	this.sicenessAddDetail.category = 'JB';
         	this.sicknessVersionManagementService.addVersionManagement(this.sicenessAddDetail)
         	  .then(data =>{
         	  	console.log(data)
         		if(data.code == 200){
         			this.dialogPlugin.tip("保存成功",null,'success');
         			this.dialogPlugin.onClose();
                    this.getVersionManagementList(this.optRecipenput.recipeId);
                }else{
                	this.dialogPlugin.tip("保存失败",null,'error');
                	this.dialogPlugin.myModule();
                }
            })    
       }



}

