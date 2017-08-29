
//报销分类下面的内容
export class AddInsuranceDesignation {
	    id: number;//分类名称必填
      gmtCreate: string;
      gmtModified: string;
      insuranceId: number;
      summary: string;
      rate: number;
      description: string;
      isEnableModify: 1;
      constructor() { }
}
