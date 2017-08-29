import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { HealthInsurancePolicyFileService } from './Health_insurance_policy_file.service';
import { TableModel } from '../common/ug-table/table.module';


import { DialogPlugin } from '../common/ug-dialog/dialog';
import { DialogModel } from '../common/ug-dialog/dialog.model';
@Component({
	selector:'Health_insurance_policy_file',
	templateUrl:'Health_insurance_policy_file.component.html',
	styleUrls:['Health_insurance_policy_file.component.css'],
	providers:[HealthInsurancePolicyFileService]
})
export class HealthInsurancePolicyFileComponent implements OnInit{
	
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
    private policy: any[] = [];//参数列表
    private touchedTrow: any;//当前鼠标所在行
    selectedData: any;//数据
    
	constructor(
		private healthInsurancePolicyFileService:HealthInsurancePolicyFileService,
		private router: Router
	) {}
    ngOnInit(){ 
	}
	
//表格
    recipeListTable: any = {
        title: [{
            id: 'summary',
            name: '方案名称',
            width: '20%'
        },
        {
            id: 'source',
            name: '类型',
            width: '16%'
        },
        {
            id: 'ativeDate',
            name: '创建人',
            width: '14%'
        },
        {
            id: 'gmtModified',
            name: '创建时间',
            width: '20%'
        },
        {
            id: 'gmtCreate',
            name: '修改时间',
            width: '20%'
        },
        {
            id: '',
            name: '操作',
            width: '10%'
        }],
        pageSize:20,  //每页20行
        url:'/ipharmacare-distributed-yb-web/policy/{currentPage}/{pageSize}',
        dataListPath: "recordList",
        itemCountPath: "recordCount"
    };
//添加医保政策内容
	addFile(){
		console.log(6666)
		let link = ['page/Health_insurance_policy_file/Health_insurance_policy_file/Health_insurance_policy_file_add'];
    	this.router.navigate(link);   	
	}
	
	
//删除内容
    deleteData(item:any){
       this.selectedData = item;
       console.log(this.selectedData)
//	   this.dialogPlugin.confirm('您确定要删除吗？', () => {
			this.healthInsurancePolicyFileService.del(this.selectedData.id)
			.then(res => {
				console.log(res)
				if(res.code == 200){
					console.log(this.dialogPlugin)
					alert('删除成功,请重新刷新一下!');
//					this.dialogPlugin.tip("保存成功",null,'success');
				}else{
//					this.dialogPlugin.tip('服务器异常',null,'error')
				}
			})
//		}, () => { })	
	}
//修改数据
   goToEditPage(id?: number){
   	  let link:any[] = ['page/Health_insurance_policy_file/Health_insurance_policy_file/Health_insurance_policy_file_modification'];
   	   if (id)
            link.push(id);
   	  this.router.navigate(link);
   }
}

