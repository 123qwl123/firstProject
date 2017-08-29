import { Component,OnInit,ViewChild} from '@angular/core';

@Component({
	selector: 'Health_management_rules_list',
	templateUrl:'Health_management_rules_list.component.html',
	styleUrls:['Health_management_rules_list.component.css']
})


export class HealthManagementRulesListComponent implements OnInit{
	constructor(
		
		) { 
		
	}
	private isShow:boolean = false;
	private isTextShow:boolean = true;

	

	ngOnInit(){}
	
	
}
