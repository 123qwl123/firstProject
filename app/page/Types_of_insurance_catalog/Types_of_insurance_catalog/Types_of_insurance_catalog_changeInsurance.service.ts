import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
//import { Headers, Http, Response } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';
import 'rxjs/add/operator/toPromise';
import {AddInsuranceDetail} from './Type_insurance_addInsurance_detail';
@Injectable()
export class TypesOfInsuranceCatalogChangeInsuranceService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private auditPlan: AddInsuranceDetail = new AddInsuranceDetail();
	constructor(
		private http: InterceptorService
	) { }
	
	hospitalUrl = '/ipharmacare-distributed-yb-web/insurance'  //更新险种数据
	
//根据险种id来查看数据
	getOptRecipe(insuranceId:number){
        return this.http.get(this.hospitalUrl + "/" + insuranceId)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
 }
//增加保险信息   post
   updateAuditPlan(data: any): Promise<any> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.hospitalUrl, body, options)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError);
   }
//根据保险ID更新保险信息   put
	updateInsurance(data: any): Promise<any> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.hospitalUrl, body, options)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError);
    }
	private extractJson(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
	isEmptyObject(obj: any) {
        for (var name in obj) {
            return false;
        }
        return true;
    } 
    
    
	
}
