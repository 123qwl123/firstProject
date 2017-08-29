import { Component,OnInit} from '@angular/core';

import { IndexService } from './index.service';
@Component({
	selector:'index-app',
    templateUrl: 'index.component.html',
	styleUrls:['index.component.css','../../app.component.css'],
	providers:[IndexService]
})


export class IndexAppComponent implements OnInit{
	constructor( private indexService : IndexService){

	}
	private all = this.indexService.invalidInformationcs;
	private item = {name:"1",field:"2",advicecInformationc:"asdasdsa",nameColspan:"2"}
	ngOnInit(){
	
		for(var i = 0; i<this.indexService.invalidInformationcs.length;i++){
			this.indexService.invalidInformationcs[i]['nameColspan']=0;
			this.indexService.invalidInformationcs[i]['fieldColspan']=0;
			if(i == 0){
				this.indexService.invalidInformationcs[i]['nameColspan']=4;
				this.indexService.invalidInformationcs[i]['fieldColspan']=2;
			}else if( i == 2){
				 this.indexService.invalidInformationcs[2]["fieldColspan"] = 2;
			}

		}
	 
	
	}

}