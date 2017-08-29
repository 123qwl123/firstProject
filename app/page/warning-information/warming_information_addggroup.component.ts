import { Component, OnInit, Input,Pipe, trigger, PipeTransform,state, style,Renderer, transition, animate, ViewChild, HostListener} from '@angular/core';
import { Router } from '@angular/router';


@Component({
	selector: 'warming_information_addggroup',
	templateUrl:'warming_information_addggroup.component.html',
	styleUrls:['warming_information_addggroup.component.css']
})
export class 	WarmingInformationAddggroupComponent implements OnInit {
   //依赖注入
	constructor(
        private router: Router
	) {  }
    
    //初始化
     ngOnInit() { }
     
     
//   判断显示隐藏
	private isTextShow:boolean = false;
	private isShow:boolean = true;
	
	private selectShow:boolean = true;
	private selectHide:boolean = false;
	


		
}


