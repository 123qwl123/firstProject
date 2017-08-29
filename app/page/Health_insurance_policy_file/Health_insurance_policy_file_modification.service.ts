import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';
import 'rxjs/add/operator/toPromise';

import {InsuranceModificationDetail} from './insurance_modification_datail';

@Injectable()
export class HealthInsurancePolicyFileModificationService {
    constructor(private http: InterceptorService) { }
    
     private saveDataUrl = '/ipharmacare-distributed-yb-web/policy';//修改->保存信息
     private lookModificationDataURL = '/ipharmacare-distributed-yb-web/policy/';//根据医保政策信息id查询 
      
      
   // 修改->保存信息 
    save(insuranceModificationDetail:InsuranceModificationDetail){
//  	console.log(666666);
    	console.log(insuranceModificationDetail)
        let body = JSON.stringify(insuranceModificationDetail);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.put(this.saveDataUrl, body, options)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError);
    }
    
    
    
    
    //修改第一步  根据医保政策信息id查询
    getOptRecipe(policyId:number){
//  	console.log(policyId)
      	let tempUrl:string = this.lookModificationDataURL + policyId;
        return this.http.get(tempUrl)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }
    
    
//   * promise处理
//   */
    private extractJson(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
}

