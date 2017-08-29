import { Component,OnInit,ViewChild} from '@angular/core';
import { DataTreeService } from './Disease.service';
import { TreeComponent, TreeNode , TREE_ACTIONS, IActionMapping} from 'angular2-tree-component';
import { DialogPlugin } from '../../common/ug-dialog/dialog';
import { DialogModel } from '../../common/ug-dialog/dialog.model';
import { Router } from '@angular/router';

import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';

import { FileInfo , DataList} from './FileInfo';

@Component({
	selector:'disease-app',
    templateUrl: 'Disease.component.html',
	styleUrls:['Disease.component.css','../../../app.component.css'],
	providers:[DataTreeService]
})


export class DiseaseComponentApp {
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	@ViewChild(TreeComponent)
	private tree: TreeComponent;
	
	
	/*初始化发送获取险种请求*/
	private insuranceTypeOption : any = {
		width:'100%',
		height:'34px',
		api:'/ipharmacare-distributed-yb-web/insurance'
	};
	/*报销分类option*/
	private ReimbursementOption :any = {
		width:'100%',
		height:'30px',
		api:'/ipharmacare-distributed-yb-web/reimbursement'
	}
	/*分析类型*/
	private analysisTypeOption : any = {
		width:'135px',
		height:'24px',
		padding:0,
		api:'/ipharmacare-distributed-yb-web/type/comboBox'
	};
	/*tree配置项*/
 	options = {
		getChildren:this.getChildren.bind(this),
		idField: 'id',
		// isExpandedField: 'open'
	};
	

	constructor(
		private dataTreeService: DataTreeService,private router: Router
		) { 
		
	}

	/*变量*/
	private isShow:boolean = false;
	private isTextShow:boolean = true;
	diseaseTreeData:any;
	dataList: DataList = new DataList();
	isAdd: boolean;						//是否为添加操作
	searchWord: string;					//搜索条件
	curNode: any;						//当前节点。  pCode 判断是否为根节点
	curTreeNode: TreeNode;
	cateType: any = [];						//当前节点的数据类型
	alertMessageTemplate:boolean = false;//警示信息模板
	vId:any;//增加的时候的版本ID
	insuranceId:any;//险种请求返回的保险ID
	versionId:any;//版本ID
	versionName:any;//当前版本名字
	list:any;//版本数据集合
	activeIdx:number = 0;
	reimbursementData:any;//报销分类数据
	reimbursementActiveId:any;//报销分类当前ID
    medicareRules:any;//医保规则
    selectedMessage:any;//active医保规则
    analysis:any;//分析类型
    promptmessage:any;//提示信息
    reimbursementRatio:any;//报销比例
    currentIndex:any = 0;//默认报销分类
    checkedDisease:string = "";//选中的疾病分类
    managementArray:any = [];//管理依据数组
    classification:any = [];//疾病分类
    activeInsuranceId:any;//险种ID
    backResult:any;//选中节点返回数据
    initList:any;//判断是否勾选包销分类后返回的对比数据
	/**
	 * 
	 */
	
	ngOnInit(){
		/*初始化行为*/
		
	}

	/********* 业务逻辑
	* 初始化获取目录的默认险种
	* ------------------
	* chooseInsurance($event)
	*  切换险种
	*-------------------
	*getVersionId()
	* 获取目录版本
	*-------------------
	*getDataTree()
	*根据目录版本险种获取第一层的树结构
	*-------------------
	/******************/
	chooseInsurance($event){
    	this.insuranceId = $event.id;
    	this.versionName = $event.name;
    	this.getVersionId();
    	this.curNode = null;
    	
    }
  
    getVersionId(){
    	console.log(this.insuranceId)
    	this.dataTreeService.getVersion(this.insuranceId)
    	.then( res=>{
    		if(res.code == 200 && res.data.length != 0){
    			this.list = res.data;
    			this.versionId =this.list[0].id;
    			this.versionName = this.list[0].name;
    			if(this.versionId != undefined){
    				this.getDataTree();
    			}
    		}else{
    			this.list=[];
    			this.versionName="";
    			this.diseaseTreeData = [];
    		}
    	})
    }
   
