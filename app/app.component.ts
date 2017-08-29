import { Component, OnInit, Input, trigger, state, style, transition, animate, ViewChild, HostListener} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Menu } from './Menus';
import './rxjs-operators';

import { CookieService } from 'angular2-cookie/services/cookies.service';
//引入插件
import { DialogPlugin } from './page/common/ug-dialog/dialog.plugin';

//引入Service
import { MenuService } from './menu.service';


@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    styles: [
        require('../src/bootstrap/css/bootstrap.css').toString(),
        require('./app.component.css').toString()
       
       ],
    providers: [
        CookieService,
        MenuService 
    ]
})
export class AppComponent implements OnInit {
    selectMenu: Menu;
    selectedThrMenu:any;//选中的三级菜单
    menus :Menu[];
    constructor(private menuService: MenuService) { }

     
    ngOnInit() {
        // this.menuService.getMenus().then( menus => {
        //     this.menus = menus;
        // })
        // this.menus = new ()this.menuService.getMenus()

    }

   
}
