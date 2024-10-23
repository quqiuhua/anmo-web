import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form, message } from 'antd';
import React, { type ReactElement } from 'react';

interface Props {
  children: ReactElement;
  id: number;
}

interface FormValues {
  newPassword: string;
}

const RewardRuleModal: React.FC<Props> = ({ children, id }) => {
  const { resetPwd } = useModel('account');
  const [form] = Form.useForm<FormValues>();

  const onSubmit = async (values) => {
    const res = await resetPwd.run({
      ...values,
      userId: id,
    });
    if (res) {
      message.success('提交成功');
      return true;
    }
  };
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
      }}
      submitter={{
        submitButtonProps: {
          loading: resetPwd.loading,
        },
      }}
      submitTimeout={2000}
      onFinish={onSubmit}
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
