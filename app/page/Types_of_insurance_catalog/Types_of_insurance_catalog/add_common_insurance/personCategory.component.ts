//import { Component,OnInit,ViewChild} from '@angular/core';
//import { Router } from '@angular/router';
//@Component({
//	selector:'personCategory',
//	templateUrl:'personCategory.component.html',
//	styleUrls:['personCategory.component.css']
//})
//export class PersonCategoryComponent implements OnInit{
//	constructor(

import { Component, OnInit, Input, Output, HostListener, EventEmitter} from '@angular/core';
import { AuditPlanWarningMap } from './audit-plan-warning-map';


@Component({
    selector:'personCategory',
	templateUrl:'personCategory.component.html',
	styleUrls:['personCategory.component.css']
})

export class PersonCategoryComponent implements OnInit{
    
    @Input() warningMap: AuditPlanWarningMap[];
    @Input() label: string;
    @Output() select = new EventEmitter();

    private warning: AuditPlanWarningMap;
   
    constructor(

    ) { }

////  emit(){
////      this.select.emit(this.warningMap);
////  }
    addWarning(): void {
    	console.log(6666)
//      this.closeAllWarningList();
//      this.warningMap.push(new AuditPlanWarningMap());
    }
//  closeAllWarningList(): void {
//      for(let warningMap of this.warningMap){
//          warningMap.isAnalysisBoxShow = false;
//      }
//  }
    ngOnInit() {
//      this.warning = this.warningMap[0];
    }
}