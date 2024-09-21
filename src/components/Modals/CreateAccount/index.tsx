import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { type ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

interface FormValues {
  userName: string;
  phone: string;
  password: string;
}

const RewardRuleModal: React.FC<Props> = ({ children }) => {
  const [form] = Form.useForm<FormValues>();
  return (
    <ModalForm<FormValues>
      title="新增用户"
      trigger={children}
      form={form}
      labelCol={{ span: 6 }}
      width={390}
      layout="horizontal"
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitter={{
        submitButtonProps: {
          loading: true,
        },
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText
        width="sm"
        name="userName"
        label="用户名"
        placeholder="请输入用户名"
      />

      <ProFormText
        width="sm"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
      />
      <ProFormText.Password
        width="sm"
        name="password"
        label="密码"
        placeholder="请输入密码"
      />
    </ModalForm>
  );
};

export default RewardRuleModal;
