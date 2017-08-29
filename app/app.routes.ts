import { Routes, RouterModule, CanActivate, Router } from '@angular/router';

import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
// import { CanDeactivateGuard } from './can-deactivate-guard.service';

//页面
import { IndexAppComponent } from './page/index/index.component';
//药品目录
import { DrgusComponentApp } from './page/MedicareCatalog/drugs/Drugs.component';
//疾病目录
import { DiseaseComponentApp } from './page/MedicareCatalog/disease/Disease.component';
//医保药物组目录
import { DruggroupdirectoryComponentApp } from './page/MedicareCatalog/druggroupdirectory/druggroupdirectory.component';
//规则分析类型
import { RuleAnalyzeTypeComponentApp } from './page/healthInsuranceSetting/ruleAnalyze/ruleAnalyzeType.component';
//警示信息设置
import { WarningInformationComponent } from './page/warning-information/warning-information.component';
//引入计算公式设置Component
import { FormulaPreserveComponent } from './page/formula/formula-preserve.component';
//版本生效设置
import {VersionEffectComponent} from './page/Version-effect/Version-effect.component';

//医保规则页面
//医保规则管理
import {HealthManagementRules} from './page/Health-management-rules/Health-management-rules.component';
//规则校验
import {RulesCheckoutComponent} from './page/Health-management-rules/Rules-checkout.component';
//版本管理
import {VersionManagementComponent} from './page/Health-management-rules/version-management.component';
//校验历史的内容
import {RulesCheckoutHistoryComponent} from './page/Health-management-rules/Rules_checkout_history/Rules_checkout_history.component';
//医保版本管理中的修改内容
import {HealthRulesVersionComponent} from './page/Health-management-rules/HealthRules_version/HealthRules_version.component';
//规则校验中内容
import {HealthRulesCheckoutComponent} from './page/Health-management-rules/Health_rules_checkout/Health_rules_checkout.component';
//查看处方
import {HealthLookRecipeComponent} from './page/Health-management-rules/Health_rules_checkout/Health_look_recipe.component';
//模拟干预
import {HealthSimulateMeddleComponent} from './page/Health-management-rules/Health_rules_checkout/Health_simulate_meddle.component';
//添加组合
import {WarmingInformationAddggroupComponent } from './page/warning-information/warming_information_addggroup.component';
//添加规则
import {HealthManagementAddRulesComponent} from './page/Health-management-rules/Health_management_add_rules.component';
//规则里面的主要内容
import {HealthManagementRulesContentComponent} from './page/Health-management-rules/Health_management_rules_content.component';
//目录里面的主要内容
import {HealthManagementCatalogContentComponent} from './page/Health-management-rules/Health_management_catalog_content.component';
//添加规则里面下一步 的那个列表
import {HealthManagementRulesListComponent} from './page/Health-management-rules/Health_management_rules_list/Health_management_rules_list.component';

//医保政策文件页面
//医保政策文件
import {HealthInsurancePolicyFileComponent } from './page/Health_insurance_policy_file/Health_insurance_policy_file.component';
////医保政策文件中添加组件
import {HealthInsurancePolicyFileAddComponent } from './page/Health_insurance_policy_file/Health_insurance_policy_file_add.component';
////医保政策文件中修改组件
import {HealthInsurancePolicyFileModificationComponent } from './page/Health_insurance_policy_file/Health_insurance_policy_file_modification.component';


