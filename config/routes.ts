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
        path: '/user/massager',
        component: './User/Massager',
      },
      {
        name: '注册技师审核',
        path: '/user/massager-audit',
        component: './User/Audit',
      },
    ],
  },
  {
    name: '拉新奖励',
    path: '/rewards',
    icon: 'ContainerOutlined',
    routes: [
      {
        name: '技师邀请',
        path: '/rewards/massager-invite',
        component: './Rewards/MassagerInvite',
      },
      {
        name: '奖励审核',
        path: '/rewards/audit',
        component: './User/NormalUser',
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
    path: '/goods',
    icon: 'ShoppingOutlined',
    component: './Projects',
  },
  {
    name: '分成规则',
    path: '/rules',
    icon: 'FileTextOutlined',
    component: './Rules',
  },
  {
    name: '消息中心',
    path: '/news',
    icon: 'MessageOutlined',
    component: './User/NormalUser',
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
