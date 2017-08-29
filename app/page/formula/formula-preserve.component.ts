import { Component,OnInit,ViewChild} from '@angular/core';
import { DataTreeService } from './formula-preserve.service';
import { TreeComponent, TreeNode } from 'angular2-tree-component';
import { DialogPlugin, DialogModel } from '../common/ug-dialog/dialog';
// 1. 引入forms中的组件
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
// 2. 引入ng2-validation中的组件
// import {CustomValidators} from 'ng2-validation';
// 
 // import { Hero }    from './hero';

@Component({
//	selector:'drgus-app',
//  templateUrl: 'Drugs.component.html',
//	styleUrls:['Drugs.component.css','../../app.component.css'],
//	providers:[DataTreeService]
	selector: 'formula-preserve',
	templateUrl:'formula-preserve.component.html',
	styleUrls:['formula-preserve.component.css','../../app.component.css'],
	providers:[DataTreeService]
})


export class FormulaPreserveComponent implements OnInit{
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	@ViewChild(TreeComponent)
	private tree: TreeComponent;
	private analysisTypeOption : any = {
		width:'100%',
		height:'30px'
	};
	// powers = ['Really Smart', 'Super Flexible',
 //            'Super Hot', 'Weather Changer'];

  	

	constructor(
		private dataTreeService: DataTreeService
		) { 
		
	}
	private isShow:boolean = false;
	private isTextShow:boolean = true;

	drugsTreeData:any;

	isAdd: boolean;						//是否为添加操作
	searchWord: string;					//搜索条件
	/**
	 * @handlerType => 操作类型
	 * addData => 添加资料, addCate => 添加分类 
	 */
	handlerType: string;
	/**
	 * @docType => 资料类型
	 * data_pharmacy => 书籍, data_periodical => 期刊, data_elec_doc => 电子文献, data_elec_bull => 电子公告, data_others => 其他资料; 
	 */
	docType: string;					//当前顶级分类
	curDocType: string;					//当前上级分类

	curNode: any;						//当前节点。  pCode 判断是否为根节点
	curTreeNode: TreeNode;
	cateType: any = {};						//当前节点的数据类型
	model:any = {};      //当前的表单里的值
	yesButton:any; //是否报销
	noButton:any;
	addlevel:any;//新增层级
	dragData:any = {};//拖拽的节点
	/**
	 * 
	 */


	ngOnInit(){
		this.getDataTree();
		console.log(this.tree,this.tree.treeModel,this.tree.treeModel.getNodeById);

	}
	/*获取所有父节点*/
	getDataTree(dictValue?: string){
		this.dataTreeService.getDrugsTree(dictValue)
			.then(res => {
				console.log(res)
				/*模拟数据*/

				// for(var i =0;i<res.length;i++ ){
				// 	res[i]['isParent'] =true;
				// 	res[i]['hasChildren']=true;
				// }
				console.log(res)
				if (res != null) {
					// if (dictValue)
					// 	this.setExpanded(res);
					this.drugsTreeData = res;
			console.log(this.drugsTreeData)
				}
				else this.drugsTreeData = [];
			});
	}
	/*获取子节点*/
	getChildren(node: any): any {
		console.log(node.data)
		return this.dataTreeService.getChildrenByNode(node.data);
	}
	 options = {
		getChildren: this.getChildren.bind(this),
		idField: 'id',
		allowDrag: true
	}
	/*选择节点*/
	chooseNode($event: any){
		this.curTreeNode = $event.node;
		this.curNode = this.curTreeNode.data;
		this.dataTreeService.getData(this.curNode.id)
		.then(res => {
			this.cateType = res;
			// this.model  = this.cateType;
			// console.log(this.model)
			this.isAdd = false;		
			// console.log(this.cateType)
		})
	}
	/*删除节点*/
	delData(node: any) {
		this.dialogPlugin.confirm('您确定要删除吗？', () => {
			console.log(node)
				this.dataTreeService.delData(node.data.id)
					.then(res => {
							console.log(res)
						this.dialogPlugin.tip(res.message);
						if (res.code == 200) {
							this.deleteNode(node);
							this.curNode = null;
						}
					})
		}, () => { })
	}
	/*增加节点*/
	add(node:any){
		this.isAdd = true;
		this.cateType = {};
	}
	/*
	  点击节点查询详情，修改后的保存操作
	*/
	private save(): void {
		if(this.isAdd){
			 this.addData()
		}else{
			this.updateData();
		}
			
		
	}
	/*
	 如果是新增保存
	 */
	private addData(): void {
		let newData: any;
		newData = this.cateType;
		/*同级*/
		if(this.addlevel == 1 && this.curTreeNode.data.type !== 2 ){
			
			newData.parentId = this.curTreeNode.parent.data.id;
		
		}else{
			newData.parentId = this.curTreeNode.data.id;
		
		}
		let parentNode = this.tree.treeModel.getNodeById(newData.parentId);
		newData.isLeaf = 0;
		if(newData.summary){
			this.dataTreeService.addData(newData)
			.then(res => {
				if (res.code == 200) {
		 		this.dialogPlugin.tip("添加成功");
		 		res.data.name = res.data.summary;
		 		/*更新tree*/
		 		this.addNode(res.data,parentNode);
					
				}else{
					this.dialogPlugin.tip(res.message);
				}
			})
		}
	   
	}
	/**
	 * 更新资料内容
	 */
	 private updateData(): void {
	 	let modifyData: any;
	 	modifyData = this.cateType;
	 	console.log(modifyData)
	 	if(modifyData.summary){

		 	this.dataTreeService.updateData(modifyData,this.curNode.id)
		 	.then(res => {
		 		if (res.code == 200) {
		 		this.dialogPlugin.tip("保存成功");
					this.fixNodeDataFromResource(res);
					this.updateNode(res.data);
				}else{
					this.dialogPlugin.tip(res.message);
				}
		 	})
	 	}
	 }

	
	/*把修改后的name 值和父级节点的名字*/
	private fixNodeDataFromResource(res: any) {
		this.curTreeNode.data.name = res.data.summary;
	}
	
	//修改后更新tree中的数据
	private updateNode(node: any): boolean {
		let parentNode = this.curTreeNode.parent;
		if (!parentNode.children) {
			console.error("There is no child in this parentNode");
			return;
		}
		let curIdx = parentNode.data.children.indexOf(this.curTreeNode.data);
		parentNode.data.children[curIdx] = this.curTreeNode.data;
		console.log(parentNode.data.children[curIdx])
		this.tree.treeModel.update();
	}
	//删除后更新tree中的数据
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

	//新增一个数据后添加到tree中
	addNode(node: any,parentNode:any) {
		console.log(node.name)
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
	
	
	
	onMoveNode($event){
		this.dragData.id = $event.node.id;
		this.dragData.pid = $event.to.node.data.id;
		this.dialogPlugin.confirm('您确定更换节点层级吗？', () => {
		
				this.dataTreeService.postData(this.dragData)
					.then(res => {
						this.dragData = {};
						this.dialogPlugin.tip(res.message);
						
					})
		}, () => { })
	}
	
}
