import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild, HostListener} from '@angular/core';
//import { Router } from '@angular/router';

@Component({
	selector: 'Health_management_catalog_content',
	templateUrl:'Health_management_catalog_content.component.html',
	styleUrls:['Health_management_catalog_content.component.css']
})
export class HealthManagementCatalogContentComponent implements OnInit {
	constructor(
//		private router: Router
	) { }

    //  判断显示隐藏
	private isTextShow:boolean = false;
	private isShow:boolean = true;
    
    ngOnInit() {  }
}



