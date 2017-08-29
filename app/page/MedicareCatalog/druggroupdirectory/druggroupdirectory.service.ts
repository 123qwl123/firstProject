/*药品目录service*/
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()

export class DataTreeService{
	 constructor(private http:InterceptorService ) { }

	 	drugsTreeUrl = "/ipharmacare-distributed-yb-web/drugGroup";/*获取节点*/
        searchTreeUrl = "/ipharmacare-distributed-yb-web/drug/";/*选择节点*/
        addTreeUrl = "/ipharmacare-distributed-yb-web/drug";/*添加*/
        dragTreeUrl="/ipharmacare-distributed-yb-web/drug/drag"; /*拖拽*/
        searchByKeyWordTreeUrl="/ipharmacare-distributed-yb-web/drugGroup/keyword";/*按字查询*/
        addDrugsTreeUrl="/ipharmacare-distributed-yb-web/drug/treeDFS";/*增加药品*/
        versionUrl ="/ipharmacare-distributed-yb-web/version/list/YP/";/*获取版本*/
        saveDrugsTreeUrl="/ipharmacare-distributed-yb-web/drug/batchDFS";/*保存药品*/
        warningUrl = "/ipharmacare-distributed-yb-web/policy/policyForSelect";/*医保规则*/
        reimbursementUrl = "/ipharmacare-distributed-yb-web/reimbursement";/*报销分类*/
        propUrl = "/ipharmacare-distributed-yb-web/drug/attrKey";//属性分类查询
        propValueUrl = "/ipharmacare-distributed-yb-web/drug/attrVal";//获取属性值
        saveMessageUrl = "/ipharmacare-distributed-yb-web/warningInfoSetting";//保存警示信息设置
        analysisUrl = "/ipharmacare-distributed-yb-web/type/comboBox";//分析下拉框请求
        promptmessageUrl = "/ipharmacare-distributed-yb-web/type/comboBox/";//提示类型请求
        getMessageUrl = "/ipharmacare-distributed-yb-web/warningInfoSetting";//提示信息的请求
        testNameUrl = '/ipharmacare-distributed-yb-web/drug/checkSummary';//检测同名
      

	     //获取资药品分类树
    getDrugsTree(dictVal?: string ) {

        let tempUrl = dictVal ? `${this.drugsTreeUrl}?dictValue=${dictVal}` : this.drugsTreeUrl;

        return this.http.get(tempUrl).toPromise()
            .then(this.extractJson)
            .catch(this.handleError);
    }
    // /*获取查询结果*/
    getDrugsSearchTree(dictVal:string){
        let tempUrl = this.searchByKeyWordTreeUrl+"?drugName="+dictVal;
        return this.http.get(tempUrl).toPromise()
            .then(this.extractJson)
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
        let tempUrl:string = this.drugsTreeUrl + "/"+id;
        return this.http.get(tempUrl)
                .toPromise()
                .then(this.extractJson)
                .catch(this.handleError);
    }

    updateData(data: any){
        let tempUrl:string = this.drugsTreeUrl;
         return this.http.post(tempUrl, data)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }


    delData(id: string,versionId?:any){
        let tempUrl:string = this.searchTreeUrl + id + "?versionId="+versionId;
        return this.http.delete(tempUrl)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }

    postData(data: any){
        let tempUrl:string = this.addTreeUrl;
        return this.http.post(tempUrl, data)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }
    
    /*检测同名*/
    checkName(name?:string,id?:any,pId?:any,versionId?:any){
        let tempUrl:string;
        if(id){
             tempUrl = this.testNameUrl+"?summary="+name+"&&id="+id+"&&versionId="+versionId+"&&pid="+pId;
        }else{
             tempUrl = this.testNameUrl+"?summary="+name+"&&versionId="+versionId+"&&pid="+pId;
        }

        return this.http.get(tempUrl)
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


 