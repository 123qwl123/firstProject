import { Component,OnInit,ViewChild} from '@angular/core';
import { DataTreeService } from './ruleAnalyzeType.service';
import { TreeComponent, TreeNode , TREE_ACTIONS, IActionMapping} from 'angular2-tree-component';
import { DialogPlugin } from '../../common/ug-dialog/dialog';
import { DialogModel } from '../../common/ug-dialog/dialog.model';
import { Router } from '@angular/router';

import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';

// import { FileInfo , DataList} from './fileInfo';
import { Limt } from '../../common/limit';
@Component({
	selector:'ruleAnalyzeType-app',
    templateUrl:'ruleAnalyzeType.component.html',
	styleUrls:['ruleAnalyzeType.component.css','../../../app.component.css'],
	providers:[DataTreeService]
})


export class RuleAnalyzeTypeComponentApp {
	// @ViewChild(UploadPlugin) uploadPlugin: UploadPlugin;
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	@ViewChild(TreeComponent)
	private tree: TreeComponent;
	/*初始化发送获取险种请求*/
	private insuranceTypeOption : any = {
		width:'100%',
		height:'30px',
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
		idField: 'id'
	};
	

	constructor(
		private dataTreeService: DataTreeService,private router: Router
		) { 
		
	}

	/*变量*/
	isHint:boolean = true;
	Namecode:boolean;
	FXcode:boolean;
	rulesAnalysisData:any;
	rulesAnalysis:any;//类别
	// dataList: DataList = new DataList();
	isAdd: boolean;						//是否为添加操作
	searchWord: string;					//搜索条件
	curNode: any;						//当前节点。  pCode 判断是否为根节点
	curTreeNode: TreeNode;
    backCurrentData:any = {};						//返回当前节点的数据类型
	vId:any;//增加的时候的版本ID
	insuranceId:any;//险种请求返回的保险ID
	versionId:any;//版本ID
	versionName:any;//当前版本名字
	list:any;//版本数据集合
	activeIdx:number = 0;
    limit:Limt = new Limt();/*工具类*/
    testNameResult :boolean = true;
	/**
	 * 
	 */
	
	ngOnInit(){
		/*初始化行为*/
		this.getDataTree(null);
	}
	getDataTree(dictValue?: string){
		this.dataTreeService.getDrugsTree(dictValue)
			.then(res => {
				if(res.code == 200){
					if(res.data.length !=0){
					
						this.setExpanded(res.data,false)
						this.rulesAnalysisData = res.data;
					}else{this.rulesAnalysisData = [];}
				}else{
					this.dialogPlugin.tip(res.message,null,'error',true)
				}
				
			});
	}
	
	/********* 左侧目录树功能逻辑
	*getSearchResult ，search
	*搜索模糊查询功能
	*-------------------
	*chooseNode()
	* 点击节点获取节点详情并可修改（根节点除外）
	*-------------------
	*add()
	*点击节点的加号创建子集或同级目录
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
	/***************/
	search(){
			this.getSearchResult(this.searchWord)
	}
	getChildren(node: any): any {
		return this.dataTreeService.getChildrenByNode(node.data);
	}
	getSearchResult(dictValue: string){
		if(!dictValue) dictValue = "";
		this.dataTreeService.getDrugsSearchTree(dictValue)
			.then(res => {
				if(res.code == 200){
					if (res.data != "") {
						 if (dictValue !="") {
						 	// this.setExpanded(res.data,true);
						 }else{
						 	this.deleteTreeModelexpandedNodeIds()
						 }
						this.rulesAnalysisData = res.data;
					}else{
						this.rulesAnalysisData = [];
					} 
				}else{
					this.dialogPlugin.tip(res.message,null,'error',true)
				}
			});
	}

	chooseNode($event: any){
		this.testNameResult = true;
		this.curTreeNode = $event.node;
		this.curNode = this.curTreeNode.data;
		this.dataTreeService.getData(this.curNode.id)
		.then(res => {
			if(res.code == 200){
				 	this.backCurrentData = res.data;
					this.isAdd = false;
				
			}else{
				this.dialogPlugin.tip(res.message,null,'error',true)
			}
		})
	}

	add(node:any){
		this.isAdd = true;
		this.backCurrentData = {};
		
	}

