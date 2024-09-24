import { ORDER_STATUS } from '@/constants/index';
import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Form, message, Steps } from 'antd';
import React, { type ReactElement } from 'react';
import styles from './index.less';

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
        options={ORDER_STATUS}
        name="orderStatus"
        label="订单状态"
        placeholder="请选择订单状态"
        disabled
      />
      <ProFormSelect
        width="lg"
        options={[]}
        name="belongMassager"
        label="所属技师"
        placeholder="请选择所属技师"
        disabled
      />
      <span>时间节点</span>
      <Steps
        direction="vertical"
        size="small"
        current={1}
        className={styles.steps}
        items={[
          { title: 'Finished', description: 'xxxx' },
          {
            title: 'In Progress',
            description: 'ssss',
          },
          {
            title: 'Waiting',
            description: 'xxxx',
          },
        ]}
      />
      <ProFormDigit width="lg" name="orderAmount" label="订单金额" />
      <ProFormDigit width="lg" name="actualAmount" label="技师所得金额" />
      <ProFormDatePicker width="lg" name="date" label="到账时间" />
    </ModalForm>
  );
};

export default EditOrderModal;
