import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { type ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

interface FormValues {
  newPassword: string;
}

const RewardRuleModal: React.FC<Props> = ({ children }) => {
  const [form] = Form.useForm<FormValues>();
  return (
    <ModalForm<FormValues>
      title="修改密码"
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
      <ProFormText.Password
        width="sm"
        name="newPassword"
        label="密码"
        placeholder="请输入密码"
      />
    </ModalForm>
  );
};

export default RewardRuleModal;
