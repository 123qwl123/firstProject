//报销分类下面的参数
export class AddInsuranceDesignation {
	  id:number;//id
      summary: string; // 类别名称  
      rate: number;//比例
      description:string;//描述
      insuranceId:number; //险种名称    
      isEnableModify:number;//是否可以编辑
      isShow:boolean = true; 
}
