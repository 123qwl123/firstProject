import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';

//引入插件
import { DialogPlugin, DialogModel } from '../../common/ug-dialog/dialog';

@Component({
	selector: 'healthRules_version',
	templateUrl:'HealthRules_version.component.html',
	styleUrls:['HealthRules_version.component.css','../../../app.component.css']
})


export class HealthRulesVersionComponent implements OnInit{
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	
	constructor(
		private router: Router
	){}

	ngOnInit(){}
	
//	选择版本
    choose(){
    	this.dialogPlugin.myModule();
    }
    
//  返回
    returnVersionManagement(){
//   	let link = ['page/Health-management-rules/version-management'];
//   	this.router.navigate(link);
    }
}