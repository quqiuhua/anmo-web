// 运行时配置
import { type RequestConfig, history } from '@umijs/max';
import { message } from 'antd';

export const requestConfig: RequestConfig = {
  timeout: 1000,
  // NOTE: 错误处理
  errorConfig: {
    // 错误抛出
    errorThrower: (res: any) => {
      throw res;
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      const { response } = error;
      console.log(response, opts);

      if (!!response && response.status === 400) {
        const data = response.clone().json();
        message.error(data.error.message);
        history.push('/404');
        return;
      }

      if (!!response && response.status === 500) {
        const data = response.clone().json();
        message.error(data.error.message);
        return;
      }

      if (!!response && (response.status === 404 || response.status === 403)) {
        message.error('请求地址错误或您没有权限访问该资源。');
        history.push('/403');
        return;
      }

      if (!!response && response.status === 401) {
        message.error('登录失效，即将跳转至登录页面');
        return;
      }
    },
  },

  // NOTE: 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 拦截请求配置，进行个性化处理。
      const url = config.url.concat('?token = 123');
      return { ...config, url };
    },
  ],

  // NOTE: 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response;
      if (!data.success) {
        message.error('接口错误');
      }
      return response;
    },
  ],
};
