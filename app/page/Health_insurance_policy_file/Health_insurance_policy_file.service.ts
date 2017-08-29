import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HealthInsurancePolicyFileService {
    constructor(private http: Http) { }
    
    
    private delDataUrl ='/ipharmacare-distributed-yb-web/policy/';//删除政策信息
   
    
    //删除 -> 政策
    del(policyId: string) {
//  	console.log(policyId)
        let tempUrl = this.delDataUrl  + policyId;
        return this.http.delete(tempUrl)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError);
     }
    
     

// /**
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

