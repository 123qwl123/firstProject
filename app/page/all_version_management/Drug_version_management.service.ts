import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';

import { InterceptorService } from 'ng2-interceptors';

import 'rxjs/add/operator/toPromise';

import { VersionManagementSave } from './version_management_save';
import {VersionManagementmodification} from './version_management_modification';

@Injectable()
export class DrugVersionManagementService {
	private headers = new Headers({'Content-Type': 'application/json'});
	
     constructor(private http: InterceptorService) { } 
	    private inversionListUrl = '/ipharmacare-distributed-yb-web/version/list2/YP/';//药品版本管理的列表信息
        private updataVersionUrl = '/ipharmacare-distributed-yb-web/version/update/';//版本管理的修改页面     根据id查看
        private addVersionUrl = '/ipharmacare-distributed-yb-web/version';//根据版本管理增加数据   根据老版本新增新目录版本管理	
        private selectListURL = '/ipharmacare-distributed-yb-web/version/list2/comboBox/YP/';//药品添加中的下拉列表    
        private lookVersoinListURL = "/ipharmacare-distributed-yb-web/version/";//根据id查询目录信息     添加版本点击确认
        private modificationListURL = '/ipharmacare-distributed-yb-web/version/';//修改中调用根据id查询目录信息
        private modificationdataURL = '/ipharmacare-distributed-yb-web/version';//修改数据	    
//  药品版本管理的列表信息	    
	    getVersionManagementList(versionId:number){
	    	console.log(versionId)
	    	return this.http.get(this.inversionListUrl + versionId)
	    	    .toPromise()
	            .then(this.extractData)
	            .catch(this.handleError)
	    } 
// 版本管理的修改页面     根据id查看
     updateVersionManagement(data: any){
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.updataVersionUrl, body, options)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError);
    }
//根据版本管理增加数据   根据老版本新增新目录版本管理     
   addVersionManagement(versionManagementSave:VersionManagementSave){
           return this.http.post(this.addVersionUrl, JSON.stringify(versionManagementSave), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
   }  
//	点击修改页面    
    getmodificationdata(versionManagementmodification:VersionManagementmodification){
    	return this.http.put(this.modificationdataURL, JSON.stringify(versionManagementmodification), {headers: this.headers})
                   .toPromise()
                   .then(res => res.json())
                   .catch(this.handleError);
    }	   
//药品中的下拉菜单
    getVersionManagementcommomList(versionId:number){
	    	return this.http.get(this.selectListURL + versionId)
	    	    .toPromise()
	            .then(this.extractData)
	            .catch(this.handleError)
	} 
// 进行修改第一步
//   根据id查询目录信息   点击确认的时候
	 getOptRecipe(id:string){
      	let tempUrl:string = this.lookVersoinListURL + id;
        return this.http.get(tempUrl)
            .toPromise()
            .then(this.extractJson)
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

