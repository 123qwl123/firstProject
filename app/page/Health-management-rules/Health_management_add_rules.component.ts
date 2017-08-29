import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild, HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'Health_management_add_rules',
	templateUrl:'Health_management_add_rules.component.html',
	styleUrls:['Health_management_add_rules.component.css']
})
export class HealthManagementAddRulesComponent implements OnInit {
	constructor(
		private router: Router
	) { }

    cateType: any = {};						//当前节点的数据类型
    
//  判断显示隐藏的
    private isShow:boolean = false;
	private isTextShow:boolean = true;
    private isTimeSpan:boolean = false;
     
//   时间跨度
    timeSpan(){
    	alert(123)
    }
    
    ngOnInit() {  }
    
//  下一步
    nextStep(){
//  	let link = ['page/Health-management-rules/Health_management_add_rules/Health_management_rules_list/Health_management_rules_list'];
//  	this.router.navigate(link);
    }
}



