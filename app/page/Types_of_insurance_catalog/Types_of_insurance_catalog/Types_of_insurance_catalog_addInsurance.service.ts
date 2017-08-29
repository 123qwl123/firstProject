import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {AddInsuranceDetail} from './Type_insurance_addInsurance_detail';
import { AuditPlanMap } from './audit-plan-map';

import {AddInsuranceMap} from './Type_insurance_addInsurance_map';

@Injectable()
export class TypesOfInsuranceCatalogAddInsuranceService { 
	private headers = new Headers({'Content-Type': 'application/json'});
	private auditPlanUrl = '/ipharmacare-distributed-yb-web/insurance';
	
   constructor(private http: Http) { }
   
      
     private auditPlanUrl2 = '/ipharmacare-distributed-yb-web/insurance';//根据险种id来查看数据
    //根据险种id来查看数据
    getOptRecipe(insuranceId:number){
    	console.log(insuranceId)
        return this.http.get(this.auditPlanUrl2 + "/" + insuranceId)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }
    
    
    //  险种的列表信息
    private insuranceListUrl = '/ipharmacare-distributed-yb-web/insurance/insuranceVO';
    getInsuranceList(insuranceId:number){
    	return this.http.get(this.insuranceListUrl)
    	    .toPromise()
           .then(res => res.json())
            .catch(this.handleError)
    }
      
      
      
// 增加保险信息  
   addAuditPlan(addInsuranceDetail: AddInsuranceDetail){
        return this.http.post(this.auditPlanUrl, JSON.stringify(addInsuranceDetail), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
   }
   
   
   
   
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}