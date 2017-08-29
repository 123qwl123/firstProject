import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';
import 'rxjs/add/operator/toPromise';

import {SwitchContralDetail} from './switchCtrol';//左边开关数据控制的
@Injectable()
export class OrganizationBasicInformationService {
	
     constructor(private http: InterceptorService) { } 
     private headers = new Headers({'Content-Type': 'application/json'});
     private selectListURL = '/ipharmacare-distributed-yb-web/intervene/medicalOrgName';//机构模糊查询
     private gethospitalNameURL = '/ipharmacare-distributed-yb-web/intervene';//查询出所有医院
     private officeURL = 'ipharmacare-distributed-yb-web/intervene/org/';//根据机构ID查询科室
     private switchContralURL = 'ipharmacare-distributed-yb-web/intervene';//更改医院以及医院下所有科室的干预配置（开关左边）
 
 
  
 //机构模糊查询
     getSelectData(hospitalName:string){
     	console.log(hospitalName)
     	let tempUrl = this.selectListURL+"?hospitalName="+hospitalName;
     	return this.http.get(tempUrl)
	    	    .toPromise()
	            .then(this.extractJson)
	            .catch(this.handleError)
     }
//查询出所有医院     
     getAllhospital(data:any){
//   	console.log(data)
     	 return this.http.get(this.gethospitalNameURL)
	    	    .toPromise()
	            .then(this.extractJson)
	            .catch(this.handleError)
     }
//根据机构ID查询科室 
   getOfficeData(hospitalId:number){
   	  console.log(hospitalId)
   	    return this.http.get(this.officeURL + hospitalId)
	    	    .toPromise()
	            .then(this.extractJson)
	            .catch(this.handleError)
   }
//更改医院以及医院下所有科室的干预配置（开关左边）
     getswitchContralData(switchContralDetail:SwitchContralDetail){
     	console.log(switchContralDetail);
     	return this.http.put(this.switchContralURL, JSON.stringify(switchContralDetail), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
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
    isEmptyObject(obj: any) {
        for (var name in obj) {
            return false;
        }
        return true;
    }  
     
}


 let id = 0;
function uuid() {
    id = id + 1;
    return id;
}

