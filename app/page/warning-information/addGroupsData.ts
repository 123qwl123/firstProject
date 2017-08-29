export class AddGroupDetail {
	id:number;//自己的id
	insuranceId:number;//关联的保险id
	
	
//	category:D N ; // 医生端: D 护士端: N
	
	
    source:string;//所有来源
    ruleType:string;//规则类型
    reason:string;//使用理由
    level:string;//显示等级
    action:string;//执行操作
}