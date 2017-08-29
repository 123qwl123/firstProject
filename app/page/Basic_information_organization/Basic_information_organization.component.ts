//import 'rxjs/add/operator/switchMap';
import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
//import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params } from '@angular/router';
import {OrganizationBasicInformationService} from './Basic_information_organization.service';
import { DialogPlugin, DialogModel } from '../common/ug-dialog/dialog';

import {OriganizationDetail} from './informationOriganzation';//左边数据类别
import {OfficeDataDetaul} from './officedata';//右边数据列表
import {SwitchContralDetail} from './switchCtrol';//左边开关数据控制的
@Component({
	selector:'Basic_information_organization',
	templateUrl:'Basic_information_organization.component.html',
	styleUrls:['Basic_information_organization.component.css'],
	providers:[OrganizationBasicInformationService]
})
export class BasicInformationOrganizationComponent implements OnInit{
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	private isTextShow:boolean = false;
	private isShow:boolean = true;
	searchWord:string;//搜索条件   
	
	private optRecipenput: any = {};//route方法
	private recipeId: string;//route方法id
	info:any;//定义左边数据的
	officeInfo:any;//定义右边数据的
	private optRecipeList: OriganizationDetail[] = [];//用来装左边列表数据的
	private isShowBtn:boolean = true;//控制开关按钮的
	hospitalId:number;//医院id
	private officeDataList:OfficeDataDetaul[] = [];//用来装右边列表数据的
	selectData:any;//模糊查询的数据
	switchContralDetail:SwitchContralDetail = new SwitchContralDetail();//左边开关数据控制的
	constructor(
		private organizationBasicInformationService:OrganizationBasicInformationService,
		private router: Router,
		private route: ActivatedRoute,
		private activeRouter: ActivatedRoute
	) {}
//初始化
    ngOnInit() { 
        //查询出所有医院      
        this.route.params.subscribe(optRecipenput => {
            this.optRecipenput = optRecipenput;
            this.getAllhospitalData(this.optRecipenput.recipeId); 
            
        });        
    }
//搜索
    search(){
		this.getSelectData(this.searchWord)
	}
//机构名称进行模糊查询    
   getSelectData(hospitalName:string){
   	  this.organizationBasicInformationService.getSelectData(hospitalName)
   	    .then(res=>{
   	    	this.selectData=res.data;
            if(res.code ==200){
            	if(res.data != ""){
            		this.optRecipeList = res.data;
            	}else{
            		this.optRecipeList = [];
            	}
            }else{
            	this.optRecipeList = [];
            }
   	    })
   }
//查询出所有医院   
a:any;
  getAllhospitalData(data:any){
  	this.organizationBasicInformationService.getAllhospital(data)
  	 .then(res=>{ 
  	 	if(res.code ==200){
  	 		this.a=res.data[0].hospitalId;
  	 		this.getOfficeData(this.a)
  	 	}
  	 	this.info =res.data;
  	 	this.optRecipeList = [];
  	 	for(let item of this.info){
  	 		this.optRecipeList.push(item);
  	 	}
  	 })
  }
// 左边表格对应的点击事件,根据id查找出右边的数据
   choose(data,i){
       this.hospitalId = this.optRecipeList[i].hospitalId;
       this.getOfficeData(this.hospitalId)
   }
//根据机构ID查询科室  
   getOfficeData(hospitalId:number):void{
   	console.log(hospitalId);
   	  this.organizationBasicInformationService.getOfficeData(hospitalId)
   	    .then(res=>{
   	    	this.officeInfo=res.data;
   	    	console.log(res);
   	    	this.officeDataList = [];
   	    	for(let i of this.officeInfo){
   	    		this.officeDataList.push(i);
   	    	}
   	})    	       
  }
//控制开关  optRecipe 当前数据源   i当前id,当前所指的那个 
switchId:any;//机构ID 
switchhospital:any;// 医院CODE
switchdepartment:any;// 部门代码
switchenable:any;// 1 ： 开启 0 : 关闭   // 是否开启医保干预
	 open(optRecipe,i){
         optRecipe.isShow=true;
         console.log(optRecipe)
//       取数据
         this.switchId=optRecipe.hospitalId;
         this.switchhospital=optRecipe.hospitalCode;
         this.switchdepartment=optRecipe.department;
         this.switchenable=optRecipe.enable;
         console.log(optRecipe.enable)
//       赋值数据 ,传数据
         this.switchContralDetail.id=this.switchId;
         this.switchContralDetail.hospital=this.switchhospital;
         this.switchContralDetail.department=this.switchdepartment;
         this.switchContralDetail.enable=this.switchenable;
//       console.log(this.switchContralDetail.enable);
         this.organizationBasicInformationService.getswitchContralData(this.switchContralDetail)
           .then(res=>{
//         	  console.log(res);
               if(res.code ==200){
               	  this.getOfficeData(this.switchId);
               }else{
//             	  this.getOfficeData("");
               }
           })
	 }
	 close(optRecipe,i){
        optRecipe.isShow=false;
	 }
 
}

