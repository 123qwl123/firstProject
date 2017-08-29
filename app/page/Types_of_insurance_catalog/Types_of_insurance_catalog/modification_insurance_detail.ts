import {InsuranceModificationListDetail} from './modification_list_detail';

//总共的数据信息,除了报销分类
export class InsuranceModificationDetail{
     id:number;//id
     name:string;//险种名称
     gmtModified:number;//修改时间
     drugNumbers:number;//复方位数
     gmtCreate:number;//创建时间
     description:string;//描述
     personCategory:string;//投保人员类别
//   isEnableModify:1;//是否可以编辑
     reimbursements:InsuranceModificationListDetail[] =[];//报销分类
}