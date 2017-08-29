import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'health_rules_checkout',
	templateUrl:'Health_rules_checkout.component.html',
	styleUrls:['Health_rules_checkout.component.css','../../../app.component.css']
})


export class HealthRulesCheckoutComponent implements OnInit{
	constructor(
		private router: Router
	){}

	ngOnInit(){
	}
	
	
	
//	返回修改
    ReturnModification(){
    	console.log(5555)
    }
	
	
//	查看处方
    LookRecipe(){
    	let link =['page/Health-management-rules/Rules-checkout/Health_rules_checkout/Health_look_recipe']
        this.router.navigate(link);
    }
    
//  模拟干预
    SimulateMeddle(){
     	let link =['page/Health-management-rules/Rules-checkout/Health_rules_checkout/Health_simulate_meddle']
        this.router.navigate(link);
     }
}