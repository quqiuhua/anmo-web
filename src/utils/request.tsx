// 运行时配置
import { type RequestConfig, history } from '@umijs/max';
import { message } from 'antd';

export const requestConfig: RequestConfig = {
  timeout: 30000,
  withCredentials: true,
  errorConfig: {
    // 错误抛出
    errorThrower: (res: any) => {
      throw res;
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      const { response = {} } = error;
      console.log('data,', response, opts);

      if (!!response && response.status === 400) {
        const data = response.data;
        message.error(data.message || '接口异常～');
        history.push('/404');
        return;
      }

      if (!!response && response.status === 500) {
        const data = response.data;
        message.error(data.message || '接口异常~');
        return;
      }

      if (!!response && (response.status === 404 || response.status === 403)) {
        message.error('请求地址错误或您没有权限访问该资源。');
        history.push('/403');
        return;
      }

      if (response?.data?.authFilterErrorCode === '20003') {
        message.error('登录失效, 请重新登录~');
        history.push('/login');
        return;
      }
    },
  },

  // NOTE: 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 拦截请求配置，进行个性化处理。
      return config;
    },
  ],

  // NOTE: 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response;
      const { success, message: msg } = data;
      if (!success && !data?.data) {
        message.error(msg || '接口异常～');
      }
      return response;
    },
  ],
};
