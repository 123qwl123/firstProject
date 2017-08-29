import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { VersionManagementService } from './version-management.service';
//引入插件
import { DialogPlugin, DialogModel } from '../common/ug-dialog/dialog';

@Component({
	selector: 'version-management',
	templateUrl:'version-management.component.html',
    styleUrls:['version-management.component.css'],
	providers:[VersionManagementService]
})
export class VersionManagementComponent implements OnInit{
	
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	
	constructor(
		private versionManagementService:VersionManagementService,
		private router: Router
	) {}
	private all = this.versionManagementService.invalidInformationcs;
	private item = {name:"1",field:"1",advicecInformationc:"1",drugCatalogVersion:"1",ruleVersionProjectVersion:"1",ruleVersionMaterialVersion:"1",operation:"1"}
	ngOnInit(){ }   
	
//   修改
     modification(){
    	let link =['page/Health-management-rules/version-management/HealthRules_version/HealthRules_version'];
    	this.router.navigate(link);
    }
     
     //返回
     returnHealthManagement(){
     	let link = ['page/Health-management-rules/Health-management-rules/Rules-checkout'];
     	this.router.navigate(link);
     }
     
//   添加
     choose(){
     	this.dialogPlugin.myModule();
     }
}
