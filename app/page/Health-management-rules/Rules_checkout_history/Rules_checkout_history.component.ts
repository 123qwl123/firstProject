import { Component,OnInit,ViewChild} from '@angular/core';
//import {RulesCheckoutHistoryService} from './Rules_checkout_history.service';

@Component({
	selector: 'rules_checkout_history',
	templateUrl:'Rules_checkout_history.component.html',
	styleUrls:['Rules_checkout_history.component.css']
	//providers:[RulesCheckoutHistoryService]
})


export class RulesCheckoutHistoryComponent implements OnInit{
	
	constructor(
		//private rulesCheckoutHistoryService:RulesCheckoutHistoryService
	){}
	
    //private all = this.rulesCheckoutHistoryService.invalidInformationcs;
    
	//private item = {name:"1",field:"1",advicecInformationc:"1",drugCatalogVersion:"1",ruleVersionProjectVersion:"1",ruleVersionMaterialVersion:"1",operation:"1"};
	
	ngOnInit(){}
}


