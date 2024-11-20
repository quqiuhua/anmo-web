import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form, message } from 'antd';
import React, { type ReactElement } from 'react';

interface Props {
  children: ReactElement;
  masterId: number;
  projectId: number;
  onRefresh: () => void;
}

interface FormValues {
  refuseReason: string;
}

const RejectModal: React.FC<Props> = ({
  children,
  masterId,
  projectId,
  onRefresh,
}) => {
  const { audit } = useModel('project');
  const [form] = Form.useForm<FormValues>();

  const onSubmit = async (values: Record<string, any>) => {
    const res = await audit.run({
      ...values,
      masterId,
      projectId,
      auditStatus: 3,
    });
    if (res) {
      message.success('提交成功');
      onRefresh();
      return true;
    }
  };
  return (
    <ModalForm<FormValues>
      title="技师项目审核"
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
          loading: audit.loading,
        },
      }}
      submitTimeout={2000}
      onFinish={onSubmit}
    >
      <ProFormTextArea
        width="md"
        rules={[{ required: true, message: '请输入驳回原因' }]}
        name="refuseReason"
        label="驳回原因"
        placeholder="请输入驳回原因"
      />
    </ModalForm>
  );
};

export default RejectModal;
