// 全局共享数据示例
import { login, sendVerifyCode } from '@/services/yxdaojia/UserController';
import { useRequest } from '@umijs/max';
import { useCookieState, useSetState } from 'ahooks';
import { message } from 'antd';

interface State {
  mode: 'login' | 'forget-password' | 'reset-password';
  isLoggedIn: boolean;
}

const useLogin = () => {
  const [state, setState] = useSetState<State>({
    mode: 'login',
    isLoggedIn: false,
  });

  const [Cookie, setCookie] = useCookieState('COOKIE_AUTH_TICKET');

  // 获取验证码
  const getVerifyCode = useRequest(sendVerifyCode, {
    manual: true,
    formatResult: (res) => {
      return res.data;
    },
  });

  // 登录
  const loginApi = useRequest(login, {
    manual: true,
    formatResult: (res) => {
      if (res.data && res.success) {
        setCookie(res.data);
        setState({
          isLoggedIn: true,
        });
      } else {
        message.error(res.message);
      }
      return res;
    },
  });

  return {
    state,
    setState,
    Cookie,
    setCookie,
    loginApi,
    getVerifyCode,
  };
};

export default useLogin;
