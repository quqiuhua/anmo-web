// 用于配置路由的文件
// https://umijs.org/docs/guides/routes

export default [
  {
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    name: '用户管理',
    path: '/user',
    icon: 'TeamOutlined',
    routes: [
      {
        name: '普通用户',
        path: '/user/normal',
        component: './User/NormalUser',
      },
      {
        name: '技师用户',
        path: '/user/worker',
        component: './User/Worker',
      },
      {
        name: '注册技师审核',
        path: '/user/worker-audit',
        component: './User/WorkerAudit',
      },
      {
        name: '技师项目审核',
        path: '/user/project-audit',
        component: './User/ProjectAudit',
      },
    ],
  },
  {
    name: '拉新奖励',
    path: '/rewards',
    icon: 'MoneyCollectOutlined',
    routes: [
      {
        name: '技师邀请',
        path: '/rewards/worker-invite',
        component: './Rewards/WorkerInvite',
      },
      {
        name: '宣传海报配置',
        path: '/rewards/poster-config',
        component: './Rewards/PosterConfig',
      },
    ],
  },
  {
    name: '订单管理',
    path: '/order',
    icon: 'ContainerOutlined',
    component: './Order',
  },
  {
    name: '项目管理',
    path: '/projects',
    icon: 'ShoppingOutlined',
    component: './Projects/List',
  },
  {
    name: '新建项目',
    path: '/projects/:mode',
    hideInMenu: true,
    component: './Projects/ProjectInfo',
  },
  {
    name: '分成规则',
    path: '/rules',
    icon: 'FileTextOutlined',
    component: './Rules',
  },
  {
    name: '技师收入查看',
    path: '/income',
    icon: 'MoneyCollectOutlined',
    component: './Income',
  },
  {
    name: '系统账户管理',
    path: '/system-account',
    icon: 'UserOutlined',
    component: './Account',
  },
];
