/*药品目录service*/
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()

export class DataTreeService{
	 constructor(private http:InterceptorService ) { }
        private baseName = "/ipharmacare-distributed-yb-web/";
	 	drugsTreeUrl = this.baseName + "drug/tree";/*获取节点*/
        searchTreeUrl = this.baseName + "drug/";/*选择节点*/
        addTreeUrl = this.baseName + "drug";/*添加*/
        dragTreeUrl= this.baseName + "drug/drag"; /*拖拽*/
        searchByKeyWordTreeUrl= this.baseName + "drug/treeKeyword";/*按字查询*/
        addDrugsTreeUrl= this.baseName + "drug/treeDFS";/*增加药品*/
        versionUrl = this.baseName + "version/list/YP/";/*获取版本*/
        saveDrugsTreeUrl= this.baseName + "drug/batchDFS";/*保存药品*/
        warningUrl = this.baseName + "policy/policyForSelect";/*医保规则*/
        reimbursementUrl = this.baseName + "reimbursement";/*报销分类*/
        propUrl =  this.baseName + "drug/attrKey";//属性分类查询
        propValueUrl = this.baseName + "drug/attrVal";//获取属性值
        saveMessageUrl = this.baseName + "warningInfoSetting";//保存警示信息设置
        analysisUrl = this.baseName + "type/comboBox";//分析下拉框请求
        promptmessageUrl = this.baseName + "type/comboBox/";//提示类型请求
        getMessageUrl =  this.baseName + "warningInfoSetting";//提示信息的请求
        testNameUrl = this.baseName + 'drug/checkSummary';//检测同名
      
	 	 //获取药品树的所有子节点
	   getChildrenByNode(node: any,versionId?:any): Promise<any[]> {
	        let tempUrl: string = this.drugsTreeUrl;
             if (node && node.id){
                console.log(node)
                tempUrl += "?pid=" + node.id+"&&versionId="+versionId;
             }else{
                 tempUrl += "?versionId="+versionId;
             }
	        return this.http.get(tempUrl)
	            .toPromise()
	            .then(this.extractData)
	            .catch(this.handleError);
	    };

	     //获取资药品分类树
    getDrugsTree(dictVal?: string,versionId?:any ) {

        let tempUrl = dictVal ? `${this.drugsTreeUrl}?dictValue=${dictVal}` : this.drugsTreeUrl+"?versionId="+versionId;

        return this.http.get(tempUrl).toPromise()
            .then(this.extractJson)
            .catch(this.handleError);
    }
    /*获取查询结果*/
    getDrugsSearchTree(dictVal:string,versionId?:any){
        let tempUrl = this.searchByKeyWordTreeUrl+"?name="+dictVal+"&&versionId="+versionId;
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
    getData(id:any,versionId?:any){
        let tempUrl:string = this.searchTreeUrl + id + "?versionId="+versionId;
        return this.http.get(tempUrl)
                .toPromise()
                .then(this.extractJson)
                .catch(this.handleError);
    }

    updateData(data: any,id:any){
        let tempUrl:string = this.searchTreeUrl + id + "";
         return this.http.put(tempUrl, data)
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
        return this.http.put(tempUrl,data)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
    }
    /*获取新增药品信息*/
    getAddDrugsData(id:any,drugCode?:any,durgPid?:any,versionId?:any){
        console.log(durgPid)
        let tempUrl:string;
        if(!durgPid){
            tempUrl = this.addDrugsTreeUrl + "?id="+id +"&&versionId="+versionId+"&&drugCode="+drugCode+"&&durgPid=";
        }else{
             tempUrl = this.addDrugsTreeUrl + "?id="+id +"&&versionId="+versionId+"&&drugCode="+drugCode+"&&durgPid="+durgPid.id;
        }
        return this.http.get(tempUrl)
          .toPromise()
          .then(this.extractJson)
          .catch(this.handleError)
    }
    /*获取版本信息*/
    getVersion(insuranceId?:any){
        let tempUrl:string;
        tempUrl = this.versionUrl  + insuranceId;
          return this.http.get(tempUrl)
          .toPromise()
          .then(this.extractJson)
          .catch(this.handleError)

    }
    /*发送保存新增药品的请求*/
    postSaveDrugsData(data?:any){
        let tempUrl:string;
        tempUrl = this.saveDrugsTreeUrl;
         return this.http.post(tempUrl, data)
         .toPromise()
         .then(this.extractJson)
         .catch(this.handleError)
    }
    /*获取医保规则*/
    getWarningMessage(ids){
        let tempUrl:string;
        tempUrl  = this.warningUrl+"?ids="+ids;
        return this.http.get(tempUrl)
        .toPromise()
        .then(this.extractJson)
        .catch(this.handleError)
    }
    /*包销分类*/
    getreimbursement(){
        let tempUrl:string;
        tempUrl = this.reimbursementUrl;
        return this.http.get(tempUrl)
        .toPromise()
        .then(this.extractJson)
        .catch(this.handleError)
    }
    /*属性分类*/
    getProp(){
       let tempUrl:string;
        tempUrl = this.propUrl;
        return this.http.get(tempUrl)
        .toPromise()
        .then(this.extractJson)
        .catch(this.handleError)
    }
    /*获取属性值*/
    getPropValue(categoryCode?:any){
        let tempUrl:string;
        tempUrl = this.propValueUrl + "?categoryCode="+categoryCode;
        return this.http.get(tempUrl)
        .toPromise()
        .then(this.extractJson)
        .catch(this.handleError)
    }
    /*保存警示信息设置*/
    saveMessage(data?:any){
          let tempUrl:string;
          tempUrl = this.saveMessageUrl;
         return this.http.post(tempUrl, data)
         .toPromise()
         .then(this.extractJson)
         .catch(this.handleError)
    }
    /*分析类型*/
    getAnalysis(){
         let tempUrl:string;
          tempUrl = this.analysisUrl;
        return this.http.get(tempUrl)
        .toPromise()
        .then(this.extractJson)
        .catch(this.handleError)
    }
    /*获取提示类型*/
    getPromptmessage(id?:any){
        let tempUrl:string;
        tempUrl = this.promptmessageUrl+id;
        return this.http.get(tempUrl)
        .toPromise()
        .then(this.extractJson)
        .catch(this.handleError)
    }
    /*获取警示信息*/
    getInitMessage(versionId?:any,insuranceId?:any,nodeId?:any){
       let tempUrl:string;
           if(nodeId){
                tempUrl = this.getMessageUrl+"/"+versionId+"/"+insuranceId+"?nodeId="+nodeId;
           }else{
                tempUrl = this.getMessageUrl+"/"+versionId+"/"+insuranceId;
           }
        return this.http.get(tempUrl)
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
 


 