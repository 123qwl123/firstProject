//险种中增加部分的数据的参数
export class AddInsurance{
      id:number;
	  gmtCreate: string;// 创建时间  单位:ms
	  gmtModified:number;// 修改时间  单位:ms
	   name: string; //险种名称，必填666666
	  description: string;// 保险简介
	  personCategory: string;// 投保人员类别
	  drugNumbers: number;// 复方位数
	  constructor() { }
}