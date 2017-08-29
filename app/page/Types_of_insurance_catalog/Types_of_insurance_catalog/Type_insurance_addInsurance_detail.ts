import {AddInsuranceDesignation} from './Type_insurance_addInsurance_designation';
//险种中的参数
export class AddInsuranceDetail {
      id:number;//id
	  gmtCreate: string;// 创建时间  单位:ms
	  gmtModified:number;// 修改时间  单位:ms
	  name: string; //险种名称，必填666666
	  description: string;// 保险简介
	  personCategory: string;// 投保人员类别
	  drugNumbers: number;// 复方位数
    reimbursements:AddInsuranceDesignation[] = [];   
}