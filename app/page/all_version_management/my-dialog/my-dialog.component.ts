
import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
//引入插件
import { DialogPlugin, DialogModel } from '../../common/ug-dialog/dialog';

@Component({
	selector:'my-dialog',
	templateUrl:'my-dialog.component.html',
	styleUrls:['my-dialog.component.css']
})
export class MyDialogComponent implements OnInit{
	//  判断显示隐藏
	private isTextShow:boolean = false;
	private isShow:boolean = true;
	private isCatalogShow:boolean = false;
	private isRulesShow:boolean = true;
	
	@ViewChild(DialogPlugin) dialogPlugin: DialogPlugin;
	
	constructor(
		private router: Router
	) {}

    ngOnInit() {  }
    
}

