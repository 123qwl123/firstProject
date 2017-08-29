class SubMenu {
    title:string;
    resource: string
};

export class Menu {
   id:number;
   iconSrc:string;
   iconActionSrc :string;
   title:string;
   resource:string;
   subMenus:SubMenu[];
};

export const menus: Menu[] = [{
        id: 1,
        iconSrc: 'app/images/menu-set.svg',
        iconActionSrc: 'app/images/menu-set-a.svg',
        title: '首页',
        resource:'home',
        subMenus: []
    }, {
        id: 2,
        iconSrc: 'app/images/menu-audit.svg',
        iconActionSrc: 'app/images/menu-audit-a.svg',
        title: '效果分析',
        resource:"",
        subMenus: [
            { title: '干预数据统计', resource: '' },
            { title: '警示信息干预分析', resource: '' }
        ]
    }, {
        id: 3,
        iconSrc: 'app/images/menu-result.svg',
        iconActionSrc: 'app/images/menu-result-a.svg',
        title: '医保目录',
        resource:"",
        subMenus: [
            { title: '医保险种目录', resource: 'Types_of_insurance_catalog' },
            { title: '医保疾病目录', resource: 'page/MedicareCatalog/disease/Disease-component' },
            { title: '医保药品目录', resource: 'page/MedicareCatalog/drugs/Drugs-component' },
            { title: '医保项目目录', resource: 'page/MedicareCatalog/project/Project-component' },
            { title: '医保材料目录', resource: 'page/MedicareCatalog/material/Material-component' },
            { title: '医保药物组目录', resource: 'page/MedicareCatalog/druggroupdirectory/druggroupdirectory-component' }
        ]
    }, {
        id: 4,
        iconSrc: 'app/images/menu-statistics.svg',
        iconActionSrc: 'app/images/menu-statistics-a.svg',
        title: '医保设置',
        resource:"",
        subMenus: [
            { title: '医保政策文件', resource: 'health_insurance_policy_file'},
            { title: '规则分析类型', resource: 'page/healthInsuranceSetting/ruleAnalyze/ruleAnalyzeType-component' },
            { title: '机构基本信息', resource: 'Basic_information_organization' },
            { title: '警示方式设置', resource: 'warning-information' },
            { title: '版本生效设置', resource: 'Version-effect' },
            { title: '计算公式设置', resource: 'formula-preserve' }
        ]
    }, {
        id: 5,
        iconSrc: 'app/images/menu-alert-message.svg',
        iconActionSrc: 'app/images/menu-alert-message-a.svg',
        title: '医保规则',
        resource:"",
        subMenus: [
            { title: '医保规则管理', resource: 'Health-management-rules' },

        ]
    }];