	getDataTree(){
		this.dataTreeService.getDrugsTree(this.insuranceId,this.versionId)
			.then(res => {
				if(res.code == 200){
					if(res.data.length !=0){
						this.setExpanded(res,false)
						this.diseaseTreeData = res.data;
					}else{this.diseaseTreeData = [];}
				}else{
					this.dialogPlugin.tip(res.message,null,'error',true)
				}
			});
	}
	 /*版本管理*/
    versionControl(){
    	let link:any= ['page/all_version_management/Sickness_version_management/'+this.insuranceId];
    	this.router.navigate(link);
    }
  
    
	/********* 左侧目录树功能逻辑
	*getSearchResult ，search
	*搜索模糊查询功能
	*-------------------
	* getChildren($event)
	* 点击倒三角获取子节点
	*-------------------
	*chooseNode()
	* 点击节点获取节点详情并可修改（根节点除外）
	*-------------------
	*save()
	*右侧保存按钮的逻辑
	*--------------------
	*updateData()
	*更新修改后的保存逻辑
	/***************/
	search(){
			this.getSearchResult(this.searchWord)
	}

	getSearchResult(dictValue:string){
		if(!dictValue) dictValue = "";
		this.dataTreeService.getSearchTree(dictValue,this.insuranceId,this.versionId)
			.then(res => {
				if (res != "") {
					if(!dictValue){
						this.diseaseTreeData= res;
						this.deleteTreeModelexpandedNodeIds()
					}else{
						this.setExpanded(res,true);
						this.diseaseTreeData= res;
					}
				}else{
					this.diseaseTreeData = [];
				} 
			});
	}

	getChildren(node: any): any {
		return this.dataTreeService.getChildrenByNode(node.data,this.insuranceId,this.versionId);
	}

	chooseNode($event: any){
		this.backResult = false;
		this.curTreeNode = $event.node;
		this.curNode = this.curTreeNode.data;
		console.log(this.curNode)
		this.dataTreeService.getData(this.curNode.id,this.versionId,this.insuranceId)
		.then(res => {
			if(res){
				this.backResult = true;
				this.cateType = res;
				for(let i = 0;i<this.cateType.length;i++){
						if(this.cateType[i].reimbursementId == ""){
							this.cateType[i].reimbursementId = "1";
						}	
				}
				this.getreimbursementData();
			}
		})
	}

	/*保存接口*/
	private save(): void {
		this.getCategoryGroup();
		let modifyData:any = {};
	    let newData:any = [];
	    /*新对象*/
		for(let i = 0;i<this.cateType.length;i++){
				  let newObject :any = {};
				  newObject.category = this.cateType[i].category;
				  newObject.diseaseCode = this.cateType[i].diseaseCode;
				  newObject.gmtCreate = this.cateType[i].gmtCreate;
				  newObject.gmtModified = this.cateType[i].gmtModified;
				  newObject.id = this.cateType[i].id;
				  newObject.insuranceId = this.cateType[i].insuranceId;
				  newObject.isReimbursement = this.cateType[i].isReimbursement;
				  newObject.reimbursementId = this.cateType[i].reimbursementId;
				  newObject.versionId = this.cateType[i].versionId;
				  newData.push(newObject);
		}
		modifyData['list'] = newData;
		this.updateData(modifyData);

	}

	/*获取每个险种的备选中的疾病分类*/
	getCategoryGroup(){
		for(let i = 0;i<this.cateType.length;i++){
			this.cateType[i].category="";
			let newArr:any = [];
			
			for(let j =0;j<this.cateType[i].categorys.length;j++){
				if(this.cateType[i].categorys[j].checked == true){
					newArr.push(this.cateType[i].categorys[j].id);
					console.log(newArr)
				}
			}
			this.cateType[i].category = newArr.join(",");
			console.log(this.cateType[i].category)
		}
	}
	private updateData(data:any): void {
	 	this.dataTreeService.diseaseSave(data)
	 	.then(res=>{
	 		if(res.code == 200){
	 			if(res.data.length != 0){
	 				this.tree.treeModel.getNodeById(this.curTreeNode.data.id).data.orgxtType = res.data[0].isReimbursement;
	 			}
				this.dialogPlugin.tip("保存成功",null,'success')
			}else{
				this.dialogPlugin.tip(res.message,null,'error',true)
			}
	 	})
	 	
	 }
	
  	/********* 增删改查操作后更新目录树的逻辑
	*updateNode()
	*修改操作后更新树
	*setExpanded()
	*更新树后展开或者关闭树的方法
	*-------------------
	/***************/
	
	setExpanded(arr: any[],flag?:any) {
		for(let i = 0; i < arr.length; i++) {
				this.tree.treeModel.expandedNodeIds[arr[i].id] = flag;
			if (arr[i].children && arr[i].open){
				this.setExpanded(arr[i].children);
			}

		}
	}

	
	/********* 右侧展示页面的功能
	*-------------------------
	*setMessage，getMessageData，saveMessage
	*警示信息逻辑方法
	*-------------------------
	/***************/
	
