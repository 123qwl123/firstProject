//右边的数据,根据id查询的
export class OfficeDataDetaul {
	hospitalId:number;// 医院ID
	hospitalName:string;// 医院名称
	enable:number;//是否开启了医保干预  1:开启  2: 关闭
	department:string;//部门
	orgName:string;//科室名称
	orgType:string;// 科室类型  1: 门诊科室, 2: 住院科室
	hospitalCode:string;// 医院代码	
}