// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
import CustomLayoutProps from '@/layouts/custom';
import { RequestConfig } from '@umijs/max';
import { requestConfig } from './utils/request';

// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '秋华测试' };
}

// NOTE: Layout 运行时配置
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const layout = () => {
  const layoutProps = CustomLayoutProps();
  return layoutProps;
};

export const request: RequestConfig = requestConfig;
