import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {InsuranceAddDetail} from './insurance_add_datail';

@Injectable()
export class HealthInsurancePolicyAddFileService {
    constructor(private http: Http) { }
    private headers = new Headers({'Content-Type': 'application/json'});
//新增医保政策
  private addInsuranceURL = '/ipharmacare-distributed-yb-web/policy';
  private lookModificationDataURL = '/ipharmacare-distributed-yb-web/policy/';//根据医保政策信息id查询 
  
//新增医保政策
    getInsuranceData(insuranceAddDetail:InsuranceAddDetail){
    	console.log(insuranceAddDetail);
    	return this.http.post(this.addInsuranceURL, JSON.stringify(insuranceAddDetail), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }
    
    
    //修改第一步  根据医保政策信息id查询
    getOptRecipe(policyId:number){
    	console.log(policyId)
      	let tempUrl:string = this.lookModificationDataURL + policyId;
        return this.http.get(tempUrl)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }
    
    //获取所有医院政策
    private HistoryDataURL = '/ipharmacare-distributed-yb-web/policy';
    getHistoryInfo(data:any){
    	console.log(data)
    	let tempUrl = this.HistoryDataURL;
    	return this.http.get(tempUrl)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
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

