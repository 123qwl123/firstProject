import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { provideInterceptorService } from 'ng2-interceptors';
import { ServerInterceptor } from './server.interceptor';
//angular2 module
import { TreeModule } from 'angular2-tree-component';

import { AppRoutingModule } from '../app/app.routes';
//验证插件
import {CustomFormsModule} from "ng2-validation";


import { AppComponent }  from './app.component';
import { NgbModule, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

//自定义组件
import { DialogModule } from './page/common/ug-dialog/dialog';
import { TableModule } from './page/common/ug-table/table.module';
import { SelectComponent } from './page/common/select-comp/select.component';
//yinru yemian 
import { HomeComponent } from './home.component';
//文件导入
import { UploadPlugin } from './page/common/ug-upload/upload.plugin';
//页面
import { IndexAppComponent } from './page/index/index.component';
//药品目录
import { DrgusComponentApp } from './page/MedicareCatalog/drugs/Drugs.component';
//疾病目录
import { DiseaseComponentApp}  from './page/MedicareCatalog/disease/Disease.component';
//医保药物组目录
import { DruggroupdirectoryComponentApp } from './page/MedicareCatalog/druggroupdirectory/druggroupdirectory.component';
//规则分析类型
import { RuleAnalyzeTypeComponentApp } from './page/healthInsuranceSetting/ruleAnalyze/ruleAnalyzeType.component';
//警示信息设置
import { WarningInformationComponent } from './page/warning-information/warning-information.component';
//计算公式设置
import { FormulaPreserveComponent } from './page/formula/formula-preserve.component';
//版本生效设置
import {VersionEffectComponent} from './page/Version-effect/Version-effect.component';

//医保规则目录
//医保规则管理
import {HealthManagementRules} from './page/Health-management-rules/Health-management-rules.component';
//规则校验
import {RulesCheckoutComponent} from './page/Health-management-rules/Rules-checkout.component';
//版本管理
import {VersionManagementComponent} from './page/Health-management-rules/version-management.component';
//医保规则版本
import {HealthRulesVersionComponent} from './page/Health-management-rules/HealthRules_version/HealthRules_version.component';
//规则校验中内容
import {HealthRulesCheckoutComponent} from './page/Health-management-rules/Health_rules_checkout/Health_rules_checkout.component';
//校验历史的内容
import {RulesCheckoutHistoryComponent} from './page/Health-management-rules/Rules_checkout_history/Rules_checkout_history.component';
//查看处方
import {HealthLookRecipeComponent} from './page/Health-management-rules/Health_rules_checkout/Health_look_recipe.component';
//模拟干预
import {HealthSimulateMeddleComponent} from './page/Health-management-rules/Health_rules_checkout/Health_simulate_meddle.component'
//添加组合
import {WarmingInformationAddggroupComponent } from './page/warning-information/warming_information_addggroup.component';
//添加规则
import {HealthManagementAddRulesComponent} from './page/Health-management-rules/Health_management_add_rules.component';
//规则里面的主要内容
import {HealthManagementRulesContentComponent} from'./page/Health-management-rules/Health_management_rules_content.component';
//目录里面的主要内容
import {HealthManagementCatalogContentComponent} from'./page/Health-management-rules/Health_management_catalog_content.component';
//添加规则里面下一步 的那个列表
import {HealthManagementRulesListComponent} from './page/Health-management-rules/Health_management_rules_list/Health_management_rules_list.component';

//医保政策文件页面
//医保政策文件
import {HealthInsurancePolicyFileComponent} from './page/Health_insurance_policy_file/Health_insurance_policy_file.component';
////医保政策文件中添加组件
import {HealthInsurancePolicyFileAddComponent} from './page/Health_insurance_policy_file/Health_insurance_policy_file_add.component';
////医保政策文件中修改组件
import {HealthInsurancePolicyFileModificationComponent} from './page/Health_insurance_policy_file/Health_insurance_policy_file_modification.component';



 //险种目录版本
//险种目录版本主页面
import {TypesOfInsuranceCatalogComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog.component';
//险种目录版本下面的添加
import {TypesOfInsuranceCatalogAddInsuranceComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_addInsurance.component';
//险种目录版本下面的查看
import {TypesOfInsuranceCatalogLookInsuranceComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_lookInsurance.component';
//险种目录版本下面的修改
import {TypesOfInsuranceCatalogChangeInsuranceComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_changeInsurance.component';
//险种里面那个报销分类添加页面
import {AddApplyClassifyComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/add_apply_classify/add_apply_classify.component';
//险种下面那个投保人员类别添加
import {PersonCategoryComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/add_common_insurance/personCategory.component';


//机构基本信息
import {BasicInformationOrganizationComponent} from './page/Basic_information_organization/Basic_information_organization.component';

//医保项目目录
import {ProjectComponentApp} from './page/MedicareCatalog/project/Project.component';

//医保材料目录
import {MaterialComponentApp} from './page/MedicareCatalog/material/Material.component';


//药品中的版本管理
import {DrugVersionManagementComponent} from './page/all_version_management/Drug_version_management.component';
//疾病中的版本管理
import {SicknessVersionManagementComponent} from './page/all_version_management/Sickness_version_management.component';
//项目中的版本管理
import {ProgectVersionManagementComponent} from './page/all_version_management/Project_version_management.component';
//材料中的版本管理
import {MaterialVersionManagementComponent} from './page/all_version_management/Material_version_management.component';



@NgModule({
  //模版
  imports: [
    BrowserModule,
    FormsModule,
    DialogModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    //tree
    TreeModule ,
    TableModule   //表格

  ],
  //组建
  declarations: [
    AppComponent,
    HomeComponent,
    IndexAppComponent,
    UploadPlugin,//文件上传
    DrgusComponentApp ,// 药品目录
    DiseaseComponentApp,//疾病目录
    DruggroupdirectoryComponentApp,//医保药物组目录
    SelectComponent,//下拉框组件
    WarningInformationComponent, //警示信息设置
    FormulaPreserveComponent,   //计算公式设置
    VersionEffectComponent,  //版本生效设置
    RuleAnalyzeTypeComponentApp,//规则分析类型
//  医保规则页面
    HealthManagementRules,   //医保规则管理
    RulesCheckoutComponent,   //规则校验
    VersionManagementComponent,   //版本管理
    HealthRulesVersionComponent,       //医保规则版本
    HealthRulesCheckoutComponent,     //规则校验中内容
    RulesCheckoutHistoryComponent,   //校验历史的内容
    HealthLookRecipeComponent,    //查看处方
    HealthSimulateMeddleComponent,     //模拟干预
    WarmingInformationAddggroupComponent,    //添加组合
    HealthManagementAddRulesComponent,  //添加规则
    HealthManagementRulesContentComponent,    //规则里面的主要内容
    HealthManagementCatalogContentComponent,    //目录里面的主要内容
//  医保政策页面
    HealthInsurancePolicyFileComponent,     //医保政策文件
    HealthInsurancePolicyFileAddComponent,  //医保政策文件中添加组件
    HealthInsurancePolicyFileModificationComponent,  //医保政策文件中修改组件 
    HealthManagementRulesListComponent,   //添加规则里面下一步 的那个列表    
//  险种页面
    TypesOfInsuranceCatalogComponent,  //险种目录版本
    TypesOfInsuranceCatalogAddInsuranceComponent,   //险种目录版本下面的添加
    TypesOfInsuranceCatalogLookInsuranceComponent,   //险种目录版本下面的查看
     AddApplyClassifyComponent,    //险种里面那个报销分类添加页面
    TypesOfInsuranceCatalogChangeInsuranceComponent, //险种目录版本下面的修改  
    PersonCategoryComponent,//险种下面那个投保人员类别添加
//  所有的版本管理页面
    DrugVersionManagementComponent,   //药品中的版本管理
//  MyDialogComponent,  //版本管理中的对话框
    SicknessVersionManagementComponent,   //疾病中的版本管理
    ProgectVersionManagementComponent,   //项目中的版本管理
    MaterialVersionManagementComponent,  //材料中的版本管理
//  机构基本页面    
    BasicInformationOrganizationComponent,
   

    AddApplyClassifyComponent,    //险种里面那个报销分类添加页面
    ProjectComponentApp,         //医保项目目录
    MaterialComponentApp        //医保材料目录
    

],
//依赖注入
 providers: [
    ServerInterceptor,
    provideInterceptorService([
      ServerInterceptor
    ])
  ],
  // entryComponents:[AutocompleteWindowComponent,ConfirmComponent],
  bootstrap: [ AppComponent  ]
})
export class AppModule { }