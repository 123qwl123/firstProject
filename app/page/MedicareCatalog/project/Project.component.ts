import { Component,OnInit,ViewChild} from '@angular/core';
import { TreeComponent, TreeNode , TREE_ACTIONS, IActionMapping} from 'angular2-tree-component';
import { DialogPlugin } from '../../common/ug-dialog/dialog';
import { DialogModel } from '../../common/ug-dialog/dialog.model';
import { Router } from '@angular/router';
import { DataTreeService } from './Project.service';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';

import { FileInfo , DataList} from './fileInfo';
import { Limt } from './limit';
@Component({
	selector:'project-app',
    templateUrl: 'Project.component.html',
	styleUrls:['Project.component.css','../../../app.component.css'],
	providers:[DataTreeService]
	
})


export class ProjectComponentApp {
	
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
		getChildren: this.getChildren.bind(this),
		idField: 'id',
		allowDrag: true
	};
	constructor(
		private dataTreeService: DataTreeService,private router: Router
		) { 
		
	}

	/*变量*/
	importTreeUrl = "/ipharmacare-distributed-yb-web/item/excel";/*导入*/
	private isShow:boolean = false;
	private isTextShow:boolean = true;
	itemTreeData:any;
	dataList: DataList = new DataList();
	isAdd: boolean;						//是否为添加操作
	searchWord: string;					//搜索条件
	curNode: any;						//当前节点。  pCode 判断是否为根节点
	curTreeNode: TreeNode;
	cateType: any = {};						//当前节点的数据类型
	addlevel:any;//新增层级
	dragData:any = {};//拖拽的节点
	execlFile :any;
	isShowDownLoad:boolean = false;
	alertMessageTemplate:boolean = false;//警示信息模板
	addItemTemplate:boolean = false;//添加项目模板
	choosePropVlaueTemplate:boolean = false;//选择字典模版
	mytree :boolean = false;
	showTree :boolean = false;
	
	dId:any;//刪除時候的版本ID
	
	vId:any;//增加的时候的版本ID
	insuranceId:any;//险种请求返回的保险ID
	versionId:any;//版本ID
	versionName:any;//当前版本名字
	list:any;//版本数据集合
	activeIdx:number = 0;
	reimbursementData:any;//报销分类数据
	reimbursementActiveId:any;//报销分类当前ID
	propObject :any; //属性分类
	aboutTreeData :any;//字典值
    selectedName:string ;/*显示选中的名字*/
    medicareRules:any;//医保规则
    selectedMessage:any;//active医保规则
    analysis:any;//分析类型
    promptmessage:any;//提示信息
    currentIndex:any = 0;//默认报销分类
    limit:Limt = new Limt();/*工具类*/
    pId:any = [];//选中的字典ID
    pName:any = [];//选中的字典name
    managementArray:any = [];//管理依据数组
    testNameResult :boolean = true;
    YBcode:boolean = true; //医保校验
    SScode:boolean = true; //手术校验
    Namecode:boolean = true; //节点名称校验
    Calccode:boolean = true; //计数校验
    Itemcode:boolean = true; //项目名称校验
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
    	this.dataTreeService.getVersion(this.insuranceId)
    	.then( res=>{
    		if(res.code == 200 && res.data.length != 0){
    			this.list = res.data;
    			this.versionId =this.list[0].id;
    			this.versionName = this.list[0].name;
    			if(this.versionId != undefined){
    				this.getDataTree(null,this.versionId)
    			}
    		}else{
    			this.list=[];
    			this.versionName="";
  				this.itemTreeData = [];
    		}
    	})
    }
	getDataTree(dictValue?: string,versionId?:string){
		this.dataTreeService.getItemTree(dictValue,versionId)
			.then(res => {
				if(res.code == 200){
					this.deleteTreeModelexpandedNodeIds();
					if(res.data.length != 0){
						this.itemTreeData = res.data;
					}else{
						this.itemTreeData = [];
					}
				}else{
					this.dialogPlugin.tip(res.message,null,'error',true)
				}
			});
	}
	 /*版本管理*/
    versionControl(){
    	let link:any= ['page/all_version_management/Project_version_management/'+this.insuranceId];
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
	* 点击节点获取节点详情并可修改
	*-------------------
	*add()
	*点击节点的加号创建子集或同级目录,里面是一些请求所带的参数
	*-------------------
	*delData()
	*点击左侧节点删除按钮删除节点
	*-------------------
	*save()
	*右侧保存按钮的逻辑
	*--------------------
	*addData()
	*新增保存的逻辑
	*--------------------
	*updateData()
	*更新修改后的保存逻辑
	* uploadFile()
	* 上传文书的方法
	* -------------------
	* makeFileRequest()
	* 将文书导入目录树的方法
	* -------------------
	* onMoveNode，dragWarning
	* 拖拽方法和拖拽错误提示
	/***************/
	search(){
			this.getSearchResult(this.searchWord)
	}

	getSearchResult(dictValue: string){
		if(!dictValue) dictValue = "";
		this.dataTreeService.getDrugsSearchTree(dictValue,this.versionId)
			.then(res => {
				if(res.code == 200){
					if (res.data != "") {
						 if (dictValue !="") {
						 		this.setExpanded(res.data,true);
						 }else{
						 	this.deleteTreeModelexpandedNodeIds();
						 }
						this.itemTreeData= res.data;
					}else{
						this.itemTreeData = [];
					} 
				}else{
					this.dialogPlugin.tip(res.message,null,'error',true);
				}

			});
	}

	getChildren(node: any,versionId:any): any {
		return this.dataTreeService.getChildrenByNode(node.data,this.versionId);
	}
	chooseNode($event: any){
		this.addlevel = "";
		this.testNameResult = true;
		this.curTreeNode = $event.node;
		this.curNode = this.curTreeNode.data;
		this.dataTreeService.getData(this.curNode.id,this.versionId)
		.then(res => {
			if(res.code == 200){
				 	 this.cateType = res.data;
					this.isAdd = false;
					this.getreimbursementData();	
			}else{
				this.dialogPlugin.tip(res.message,null,'error',true)
			}
		})
	}

	add(node:any){
		this.isAdd = true;
	  	this.vId = this.cateType.versionId;
		
		this.cateType = {};
		this.cateType.reimbursementId="";
	
		this.cateType.code ="";
		this.cateType.isReimbursement = "";
		this.cateType.description = "";
		this.cateType.unit = "";
		this.cateType.isPhysicalDiagnosis = 0;
		this.cateType.ssicd = "";
	}

	delData(node: any) {
		this.dId = this.cateType.versionId;
		this.dialogPlugin.confirm('此操作会删除所有子目录您确定要删除吗？', () => {
			
				this.dataTreeService.delData(node.data.id,this.dId)
					.then(res => {
						if (res.code == 200) {
							this.dialogPlugin.tip("保存成功",null,'success');
							this.deleteNode(node);
							this.curNode = null;
						}else{
							this.dialogPlugin.tip(res.message,null,'error',true);
						}
					})
		}, () => { })
		
	}

	private save(): void {
		if(this.isAdd){
			 this.addData()
		}else{
			this.updateData();
			
		}
	}

	private addData(): void {
		let newData: any;
		newData = this.cateType;
		newData.versionId = this.vId;
		/*同级*/
		if(this.addlevel == 1){
			newData.parentId = this.curTreeNode.data.pid;
		}else{
			newData.parentId = this.curTreeNode.data.id;
		}
		let parentNode = this.tree.treeModel.getNodeById(newData.parentId);
		newData.isLeaf = 0;
		if(newData.summary && this.testNameResult && this.Namecode && this.SScode && this.YBcode && this.addlevel){
			this.dataTreeService.addData(newData)
			.then(res => {
				if (res.code == 200) {
			 		this.dialogPlugin.tip("保存成功",null,"success");
			 		res.data.name = res.data.summary;
			 		res.data.orgxtType = res.data.isReimbursement;
			 		/*更新tree*/
			 		this.addNode(res.data,parentNode);
					this.getChildren(this.curNode,this.versionId)	
					this.cateType.summary = "";
				}else{
					this.dialogPlugin.tip(res.message,null,"error",true);
				}
			})
		}else if(!newData.summary){
			this.dialogPlugin.tip("请填写目录名称",null,"error");
		}else if(!this.testNameResult){
			this.dialogPlugin.tip("同级目录名称不能同名",null,"error");
		}else if(!this.Namecode){
			this.dialogPlugin.tip("输入格式有误",null,"error");
		}else if(!this.YBcode){
			this.dialogPlugin.tip("输入格式有误",null,"error");
		}else if(!this.SScode){
			this.dialogPlugin.tip("输入格式有误",null,"error");
		}else if(!this.addlevel){
			this.dialogPlugin.tip("请选择目录位置",null,"error");
		}
	   
	}


	private updateData(): void {
	 	let modifyData: any;
	 	modifyData = this.cateType;
	 	if(modifyData.summary && this.testNameResult && this.Itemcode && this.Calccode && this.YBcode && this.SScode){
			
		 	this.dataTreeService.updateData(modifyData,this.curNode.id )
		 	.then(res => {
		 		
		 		if(res.code == 200) {
		 			
		 		this.dialogPlugin.tip("保存成功",null,"success");
		 		/*把修改后的name 值和父级节点的名字*/
		 		
					this.curTreeNode.data.name = res.data.summary;
					this.curTreeNode.data.orgxtType = res.data.isReimbursement;
					this.updateNode(res.data);
					
				}else{
					this.dialogPlugin.tip(res.message,null,"error",true);
				}
		 	})
	 	}else if(!modifyData.summary){
	 		this.dialogPlugin.tip("请填写目录名称",null,"error")
	 	}else if(!this.testNameResult){
	 		this.dialogPlugin.tip("同级目录名称不能同名",null,"error")
	 	}else if(!this.Itemcode){
	 		this.dialogPlugin.tip("输入格式有误",null,"error");
	 	}else if(!this.Calccode){
	 		this.dialogPlugin.tip("输入格式有误",null,"error");
	 	}else if(!this.YBcode){
	 		this.dialogPlugin.tip("输入格式有误",null,"error");
	 	}else if(!this.SScode){
	 		this.dialogPlugin.tip("输入格式有误",null,"error");
	 	}
	 }

    uploadFile(file: any) {
   	
        let uploadfile = file.files[0];
        this.makeFileRequest(uploadfile);
        this.dataTreeService.getItemTree(null,this.versionId)
			.then(res => {
				if(res.code == 200){
					if (res.data.length != 0 ) {
						this.itemTreeData = [];
						this.setExpanded(res,false);
						this.itemTreeData = res;
						this.tree.treeModel.update();
						this.curNode = null;
					}else{
						this.itemTreeData = [];
						this.curNode = null;	
					} 
				}else{
					this.dialogPlugin.tip(res.message,null,'error',true)
				}
				

			});
			/*清空file文件 避免相同文件不可导入*/
		file.value ="";

    }

	makeFileRequest(file: File) {
        let formData: FormData = new FormData(),
            xhr: XMLHttpRequest = new XMLHttpRequest(),
            fileData = new FileInfo();
        fileData.fileName = file.name;
        formData.append("file", file);
        formData.append("versionId", this.versionId);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let body = JSON.parse(xhr.response);
                    if (body.code  == 200) { 
                       this.dialogPlugin.tip("导入成功",null,"success");
                    }else {	
                         this.dialogPlugin.tip("服务器错误",null,"error");
                    }
                    
                } else {
                }
            }
        };
       
        xhr.open('POST', this.importTreeUrl, true);
        xhr.send(formData);
    }

    onMoveNode($event){
		this.dragData.id = $event.node.id;
		this.dragData.parentId =  $event.to.node.data.id;
		this.dragData.versionId = this.versionId;
	   if($event.node.type != 2 && !$event.to.node.data.virtual){

		this.dialogPlugin.confirm('您确定保存当前的操作吗？', () => {
		
				this.dataTreeService.postData(this.dragData)
					.then(res => {
						if(res.code == 200){
							this.dragData = {};
							this.dialogPlugin.tip("保存成功",null,"success");
						}else{
							this.dialogPlugin.tip(res.message,null,"error",true);
						}
					})
		}, () => {  this.getDataTree(null,this.versionId)},true,"如果不保存,将重置" )
	   }else if($event.node.type == 2){
	   			this.dragWarning('无法进行此操作是否重置？','如果不重置左侧树结构会出错');
	   }else{
	   			this.dragWarning('无法进行此操作是否重置？','如果不重置左侧树结构会出错');
	   }
	}
	dragWarning(innerHtml,message?:string){
		this.dialogPlugin.confirm(innerHtml, () => {
	    this.getDataTree(null,this.versionId)
	  }, () => { },false,message)
	}
  	/********* 增删改查操作后更新目录树的逻辑
	*updateNode()
	*修改操作后更新树
	*-------------------
	* deleteNode($event)
	* 删除节点后更新树
	*-------------------
	*addNode()
	* 新增节后更新树
	*-------------------
	*setExpanded()
	*更新树后展开或者关闭树的方法
	*-------------------
	* onMouseenter， onMoseleave
	* 显示模版下载和导入功能按钮
	/***************/
	
    onMouseenter($event){
    	this.isShowDownLoad = true;
    }
   
    onMoseleave($event){
    	this.isShowDownLoad = false;
    }
	setExpanded(arr: any[],flag?:any) {
		for(let i = 0; i < arr.length; i++) {
				this.tree.treeModel.expandedNodeIds[arr[i].id] = flag;
			if (arr[i].children && arr[i].open){
				this.setExpanded(arr[i].children);
			}

		}
	}
	private updateNode(node: any): boolean {
		let parentNode = this.curTreeNode.parent;
		if (!parentNode.children) {
			console.error("There is no child in this parentNode");
			return;
		}
		let curIdx = parentNode.data.children.indexOf(this.curTreeNode.data);
		parentNode.data.children[curIdx] = this.curTreeNode.data;
		this.tree.treeModel.update();
	}
	
	private deleteNode(node: any): boolean {
		let parentNode = this.curTreeNode.parent;
		if (!parentNode.children) {
			console.error("There is no child in this parentNode");
			return;
		}
		parentNode.data.children.splice(parentNode.data.children.indexOf(node.data), 1);
		if (parentNode.data.children.length == 0)
			parentNode.data.hasChildren = false;
		this.tree.treeModel.update();
		return true;
	}

	addNode(node: any,parentNode:any) {
		
	 if(parentNode){
	 	 let parentData = parentNode.data;
	 	if (parentData.children)
			parentData.children.push(node);//children已经加载出来
		else {
			if (!parentData.hasChildren) {
				parentData.hasChildren = true;
				parentData.children = new Array<any>();
				parentData.children.push(node);
			}
		}
		this.tree.treeModel.update();
	 }else{
	 	this.getDataTree(null,this.versionId)
	 }
		
		
	}

    /*取消事件*/
    cancelfn(){
    	this.addItemTemplate = false;
    	this.mytree = false;
		this.dialogPlugin.onClose();
    }

	
   setMessage(curNodeId?:any){
   	curNodeId?this.getMessageData(this.versionId,this.insuranceId,this.curNode.id):this.getMessageData(this.versionId,this.insuranceId);
   	this.getAnalysisData();
   	this.alertMessageTemplate = true;
   	this.dialogPlugin.myModule();
   }
	
   getMessageData(versionId?:any,insuranceId?:any,nodeId?:any){
	  	this.dataTreeService.getInitMessage(versionId,insuranceId,nodeId)
	  	.then( res => {
	  		if(res.code == 200){
	  			if(res.data){
		  			this.dataList = res.data;
		  				this.dataTreeService.getWarningMessage(this.dataList.managementBasis)
					   	 .then( res =>{
					   	 	 if(res.data.length != 0){
					   	 	 	this.medicareRules = res.data;
					   	 	 }else{
					   	 	 	this.medicareRules = [];
					   	 	 }
	   	 			})
	  			}
	  		}else{
	  			this.dialogPlugin.tip(res.message,null,'error',true)
	  		}
	  		
	  	})

}
 
  saveMessage(){
  	
  	this.dataList.nodeType = "XM";
  	this.getmedicareRulesGroup();
  	
  	let code :any = this.dataList; 
  	this.dataTreeService.saveMessage(code)
  	.then(res => {
  		if( res.code == 200){
  			this.dialogPlugin.tip("保存成功",null,"success");
  			this.cancelMessage();
  		}else{
  			this.dialogPlugin.tip(res.message,null,"error",true);
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
	   		}else{
	   			this.dialogPlugin.tip(res.message,null,'error',true)
	   		}
	   	})
   }
   
 
    /*获取报销分类数据*/
    getreimbursementData(){
    	this.dataTreeService.getreimbursement()
    	.then(res=>{
    		if(res.code == 200){
    			if(res.data){
    				this.reimbursementData = res.data;
    				if(this.cateType.reimbursementId == ""){
    					this.cateType.reimbursementId = "1";
    				}
    			}
    		}else{
    			this.dialogPlugin.tip(res.message,null,'error',true)
    		}
    		
    		
    	})
    }
   
    /*切换版本*/
    optionClick($event){
    	this.versionId = this.list[this.activeIdx].id;
    	if( this.versionId  != undefined){
    		this.getDataTree(null,this.versionId);
    		this.curNode = null;
    	}
    }
  
    /*选择属性值*/
    choosePropVlaue(){
    	if(this.cateType.attributeKey == "" ){
    		this.aboutTreeData = [];
    		this.dialogPlugin.tip("请先选择属性",null,"error");

    	}else{
    		if(this.aboutTreeData.length ){
	    		this.choosePropVlaueTemplate = true;
	    		this.mytree = true;
				this.dialogPlugin.myModule();
    		}
    	}
    }
  	/*检测同名请求*/
