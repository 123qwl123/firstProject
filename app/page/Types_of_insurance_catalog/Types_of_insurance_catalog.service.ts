import { Injectable } from '@angular/core';
//import { InvalidInformationcs,InvalidInformationc  } from './messages';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TypesOfInsuranceCatalogComponentService {
//  invalidInformationcs = InvalidInformationcs;

    constructor(private http: Http) { }
    
//  险种的列表信息
    private insuranceListUrl = '/ipharmacare-distributed-yb-web/insurance/insuranceVO';
    getInsuranceList(insuranceId:number){
    	return this.http.get(this.insuranceListUrl)
    	    .toPromise()
            .then(this.extractData)
            .catch(this.handleError)
    }

    /**
     * promise预处理
     */
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
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
