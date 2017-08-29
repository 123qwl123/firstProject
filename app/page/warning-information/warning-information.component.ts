import { Component,OnInit,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { DialogPlugin, DialogModel } from '../common/ug-dialog/dialog';//引入插件
import {AddGroupDetail} from './addGroupsData';

import {WaringInformationService} from './warning-information.service';
import {WarmingInformationAddggroupComponent} from  './warming_information_addggroup.component';

@Component({
	selector: 'warning-information',
	templateUrl:'warning-information.component.html',
	styleUrls:['warning-information.component.css'],
	providers:[WaringInformationService]
})
export class WarningInformationComponent implements OnInit {
//	列表参数
	private addGroupDetail:AddGroupDetail = new AddGroupDetail();//存数据的
	private addGroupList:AddGroupDetail[]=[];//push数据的
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	
	insuranceId:any;//险种请求返回的保险ID
	versionName:any;//当前版本名字
	private optRecipenput: any = {};//route方法
	private recipeId: string;//route方法id
	
	private selectShow:boolean = true;
	private selectHide:boolean = false;
	
	 changeList:any;//选中的那个
	
/*初始化发送获取险种请求*/
	private insuranceTypeOption : any = {
		width:'100%',
		height:'34px',
		api:'/ipharmacare-distributed-yb-web/insurance'
	};
	
	private resource =[{name:'门诊'},{name:'急诊'},{name:'门急诊'},{name:'住院'},{name:'所有来源'}];
	private showSource:any =[];
	
//	切换险种 
	chooseInsurance($event){
    	this.insuranceId = $event.id;//险种id
    	this.versionName = $event.name; // 当前版本名称 
    }
//依赖注入
	constructor( 
		private waringInformationService:WaringInformationService,
		 private router: Router,
        private route: ActivatedRoute,
        private activeRouter: ActivatedRoute
	) {}
//初始化
     ngOnInit() {
     	  this.route.params.subscribe(optRecipenput => {
            this.optRecipenput = optRecipenput;
            this.getWaringDataList(this.optRecipenput.recipeId);           
          });
     }
	
//	判断显示隐藏
	private isTextShow:boolean = false;
	private isShow:boolean = false;   
	
//	获取所有警示方式
info:any;
waringsource:any;
	getWaringDataList(insuranceId:number):void{
		this.waringInformationService.getWaringData(insuranceId)
		 .then(res=>{
		 	this.info = res.data;
		 	console.log(this.info)
            for(let i=0;i<this.info.length;i++){
            	this.waringsource =this.info[i].source;
//          	console.log(this.waringsource)
            }
		 })
	}
//input点击.内容出现
	checkboxData(){
		this.selectHide =true;
	}	
//点击x,删除这个list
   deletDataList(){
   	 this.selectHide =false;
   }
//最后添加保存成功
    WarimgSave():void {
    	this.addGroupDetail.source = this.waringsource;
		this.waringInformationService.addWaringData(this.addGroupDetail)
		.then(res=>{
			console.log(res)
		})
	}	
	
//  医生端添加组合
    addGroups(){
     	
    }
//  判断选中把数据存起来
	saveCheckSource(arr,index,current){
		if(arr[index].name == "所有来源"){
			if(current.checked ==true){
				this.showSource=[];
				for(let i=0;i<arr.length;i++){
					if(i!=index){
						this.showSource[i]=arr[i].name;
					}
				}
				
			}else{
				this.showSource = [];

			}
			console.log(this.showSource.join(""));
		}
		else{
			if(current.checked==true){
				console.log(111111111111)
				this.showSource[index] = arr[index].name
			}else{
				this.showSource.splice(index,1)
				console.log(2222222222)
			}
			console.log(this.showSource.join(""))
		}
		 
	}
	

     
}


