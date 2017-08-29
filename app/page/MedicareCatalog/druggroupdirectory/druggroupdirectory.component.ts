import { Component,OnInit,ViewChild} from '@angular/core';
import { DataTreeService } from './druggroupdirectory.service';
import { TreeComponent, TreeNode , TREE_ACTIONS, IActionMapping} from 'angular2-tree-component';
import { DialogPlugin } from '../../common/ug-dialog/dialog';
import { DialogModel } from '../../common/ug-dialog/dialog.model';
import { Router } from '@angular/router';

import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';

import { FileInfo , DataList} from './fileInfo';
import { Limt } from '../../common/limit';
@Component({
	selector:'druggroupdirectory-app',
    templateUrl:'druggroupdirectory.component.html',
	styleUrls:['druggroupdirectory.component.css','../../../app.component.css'],
	providers:[DataTreeService]
})

export class DruggroupdirectoryComponentApp {
	// @ViewChild(UploadPlugin) uploadPlugin: UploadPlugin;
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	@ViewChild(TreeComponent)
	private tree: TreeComponent;
	
	/*tree配置项*/
 	options = {
		idField: 'id'
	}

	addDrugsOption = {
		
		idField: 'id',
		isExpandedField: 'open'
	}

	constructor(
		private dataTreeService: DataTreeService,private router: Router
		) { 
		
	}

	/*变量*/
	medicineGroup:any;//医保药物组数据
	isAdd: boolean;						//是否为添加操作
	searchWord: string;					//搜索条件
	curNode: any;						//当前节点。  pCode 判断是否为根节点
	curTreeNode: TreeNode;
	activeIdNodeData: any = {};						//当前节点的数据类型
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
						this.medicineGroup = res.data;
					}else{this.medicineGroup = [];}
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

	getSearchResult(dictValue: string){
		if(!dictValue) dictValue = "";
		this.dataTreeService.getDrugsSearchTree(dictValue)
			.then(res => {
				if(res.code == 200){
					if (res.data != "") {
						this.deleteTreeModelexpandedNodeIds()
						this.medicineGroup = res.data;
					}else{
						this.medicineGroup = [];
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
				 	this.activeIdNodeData = res.data;
				 	console.log(this.activeIdNodeData)
					this.isAdd = false;
				
			}else{
				this.dialogPlugin.tip(res.message,null,'error',true)
			}
		})
	}

	add(node:any){
		this.isAdd = true;
		this.activeIdNodeData = {};
	}

	delData(node: any) {
		this.dialogPlugin.confirm('您确定要删除吗？', () => {
				this.dataTreeService.delData(node.data.id,this.activeIdNodeData.versionId)
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
		newData = this.activeIdNodeData;
		console.log( this.activeIdNodeData)
		let parentNode = this.tree.treeModel.getNodeById(newData.parentId);
		newData.isLeaf = 0;
		if(newData.summary && this.testNameResult){
			this.dataTreeService.postData(newData)
			.then(res => {
				if (res.code == 200) {
			 		this.dialogPlugin.tip("保存成功",null,"success");
			 		res.data.name = res.data.summary;
			 		/*更新tree*/
			 		this.addNode(res.data,parentNode);
						
				}else{
					this.dialogPlugin.tip(res.message,null,"error",true);
				}
			})
		}else if(!newData.summary){
			this.dialogPlugin.tip("请填写目录名称",null,"error");
		}else if(!this.testNameResult){
			this.dialogPlugin.tip("同级目录名称不能同名",null,"error");
		}
	   
	}

	private updateData(): void {
	 	let modifyData: any;
	 	modifyData = this.activeIdNodeData;
	 	for(let i in modifyData){
	 		if(modifyData.hasOwnProperty('drugsName')){
	 			delete modifyData.drugsName;
	 		}
	 	}
	 	if(modifyData.summary && this.testNameResult){
		 	this.dataTreeService.updateData(modifyData)
		 	.then(res => {
		 		if(res.code == 200) {
		 		this.dialogPlugin.tip("保存成功",null,"success");
		 		/*把修改后的name 值和父级节点的名字*/
					this.tree.treeModel.getNodeById(this.curTreeNode.data.id).data.name = this.activeIdNodeData.summary;
					
					
					
				}else{
					this.dialogPlugin.tip(res.message,null,"error",true);
				}
		 	})
	 	}else if(!modifyData.summary){
	 		this.dialogPlugin.tip("请填写目录名称",null,"error")
	 	}else if(!this.testNameResult){
	 		this.dialogPlugin.tip("同级目录名称不能同名",null,"error")
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

	}

 /*检测同名请求*/
	checkName(name,id,pid,vid){
		// this.dataTreeService.checkName(name,id,pid,vid)
		// 	.then( res =>{
		// 	   if(res.code == 200){
		// 	   		if(res.data == false){
		// 	   			 this.testNameResult = false;
		// 	   			 this.dialogPlugin.tip('同级目录名称不能同名',null,'error')
		// 	   		}else{
		// 	   			this.testNameResult = true;
		// 	   		}
		// 	   }else{
		// 	   	 this.dialogPlugin.tip(res.message,null,'error',true)
		// 	   }					
		// })
	}

/*检测同名*/
	testName(){
		// if(this.activeIdNodeData.summary !=""){
		// 			this.checkName(this.activeIdNodeData.summary,this.curNode.id,this.curNode.pid,this.versionId)
		// }else{
		// 	this.dialogPlugin.tip('请选择目录名称',null,'error')
		// }
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
