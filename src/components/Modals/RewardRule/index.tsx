import { ModalForm, ProFormDigit } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import React, { type ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

interface FormValues {
  finishedCount: number;
  rewardAmount: number;
  limitDay: number;
}

const RewardRuleModal: React.FC<Props> = ({ children }) => {
  const [form] = Form.useForm<FormValues>();

  return (
    <ModalForm<FormValues>
      title="奖励机制配置"
      trigger={children}
      form={form}
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
      <ProFormDigit
        width="sm"
        name="finishedCount"
        label="完单次数"
        placeholder="请输入完单次数"
      />

      <ProFormDigit
        width="sm"
        name="rewardAmount"
        label="奖励金额"
        placeholder="请输入奖励金额"
      />
      <ProFormDigit
        width="sm"
        name="limitDay"
        label="限制天数"
        addonAfter="天"
        placeholder="请输入限制天数"
      />
    </ModalForm>
  );
};

export default RewardRuleModal;
