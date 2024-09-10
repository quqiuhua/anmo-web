import Visible from '@/components/Visible';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { useSetState } from 'ahooks';
import { Button, Card, message } from 'antd';
import React from 'react';
import styles from './index.less';

interface State {
  mode: 'login' | 'forget-password' | 'reset-password';
}

const Login: React.FC = () => {
  const [state, setState] = useSetState<State>({
    mode: 'login',
  });
  const showNormalLoginContent = state.mode === 'login';
  const showForgetContent = state.mode === 'forget-password';
  const showResetContent = state.mode === 'reset-password';
  const titleMap = {
    login: '账号登录',
    'forget-password': '忘记密码',
    'reset-password': '重置密码',
  };

  const onChangeMode = () => {
    setState({
      mode: 'forget-password',
    });
  };

  const onBack = () => {
    setState({
      mode: 'login',
    });
  };

  return (
    <Card className={styles.card}>
      <div className={styles.login}>
        <div className={styles.left}>
          <h3 className={styles.title}>有幸到家</h3>
          <div className={styles.img} />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>{titleMap[state.mode]}</h3>
          <ProForm
            className={styles['pro-form']}
            submitter={{
              render: (props) => {
                return showNormalLoginContent
                  ? [
                      <Button
                        className={styles['confirm-btn']}
                        style={{ width: 320 }}
                        key="submit"
                        type="primary"
                        onClick={() => props.form?.submit?.()}
                      >
                        登录
                      </Button>,
                    ]
                  : [
                      <Button
                        className={styles['cancel-btn']}
                        key="cancel"
                        type="default"
                        onClick={onBack}
                      >
                        取消
                      </Button>,
                      <Button
                        className={styles['confirm-btn']}
                        key="submit"
                        type="primary"
                        onClick={() => props.form?.submit?.()}
                      >
                        提交
                      </Button>,
                    ];
              },
            }}
          >
            <Visible visible={showNormalLoginContent}>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
              <ProFormText
                width={185}
                name="identifyCode"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="请输入验证码"
              />
              <div
                style={{
                  marginBlockEnd: 24,
                }}
              >
                <ProFormCheckbox noStyle name="rememberPassword">
                  <span className={styles.remember}>记住密码</span>
                </ProFormCheckbox>
                <ProFormCheckbox noStyle name="rememberUser">
                  <span className={styles.remember}>记住用户</span>
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                  onClick={onChangeMode}
                >
                  忘记密码
                </a>
              </div>
            </Visible>
            <Visible visible={showForgetContent}>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="mobile"
                placeholder="请输入手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '手机号格式错误！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'middle',
                }}
                placeholder="请输入验证码"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
                onGetCaptcha={async () => {
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </Visible>
            <Visible visible={showResetContent}>
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder="请输入新密码"
                rules={[
                  {
                    required: true,
                    message: '请输入新密码！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder="请再次输入新密码"
                rules={[
                  {
                    required: true,
                    message: '请再次输入新密码',
                  },
                ]}
              />
              <ProFormText
                width={185}
                name="identifyCode"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="请输入验证码"
              />
            </Visible>
          </ProForm>
        </div>
      </div>
    </Card>
  );
};

export default Login;