	delData(node: any) {
		if(this.curNode.type != 1){
			this.dialogPlugin.confirm('此操作会删除所有子目录您确定要删除吗？', () => {
					this.dataTreeService.delData(node.data.id)
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
		}else{
			this.dialogPlugin.confirm('您确定要删除吗？', () => {
					this.dataTreeService.delData(node.data.id)
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
	}

	private save(): void {
		if(this.isAdd){
			 this.addData()
		}else{
			this.updateData();
		}
	}

	private addData(): void {
		let newData: any = {};
		newData = this.backCurrentData;
		newData.category = this.rulesAnalysis;
		if(this.rulesAnalysis == 'FX'){
			newData.typeId = this.curTreeNode.data.pid;
		}else{
			newData.typeId = this.curTreeNode.data.id;
		}
		let parentNode = this.tree.treeModel.getNodeById(newData.typeId);
		if(newData.summary && this.testNameResult && this.rulesAnalysis && this.Namecode ){
			console.log(this.Namecode)
			this.dataTreeService.postData(newData)
			.then(res => {
				if (res.code == 200) {
			 		this.dialogPlugin.tip("保存成功",null,"success");
			 		res.data.name = res.data.summary;
			 		if(this.rulesAnalysis == 'FX'){
			 			res.data.type = 0;
			 		}else{
			 			res.data.type = 1;
			 		}
			 		// 更新tree
			 		this.addNode(res.data,parentNode);	
			 		this.backCurrentData.summary = "";
				}else{
					this.dialogPlugin.tip(res.message,null,"error",true);
				}
			})
		}else if(!newData.summary){
			this.dialogPlugin.tip("请填写目录名称",null,"error");
		}else if(!this.testNameResult){
			this.dialogPlugin.tip("同级目录名称不能同名",null,"error");
		}else if(!this.rulesAnalysis){
			this.dialogPlugin.tip("请选择类型名称",null,"error");
		}else if(!this.Namecode){
			this.dialogPlugin.tip("目录名称请输入中文",null,"error");
		}
	   
	}

	private updateData(): void {
	 	let modifyData: any;
	 	modifyData = this.backCurrentData;
	 	if(modifyData.summary && this.testNameResult && this.Namecode){
		 	this.dataTreeService.updateData(modifyData)
		 	.then(res => {
		 		if(res.code == 200) {
		 		this.dialogPlugin.tip("保存成功",null,"success");
		 		/*把修改后的name 值和父级节点的名字*/
		 			this.tree.treeModel.getNodeById(this.curTreeNode.data.id).data.name = this.backCurrentData.summary;
				}else{
					this.dialogPlugin.tip(res.message,null,"error",true);
				}
		 	})
	 	}else if(!modifyData.summary){
	 		this.dialogPlugin.tip("请填写目录名称",null,"error")
	 	}else if(!this.testNameResult){
	 		this.dialogPlugin.tip("同级目录名称不能同名",null,"error")
	 	}else if(!this.Namecode){
	 		this.dialogPlugin.tip("目录名称请输入中文",null,"error")
	 	}
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
	 	this.getDataTree(null);
	 	this.curNode = null;
	 	this.isAdd = false;
	 }
		

	}
	/*新增的时候检测层级是否勾选*/
	testRulesAnalysisName(){
		if(this.isAdd){
			if(!this.rulesAnalysis){
				this.dialogPlugin.tip('请选择类型名称',null,'error')
			}
		}
	}

 /*检测同名请求*/
	checkName(name,id,pid){
		this.dataTreeService.checkName(name,id,pid)
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
		if(this.backCurrentData.summary !=""){

			if(this.isAdd){
				if(this.rulesAnalysis == 'FX'){
					this.checkName(this.backCurrentData.summary,null,'')
				}else{

					this.checkName(this.backCurrentData.summary,null,this.curNode.id)
				}
			}else{
				this.checkName(this.backCurrentData.summary,this.curNode.id,this.curNode.pid)
			}
		}else{
			this.dialogPlugin.tip('请选择目录名称',null,'error')
		}
	}

		/*删除展开属性*/
	deleteTreeModelexpandedNodeIds(){
		for(var prop in this.tree.treeModel.expandedNodeIds){
			if(this.tree.treeModel.expandedNodeIds.hasOwnProperty(prop)){
				delete this.tree.treeModel.expandedNodeIds[prop];
			}
		}
	}

	//	节点名称校验
	testIptName(value){	
		let reg = /[^\u0000-\u00FF]+$/g;
			let result = reg.test(value);
			if(result){
				this.Namecode = true;
				
			}else{
				this.dialogPlugin.tip('目录名称请输入中文',null,'error');
				this.Namecode = false;
			}
	}
	//	医保代码校验
	// testIptYBCode(value){
	// 	if(value){	
	// 		let reg1 = /^[a-zA-Z0-9\,\-\.]+$/g;
	// 		let result1 = reg1.test(value);
	// 		if(result1){
	// 			this.FXcode = true;
	// 		}else{
	// 			this.dialogPlugin.tip('请输入数字字母-或.',null,'error');
	// 			this.FXcode = false;
	// 		}
	// 	}else{
	// 		this.FXcode = true;
	// 	}
	// }
	
}
