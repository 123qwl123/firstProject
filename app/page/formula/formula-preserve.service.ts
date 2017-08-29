//import {Injectable}     from '@angular/core';
//import {Http, Response} from '@angular/http';
//import {Headers, RequestOptions} from '@angular/http';
//import {InterceptorService } from 'ng2-interceptors';
//
//@Injectable()
//export class FormulaPreserveService {
//
//  constructor(
//      private http: InterceptorService) { }
//
//}

//import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
//import { Headers, RequestOptions } from '@angular/http';
//import { InterceptorService } from 'ng2-interceptors';
//
//@Injectable()
//
//export class DataTreeService{
//	 constructor(private http:InterceptorService ) { }
//
//	 	drugsTreeUrl = "/ipharmacare-distributed-yb-web/drug/getDrugCatalogTree";
//
//	 	 //获取药品树的所有子节点
//	   getChildrenByNode(node: any): Promise<any[]> {
//	        let tempUrl: string = this.drugsTreeUrl;
//           if (node && node.id)
//          tempUrl += "?pid=" + node.id;
//	        return this.http.get(tempUrl)
//	            .toPromise()
//	            .then(this.extractData)
//	            .catch(this.handleError);
//	    };
//
//	     //获取资药品分类树
//  getDrugsTree(dictVal?: string) {
//
//      let tempUrl = dictVal ? `${this.drugsTreeUrl}?dictValue=${dictVal}` : this.drugsTreeUrl;
//
//      return this.http.get(tempUrl).toPromise()
//          .then(this.extractData)
//          .catch(this.handleError);
//  }
//
//  private extractData(res: Response) {
//  	
//      if (res.status < 200 || res.status >= 300) {
//          throw new Error('Bad response status: ' + res.status);
//      }
//      let body = res.json();
//      return body.data || {};
//  }
//   private handleError(error: any) {
//      console.error('An error occurred', error);
//      return Promise.reject(error.message || error);
//  }
//
//
//
// 
//}
// let id = 0;
//function uuid() {
//  id = id + 1;
//  return id;
//}


/*药品目录service*/
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()

export class DataTreeService{
	 constructor(private http:InterceptorService ) { }

	 	drugsTreeUrl = "/ipharmacare-distributed-yb-web/drug/getDrugCatalogTree";/*获取节点*/
        searchTreeUrl = "/ipharmacare-distributed-yb-web/drug/";/*选择节点*/
        addTreeUrl = "/ipharmacare-distributed-yb-web/drug";/*添加*/
        dragTreeUrl="/ipharmacare-distributed-yb-web/drug/drag"; /*拖拽*/

	 	 //获取药品树的所有子节点
	   getChildrenByNode(node: any): Promise<any[]> {
	        let tempUrl: string = this.drugsTreeUrl;
             if (node && node.id)
            tempUrl += "?pid=" + node.id;
	        return this.http.get(tempUrl)
	            .toPromise()
	            .then(this.extractData)
	            .catch(this.handleError);
	    };

	     //获取资药品分类树
    getDrugsTree(dictVal?: string) {

        let tempUrl = dictVal ? `${this.drugsTreeUrl}?dictValue=${dictVal}` : this.drugsTreeUrl;

        return this.http.get(tempUrl).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }


     /**
     * 药品内容逻辑
     * @Method getData() => 获取对应数据
     * @Method addData() => 添加数据到对应目录
     * @Method updateData() => 修改对应的目录
     * @Method delData() => 删除对应数据
     */
    
    //点击节点获取数据方法
    getData(id:any){
        let tempUrl:string = this.searchTreeUrl + id + "";
        return this.http.get(tempUrl)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
    }

    updateData(data: any,id:any){
        let tempUrl:string = this.searchTreeUrl + id + "";
         return this.http.put(tempUrl, data)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }


    delData(id: string){
        let tempUrl:string = this.searchTreeUrl + id + "";
        return this.http.delete(tempUrl)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }

    addData(data: any){
        let tempUrl:string = this.addTreeUrl;
        return this.http.post(tempUrl, data)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }

    /*拖拽节点的post请求*/
    postData(data:any){
        let tempUrl:string = this.dragTreeUrl;
        return this.http.post(tempUrl,data)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
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


    private extractJson(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

 
}
   let id = 0;
function uuid() {
    id = id + 1;
    return id;
}