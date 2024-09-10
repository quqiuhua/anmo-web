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
        component: './NormalUser',
      },
      {
        name: '技师用户',
        path: '/user/massager',
        component: './NormalUser',
      },
      {
        name: '注册技师审核',
        path: '/user/massager-audit',
        component: './NormalUser',
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
        component: './NormalUser',
      },
      {
        name: '奖励审核',
        path: '/rewards/audit',
        component: './NormalUser',
      },
    ],
  },
  {
    name: '订单管理',
    path: '/order',
    icon: 'ContainerOutlined',
    component: './NormalUser',
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'ShoppingOutlined',
    component: './NormalUser',
  },
  {
    name: '分成规则',
    path: '/rules',
    icon: 'FileTextOutlined',
    component: './NormalUser',
  },
  {
    name: '消息中心',
    path: '/news',
    icon: 'MessageOutlined',
    component: './NormalUser',
  },
  {
    name: '技师收入查看',
    path: '/income',
    icon: 'MoneyCollectOutlined',
    component: './NormalUser',
  },
  {
    name: '系统账户管理',
    path: '/account',
    icon: 'UserOutlined',
    component: './NormalUser',
  },
];
