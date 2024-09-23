import {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
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

const EditOrderModal: React.FC<Props> = ({ children }) => {
  const [form] = Form.useForm<FormValues>();

  return (
    <ModalForm<FormValues>
      title="编辑订单"
      trigger={children}
      form={form}
      width={580}
      layout="vertical"
      labelAlign="left"
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
      <ProFormSelect
        width="lg"
        options={[]}
        name="orderStatus"
        label="订单状态"
        placeholder="请选择订单状态"
      />
      <ProFormSelect
        width="lg"
        options={[]}
        name="belongMassager"
        label="所属技师"
        placeholder="请选择所属技师"
      />
      <ProFormText width="lg" disabled name="orderAmount" label="订单金额" />
      <ProFormText
        width="lg"
        disabled
        name="actualAmount"
        label="技师所得金额"
      />
      <ProFormDatePicker width="lg" name="date" label="到账时间" />
    </ModalForm>
  );
};

export default EditOrderModal;
