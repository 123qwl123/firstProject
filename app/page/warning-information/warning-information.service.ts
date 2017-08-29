import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AddGroupDetail} from './addGroupsData';

@Injectable()
export class WaringInformationService { 
private headers = new Headers({'Content-Type': 'application/json'});
	
   constructor(private http: Http) { }
   
   private getWaringDataURL = '/ipharmacare-distributed-yb-web/warningActionSetting';//获取所有警示方式
   private addWaringDataURL = '/ipharmacare-distributed-yb-web/warningActionSetting';//新增警示方式
   
   //获取所有警示方式
   getWaringData(data:any){
	   	return this.http.get(this.getWaringDataURL)
	    	    .toPromise()
	           .then(res => res.json())
	            .catch(this.handleError)
   }
   //新增警示方式
   addWaringData(addGroupDetail:AddGroupDetail){
   	console.log(addGroupDetail)
   	   return this.http.post(this.addWaringDataURL, JSON.stringify(addGroupDetail), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
   }
   
   
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}