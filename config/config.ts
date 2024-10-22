import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  reactQuery: {},
  layout: {},
  proxy: {
    '/tech': {
      target: 'https://centertest.yxdaojia.cn',
      changeOrigin: true,
    },
    '/user-center': {
      target: 'https://centertest.yxdaojia.cn',
      changeOrigin: true,
    },
  },
  routes,
  npmClient: 'pnpm',
  // @umijs/max 内置了 styled-components 样式方案。
  // https://umijs.org/docs/max/styled-components
  styledComponents: {},
  // 路由配置
  // 多语言配置 https://umijs.org/docs/max/i18n
  locale: false,
  lessLoader: {
    modifyVars: {
      'root-entry-name': 'default',
    },
  },
  esbuildMinifyIIFE: true, // 开启 esbuild 压缩
});
