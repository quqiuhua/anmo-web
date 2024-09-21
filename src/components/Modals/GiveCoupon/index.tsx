import { ModalForm, ProFormDigit } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { type ReactElement } from 'react';

interface Props {
  children: ReactElement;
  userId: string;
}

interface FormValues {
  amount: string;
}

const RewardRuleModal: React.FC<Props> = ({ children, userId }) => {
  const [form] = Form.useForm<FormValues>();
  return (
    <ModalForm<FormValues>
      title="发放优惠券(无门槛)"
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
        console.log({ ...values, userId });
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormDigit width="md" name="amount" placeholder="请输入发放金额" />
    </ModalForm>
  );
};

export default RewardRuleModal;