checkName(name,id,pid,vid){
	this.dataTreeService.checkName(name,id,pid,vid)
		.then( res =>{
		   if(res.code == 200){
		   		if(res.data == false){
		   			 this.testNameResult = false;
		   			 this.dialogPlugin.tip('同级目录名称不能同名',null,'error')
		   		}else{
		   			this.testNameResult = true;
		   		}
		   }else{
		   	 this.dialogPlugin.tip(res.message,null,'error',true)
		   }					
	})
}

/*检测同名*/
testName(){
	if(this.cateType.summary !=""){
			if(this.isAdd){
				if(this.addlevel == 1){
					this.checkName(this.cateType.summary,null,"",this.versionId)
				}else{
					this.checkName(this.cateType.summary,null,this.curNode.id,this.versionId)
				}
				
			}else{
				this.checkName(this.cateType.summary,this.curNode.id,this.curNode.pid,this.versionId)
			}
	}else{
		this.dialogPlugin.tip('请选择目录名称',null,'error')
	}
}
 /*新增的时候检测层级是否勾选*/
	testCatalog(){
		
		if(this.isAdd){
		
			if(!this.addlevel){
				
				this.dialogPlugin.tip('请选择目录位置',null,'error')
			}
		}
	}
  /*获取提示信息*/
  getPromptmessage(id?:any){
  	 this.dataTreeService.getPromptmessage(id)
  	 .then(res => {
  	 	if(res.code == 200 && res.data.length !=0){
  	 		this.promptmessage = res.data;
  	 		console.log(this.promptmessage)
  	 	}else{
  	 		this.dialogPlugin.tip(res.message,null,'error',true)
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
//输入框校验
	testIptItem(value){	
		let reg = /^[a-zA-Z0-9\-\.\u4e00-\u9fa5]+$/g;
			let result = reg.test(value);
			if(result){
				this.Itemcode = true;
				
			}else{
				this.dialogPlugin.tip('输入有误',null,'error');
				this.Itemcode = false;
			}
	}
	testIptName(value){	
		let reg = /^[a-zA-Z0-9\-\.\u4e00-\u9fa5]+$/g;
			let result = reg.test(value);
			if(result){
				this.Namecode = true;
				
			}else{
				this.dialogPlugin.tip('输入有误',null,'error');
				this.Namecode = false;
			}
	}
	testIptUnit(value){
		if(value){
			let reg = /^[a-zA-Z0-9\-\.\u4e00-\u9fa5]+$/g;
			let result = reg.test(value);
			if(result){
				this.Calccode = true;
				
			}else{
				this.dialogPlugin.tip('输入有误',null,'error');
				this.Calccode = false;
			}
		}else{
			this.Calccode = true;
		}
			
	}
	testIptYBCode(value){
		if(value){	
			let reg1 = /^[a-zA-Z0-9\,\-\.]+$/g;
			let result1 = reg1.test(value);
			if(result1){
				this.YBcode = true;
			}else{
				this.dialogPlugin.tip('请输入数字字母_或.',null,'error');
				this.YBcode = false;
			}
		}else{
			this.YBcode = true;
		}
	}
	testIptSSCode(value){
		if(value){
			let reg1 = /^[a-zA-Z0-9\-\.]+$/g;
			let result1 = reg1.test(value);
			if(result1){
				this.SScode = true;
			}else{
				this.dialogPlugin.tip('请输入数字字母_或.',null,'error');
				this.SScode = false;
			}
		}else{
			this.SScode = true;
		}
		
	}
 
}