   setMessage(curNodeId?:any,insuranceId?:any){
   	this.activeInsuranceId = insuranceId?insuranceId:0;
   	curNodeId?this.getMessageData(this.versionId,this.activeInsuranceId,this.curNode.id):this.getMessageData(this.versionId,this.activeInsuranceId);
   	this.getAnalysisData();
   	this.alertMessageTemplate = true;
   	this.dialogPlugin.myModule();
   }
	
   getMessageData(versionId?:any,insuranceId?:any,nodeId?:any){
	  	this.dataTreeService.getInitMessage(versionId,insuranceId,nodeId)
	  	.then( res => {
	  		if(res.data){
	  			this.dataList = res.data;
	  			this.dataTreeService.getWarningMessage(this.dataList.managementBasis)
			   	 .then( res =>{
			   	 	 if(res.data.length != 0){
			   	 	 	this.medicareRules = res.data;
			   	 	 }
			   	 })
	  		}
	  	})

  }
 
  saveMessage(){
  	this.dataList.versionId = this.versionId;
    this.dataList.insuranceId=this.insuranceId;
  	this.dataList.nodeType = "JB";
  	this.getmedicareRulesGroup();
  	let code :any = this.dataList; 
  	
  	this.dataTreeService.saveMessage(code)
  	.then(res => {
  		if(res.code == 200){
	  		this.dialogPlugin.tip("保存成功",null,'success')
	  		if(this.curNode){
	  			this.curNode = null;
	  		}
	  		this.cancelMessage();
  		}else{
  				this.dialogPlugin.tip(res.message,null,'error',true)
  		}
  	})
  }
   /*取消警示信息设置*/
    cancelMessage(){
    	this.alertMessageTemplate =false;
    	this.dialogPlugin.onClose();
    }
    /*勾选管理依据*/
  checkMessage(checked: boolean, i: number){
  	if (checked) {
			this.medicareRules[i].checked = true;
		} else {
			this.medicareRules[i].checked = false;
		}
  }
   /*获取勾选的管理依据数据*/
getmedicareRulesGroup(){
	let data:any = this.medicareRules;
	this.dataList.managementBasis = "";
	this.managementArray = [];
	for(let i = 0;i<data.length;i++){
		if(data[i].checked == true){
			this.managementArray.push(data[i].id);
		}
	};
	this.dataList.managementBasis = this.managementArray.join(",");

}
  /***********************************************************************
  *以下是获取下拉框数据，和关联属性树的方法
  ************************************************************************/
   /*获取分析类型*/	
   getAnalysisData(){
   		this.dataTreeService.getAnalysis()
	   	.then(res =>{
	   		if(res.code == 200 && res.data.length !=0){
	 			this.analysis = res.data;
	 			 this.getPromptmessage(this.analysis[0].id)
	   		}
	   	})
   }
   
    /*获取报销分类数据*/
    getreimbursementData(){
    	this.dataTreeService.getreimbursement()
    	.then(res=>{
    		this.reimbursementData = res.data;
    		
    		
    	})
    }
    /*切换版本*/
    optionClick($event){
    	this.versionId = this.list[this.activeIdx].id;
    	if( this.versionId  != undefined){
    		this.getDataTree();
    		this.curNode = null;
    	}
    }
  
 
  /*勾选疾病分类*/
  classify(checked,g,i){
  	if (checked) {
			this.cateType[i].categorys[g].checked = true;
			console.log(this.cateType[i].categorys[g])
		} else {
			this.cateType[i].categorys[g].checked = false;
			console.log(this.cateType[i].categorys[g])
		}
  	console.log(this.cateType)
  }
 
  /*获取提示信息*/
  getPromptmessage(id?:any){
  	 this.dataTreeService.getPromptmessage(id)
  	 .then(res => {
  	 	if(res.code == 200 && res.data.length !=0){
  	 		this.promptmessage = res.data;
  	 		
  	 	}
  	 })
  }
  /*切换分析类型*/
  selectedanalysis($event){
  	if($event){
	  	let analysisId:any = $event;
	  	this.dataList.analysisType = analysisId;
	  	this.getPromptmessage(analysisId);
  	}
	this.dataList.promptType = "";
  }
  
  	/*删除展开属性*/
	deleteTreeModelexpandedNodeIds(){
		for(var prop in this.tree.treeModel.expandedNodeIds){
			if(this.tree.treeModel.expandedNodeIds.hasOwnProperty(prop)){
				delete this.tree.treeModel.expandedNodeIds[prop];
			}
		}
	}
 
}
