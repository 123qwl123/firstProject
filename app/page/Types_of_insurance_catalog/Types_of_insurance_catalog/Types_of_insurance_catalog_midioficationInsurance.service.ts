import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {AddInsuranceDetail} from './Type_insurance_addInsurance_detail';
import { AuditPlanMap } from './audit-plan-map';

@Injectable()
export class TypesOfInsuranceCatalogModificationInsuranceService { 
	private headers = new Headers({'Content-Type': 'application/json'});
	private auditPlanUrl = '/ipharmacare-distributed-yb-web/insurance';
	
   constructor(private http: Http) { }
   
      
      
      
      
      
// 增加保险信息  
   addAuditPlan(addInsuranceDetail: AddInsuranceDetail){
        return this.http.post(this.auditPlanUrl, JSON.stringify(addInsuranceDetail), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
   }

   /**
     * promsie处理
     */
    private handleError(error: any): Promise<any> {
        console.error('An error occcurred', error);
        return Promise.reject(error.message || error);
    }


}