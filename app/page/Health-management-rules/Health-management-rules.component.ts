import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild, HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Health-management-rules',
	templateUrl:'Health-management-rules.component.html',
	styleUrls:['Health-management-rules.component.css']
})
export class HealthManagementRules implements OnInit {
	handleType: number = 0;	//0 =>规则, 1 => 目录
	
	constructor(
		private router: Router
	) { }

    cateType: any = {};						//当前节点的数据类型
    
    ngOnInit() {  }
    
//  判断显示隐藏
	private isTextShow:boolean = false;
	private isShow:boolean = true;
	private isCatalogShow:boolean = false;
	private isRulesShow:boolean = true;
    
    
    //版本管理
    versionManagementTitle(){
    	let link = ['page/Health-management-rules/Health-management-rules/version-management'];
    	this.router.navigate(link);
    }
    //规则校验
    RulesCheckTitle(){
        let link = ['page/Health-management-rules/Health-management-rules/Rules-checkout'];
    	this.router.navigate(link);
    }
     
     
     
}



