
import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild, HostListener} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'rulesCheckout.component',
	templateUrl:'Rules-checkout.component.html',
	styleUrls:['Rules-checkout.component.css']
})
export class RulesCheckoutComponent implements OnInit {

	constructor( 
		private router: Router) {}

     ngOnInit() { }
     
//   校验历史
     checkHistory(){
  	    let link =['page/Health-management-rules/Rules-checkout/Rules_checkout_history/Rules_checkout_history'];
  	    this.router.navigate(link);
     }

    
//  下一步
    RulesCheckoutNextStep(){
    	let link =['page/Health-management-rules/Rules-checkout/Health_rules_checkout/Health_rules_checkout'];
    	this.router.navigate(link);
    }

}