//险种目录页面
//险种目录版本
import {TypesOfInsuranceCatalogComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog.component';
//险种目录版本下面的添加
import {TypesOfInsuranceCatalogAddInsuranceComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_addInsurance.component';
//险种目录版本下面的查看
import {TypesOfInsuranceCatalogLookInsuranceComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_lookInsurance.component';
//险种目录版本下面的修改
import {TypesOfInsuranceCatalogChangeInsuranceComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_changeInsurance.component';
////险种目录版本下面的修改
import {TypesOfInsuranceCatalogModificationInsuranceComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_midioficationInsurance.component';
//险种里面那个报销分类添加页面
import {AddApplyClassifyComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/add_apply_classify/add_apply_classify.component';
//险种下面那个投保人员类别添加
import {PersonCategoryComponent} from './page/Types_of_insurance_catalog/Types_of_insurance_catalog/add_common_insurance/personCategory.component';


//机构基本信息
import {BasicInformationOrganizationComponent} from './page/Basic_information_organization/Basic_information_organization.component';

//药品中的版本管理
import {DrugVersionManagementComponent} from './page/all_version_management/Drug_version_management.component';
//版本管理中的对话框
import {MyDialogComponent} from './page/all_version_management/my-dialog/my-dialog.component';
//疾病中的版本管理
import {SicknessVersionManagementComponent} from './page/all_version_management/Sickness_version_management.component';
//项目中的版本管理
import {ProgectVersionManagementComponent} from './page/all_version_management/Project_version_management.component';
//材料中的版本管理
import {MaterialVersionManagementComponent} from './page/all_version_management/Material_version_management.component';


//医保项目目录页面
import {ProjectComponentApp} from './page/MedicareCatalog/project/Project.component';

//医保材料目录页面
import {MaterialComponentApp} from './page/MedicareCatalog/material/Material.component';

// @Injectable()
// export class AuthGuard implements CanActivate {

//     // constructor() { }

//     canActivate() {

        
//         return false;
//     }
// }

// //引入页面Component
import { HomeComponent } from './home.component';


const routes: Routes = [{
    path: '',
    // redirectTo: '/home',
    component: HomeComponent,
    pathMatch: 'full'
}, {
    path: 'home',
    component:IndexAppComponent //首页

},{
    path :'page/MedicareCatalog/drugs/Drugs-component',//药品目录
    component: DrgusComponentApp
},{
	path:'page/MedicareCatalog/disease/Disease-component',//疾病目录
	component: DiseaseComponentApp
},{
	path:'page/MedicareCatalog/druggroupdirectory/druggroupdirectory-component',//医保药物组目录
	component:DruggroupdirectoryComponentApp
},{
	path: 'warning-information',//警示方式设置
    component:WarningInformationComponent
},{
	path: 'formula-preserve', //计算公式
    component:FormulaPreserveComponent
},{
	path: 'Version-effect', //版本生效
    component:VersionEffectComponent
},{
	path:'page/healthInsuranceSetting/ruleAnalyze/ruleAnalyzeType-component',//规则分析类型
	component:RuleAnalyzeTypeComponentApp
},
//医保规则页面
{
	path:'Health-management-rules',//医保规则
	component:HealthManagementRules
},{
	path:'page/Health-management-rules/Health-management-rules/version-management',//医保规则下的版本管理 
	component:VersionManagementComponent
},{
	path:'page/Health-management-rules/Health-management-rules/Rules-checkout',//医保规则下的规则校验
    component:RulesCheckoutComponent
},{
	path:'page/Health-management-rules/version-management/HealthRules_version/HealthRules_version',//医保规则下的版本管理 下面的修改页面
    component:HealthRulesVersionComponent
},{
	path:'page/Health-management-rules/Rules-checkout/Health_rules_checkout/Health_rules_checkout', //医保规则下的规则校验下的下一步
	component:HealthRulesCheckoutComponent
},{
	path:'page/Health-management-rules/Rules-checkout/Rules_checkout_history/Rules_checkout_history', //医保规则下的规则校验下的校验历史
	component:RulesCheckoutHistoryComponent
},{
	path:'page/Health-management-rules/Rules-checkout/Health_rules_checkout/Health_look_recipe', //医保规则下的规则校验下的查看处方
	component:HealthLookRecipeComponent
},{
	path:'page/Health-management-rules/Rules-checkout/Health_rules_checkout/Health_simulate_meddle',  //医保规则下的规则校验下的模拟干预
	component:HealthSimulateMeddleComponent
},{
	path:'page/warning-information/warning-information/warming_information_addggroup.component',  //警示信息下的添加 
	component:WarmingInformationAddggroupComponent
},{
	path:'page/Health-management-rules/Health-management-rules/Health_management_add_rules', //医保规则下的添加 
    component:HealthManagementAddRulesComponent
},{
	path:'page/Health-management-rules/Health-management-rules/Health_management_rules_content', //医保规则下的规则内容
    component:HealthManagementRulesContentComponent
},{
	path:'page/Health-management-rules/Health-management-rules/Health_management_catalog_content', //医保规则下的目录内容
    component:HealthManagementCatalogContentComponent
},
//医保政策页面
{
	path:'health_insurance_policy_file', //医保政策页面
    component:HealthInsurancePolicyFileComponent
},
{
	path:'page/Health_insurance_policy_file/Health_insurance_policy_file/Health_insurance_policy_file_add', //医保政策页面下的添加
    component:HealthInsurancePolicyFileAddComponent
},
{
	path:'page/Health-management-rules/Health_management_add_rules/Health_management_rules_list/Health_management_rules_list', //医保规则下的添加规则下面的那个下一步展示的列表
	component:HealthManagementRulesListComponent
},
{
	path:'page/Health_insurance_policy_file/Health_insurance_policy_file/Health_insurance_policy_file_modification',   //医保政策页面下的修改
	component:HealthInsurancePolicyFileModificationComponent
},{
	path:'page/Health_insurance_policy_file/Health_insurance_policy_file/Health_insurance_policy_file_modification/:id',   //医保政策页面下的修改
	component:HealthInsurancePolicyFileModificationComponent
},
//险种目录
{
	path:'Types_of_insurance_catalog', //险种目录页面
	component:TypesOfInsuranceCatalogComponent
},
{ 
	path:'page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_addInsurance',//险种目录版本下面的添加
	component:TypesOfInsuranceCatalogAddInsuranceComponent
},
{
	path:'page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_addInsurance/:id',//险种目录版本下面的添加
	component:TypesOfInsuranceCatalogAddInsuranceComponent
},{
	path:'page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_changeInsurance',//险种目录版本下面的修改
	component:TypesOfInsuranceCatalogChangeInsuranceComponent
},{
	path:'page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_changeInsurance/:id',//险种目录版本下面的修改
	component:TypesOfInsuranceCatalogChangeInsuranceComponent
},{
	path:'page/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog/Types_of_insurance_catalog_lookInsurance/:id',//险种目录版本下面的查看
	component:TypesOfInsuranceCatalogLookInsuranceComponent
},{
	path:'page/Types_of_insurance_catalog/Types_of_insurance_catalog/add_apply_classify/add_apply_classify',//险种里面那个报销分类添加页面
	component:AddApplyClassifyComponent
},{
	path:'page/Types_of_insurance_catalog/Types_of_insurance_catalog/add_common_insurance/personCategory',//险种里面那个投保人员类别添加页面
	component:PersonCategoryComponent
},
//版本管理页面
{
	path:'page/all_version_management/Drug_version_management/:id',//药品中的版本管理
	component:DrugVersionManagementComponent
},{
	path:'page/all_version_management/Drug_version_management',//药品中的版本管理
	component:DrugVersionManagementComponent
},{
	path:'page/all_version_management/Sickness_version_management/:id',//疾病中的版本管理
	component:SicknessVersionManagementComponent
},{
	path:'page/all_version_management/Sickness_version_management',//疾病中的版本管理
	component:SicknessVersionManagementComponent
}

,{
	path:'page/all_version_management/Project_version_management/:id',//项目中的版本管理
	component:ProgectVersionManagementComponent    
	
	
	
}
,{
	path:'page/all_version_management/Project_version_management',//项目中的版本管理
	component:ProgectVersionManagementComponent
},{
	path:'page/all_version_management/Material_version_management/:id',//材料中的版本管理
	component:MaterialVersionManagementComponent
}
,{
	path:'page/all_version_management/Material_version_management',//材料中的版本管理
	component:MaterialVersionManagementComponent
},
//机构基本信息
{
	path:'Basic_information_organization',
	component:BasicInformationOrganizationComponent
},



//医保项目目录
{
	path:'page/MedicareCatalog/project/Project-component',//项目目录
	component:ProjectComponentApp
},
{
	path:'page/MedicareCatalog/material/Material-component',//材料目录
	component:MaterialComponentApp
}


];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }