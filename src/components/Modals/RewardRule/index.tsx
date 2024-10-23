import { ModalForm, ProFormDigit } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
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
  const { queryConfig, editRewardConfig } = useModel('invite');

  const onOpenChange = async (open: boolean) => {
    if (open) {
      const res = await queryConfig.run({
        rewardType: 1,
      });
      if (res) {
        form.setFieldsValue(res);
      }
    }
  };

  const onSubmit = async (values: Record<string, any>) => {
    const res = await editRewardConfig.run({
      configId: queryConfig.data?.configId,
      ...values,
    });
    if (res) {
      message.success('修改成功');
    }
    return true;
  };

  return (
    <ModalForm<FormValues>
      title="奖励机制配置"
      trigger={children}
      form={form}
      width={390}
      loading={queryConfig.loading}
      layout="horizontal"
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      onOpenChange={onOpenChange}
      submitter={{
        submitButtonProps: {
          loading: editRewardConfig.loading,
        },
      }}
      submitTimeout={2000}
      onFinish={onSubmit}
    >
      <ProFormDigit
        width="sm"
        name="needFinishTimes"
        label="完单次数"
        placeholder="请输入完单次数"
      />

      <ProFormDigit
        width="sm"
        name="rewardValue"
        label="奖励金额"
        placeholder="请输入奖励金额"
      />
      <ProFormDigit
        width="sm"
        name="limitDays"
        label="限制天数"
        addonAfter="天"
        placeholder="请输入限制天数"
      />
    </ModalForm>
  );
};

export default RewardRuleModal;
