import Visible from '@/components/Visible';
import { jsonParse, jsonStringfy } from '@/utils/jsonMethod';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel, useRouteData } from '@umijs/max';
import { Button, Card, Form, message } from 'antd';
import CryptoJs from 'crypto-js';
import React, { useEffect } from 'react';
import styles from './index.less';

const Login: React.FC = () => {
  const { route } = useRouteData();
  document.title = route.name;
  const [form] = Form.useForm();
  const phone = Form.useWatch('phone', form);
  console.log('route>>>>>', route);
  const { getVerifyCode, loginApi, state, setState } = useModel('login');
  const showNormalLoginContent = state.mode === 'login';
  const showForgetContent = state.mode === 'forget-password';
  const showResetContent = state.mode === 'reset-password';
  const titleMap = {
    login: '账号登录',
    'forget-password': '忘记密码',
    'reset-password': '重置密码',
  };

  // const onChangeMode = () => {
  //   setState({
  //     mode: 'forget-password',
  //   });
  // };

  useEffect(() => {
    const userInfoStr = localStorage.getItem('userInfo') || '';
    const userInfo = jsonParse(userInfoStr, {});
    if (userInfo.phone) {
      form.setFieldsValue({
        phone: userInfo.phone,
        password: userInfo.password,
        rememberUserInfo: true,
      });
    }
  }, []);

  const onBack = () => {
    setState({
      mode: 'login',
    });
  };

  const onGetCaptcha = async () => {
    if (!!phone) {
      const res = await getVerifyCode.run({
        phone,
      });
      if (res) {
        message.success('获取验证码成功！');
      }
    } else {
      message.warning('请先输入手机号');
      return Promise.reject();
    }
  };

  const onSubmit = async (values: Record<string, any>) => {
    const password = CryptoJs.MD5(values.password).toString();
    if (values.rememberUserInfo) {
      const userInfo: string = jsonStringfy({
        phone,
        password: values.password,
      });
      localStorage.setItem('userInfo', userInfo);
    }
    const params = {
      phone: values.phone,
      password,
      verifyCode: values.verifyCode,
    };
    const res = await loginApi.run(params);
    if (res.success) {
      message.success('登录成功！');
      history.replace('/user/normal');
    }
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
            form={form}
            className={styles['pro-form']}
            onFinish={onSubmit}
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
            {/* 普通登录 手机号密码 + 验证码  */}
            <Visible visible={showNormalLoginContent}>
              <ProFormText
                name="phone"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder="请输入手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号!',
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
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                dependencies={['phone']}
                placeholder={'请输入验证码'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'获取验证码'}`;
                  }
                  return '获取验证码';
                }}
                name="verifyCode"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                  {
                    max: 4,
                    message: '请输入4位数字验证码！',
                  },
                ]}
                onGetCaptcha={onGetCaptcha}
              />
              <div
                style={{
                  marginBlockEnd: 24,
                }}
              >
                <ProFormCheckbox noStyle name="rememberUserInfo">
                  <span className={styles.remember}>记住账户和密码</span>
                </ProFormCheckbox>
                {/* <a
                  style={{
                    float: 'right',
                  }}
                  onClick={onChangeMode}
                >
                  忘记密码
                </a> */}
              </div>
            </Visible>

            {/* 忘记密码 */}
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

            {/* 忘记密码-重置密码 */}
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
