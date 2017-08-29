export class Limt{
	 contains(arr,target){
		let result:boolean = false;
		let obj :any = {};
		 for(let i = 0; i<arr.length;i++){
		 	if(arr[i] == target){
		 		obj.index = i;
		 		 result = true;
		 	}
		 };
		 obj.result = result;
		 return obj;
	}
}