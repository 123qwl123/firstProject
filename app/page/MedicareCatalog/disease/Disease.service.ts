/*药品目录service*/
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { InterceptorService } from 'ng2-interceptors';

@Injectable()

export class DataTreeService{
	 constructor(private http:InterceptorService ) { }
        private baseName = '/ipharmacare-distributed-yb-web/';
	 	diseaseTreeUrl = this.baseName +  "disease/tree";/*获取节点*/
        diseaseDetailTreeUrl = this.baseName + "disease";/*点击节点获取详情*/
        diseaseSaveUrl = this.baseName  + "disease";//保存请求
        diseaseSearchUrl = this.baseName + "disease/treeKeyword";//模糊查询
        diseaseTypeUrl = this.baseName + "disease/category";//疾病分类
        searchTreeUrl = this.baseName + "drug/";/*选择节点*/
        searchByKeyWordTreeUrl= this.baseName + "drug/treeKeyword";/*按字查询*/
        addDrugsTreeUrl= this.baseName + "drug/treeDFS";/*增加药品*/
        versionUrl = this.baseName + "version/list/JB/";/*获取版本*/
        warningUrl = this.baseName + "policy/policyForSelect";/*医保规则*/
        reimbursementUrl = this.baseName + "reimbursement";/*报销分类*/
        propUrl = this.baseName + "drug/attrKey";//属性分类查询
        propValueUrl = this.baseName + "drug/attrVal";//获取属性值
        saveMessageUrl = this.baseName + "warningInfoSetting";//保存警示信息设置
        analysisUrl = this.baseName + "type/comboBox";//分析下拉框请求
        promptmessageUrl = this.baseName + "type/comboBox/";//提示类型请求
        getMessageUrl = this.baseName + "warningInfoSetting";//提示信息的请求
        diseaseListUrl = this.baseName+ "disease/list";//获取list列表
      
	 	 //获取药品树的所有子节点
	   getChildrenByNode(node?: any,insuranceId?:any,versionId?:any): Promise<any[]> {
	        let tempUrl: string ;
             if (node && node.id){
                console.log(node)
                tempUrl = this.diseaseTreeUrl + "?pcode=" + node.id+"&&insuranceId="+insuranceId+"&&versionId="+versionId;
             }else{
                tempUrl = this.diseaseTreeUrl + "?insuranceId="+insuranceId+"&&versionId="+versionId;
             }
	        return this.http.get(tempUrl)
	            .toPromise()
	            .then(this.extractData)
	            .catch(this.handleError);
	    };

	     //获取资药品分类树
    getDrugsTree(insuranceId?:any,versionId?:any) {
        let tempUrl = this.diseaseTreeUrl + "?insuranceId=" + insuranceId + "&&versionId="+versionId;
        return this.http.get(tempUrl).toPromise()
            .then(this.extractJson)
            .catch(this.handleError);
    }
    //获取list列表
    // getListData(insuranceId,versionId){
    //     let tempUrl = this.diseaseListUrl+"?insuranceId="+insuranceId+"&&versionId="+versionId;
    //     return this.http.get(tempUrl).toPromise()
    //         .then(this.extractJson)
    //         .catch(this.handleError);
    // }
    /*获取查询结果*/
    getSearchTree(dictVal:string,insuranceId?:any,versionId?:any){
        let tempUrl =this.diseaseSearchUrl+"?name="+dictVal+'&&insuranceId='+insuranceId+'&&versionId='+versionId;
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
    getData(id:any,versionId?:any,insuranceId?:any){
        let tempUrl:string = this.diseaseDetailTreeUrl + "?diseaseCode="+id + "&&versionId="+versionId+"&insuranceId="+insuranceId;
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
    /*获取疾病分类*/
    getDiseaseType(categorys:any){
         let tempUrl:string = this.diseaseTypeUrl+"?categorys="+categorys;
        return this.http.get(tempUrl)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
    }
   
    /*保存请求*/
     diseaseSave(data:any){
        let tempUrl:string = this.diseaseSaveUrl;
        return this.http.post(tempUrl,data)
            .toPromise()
            .then(this.extractJson)
            .catch(this.handleError)
     }
    /*获取版本信息*/
    getVersion(insuranceId?:any){
        let tempUrl:string;
        tempUrl = this.versionUrl+insuranceId;
          return this.http.get(tempUrl)
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
    private extractData(res: Response) {
    	
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body.data;
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
  


 