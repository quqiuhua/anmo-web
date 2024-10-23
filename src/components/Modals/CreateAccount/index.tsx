import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form, message } from 'antd';
import React, { type ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

interface FormValues {
  userName: string;
  phone: string;
}

const RewardRuleModal: React.FC<Props> = ({ children }) => {
  const { createUser, queryUserList } = useModel('account');
  const [form] = Form.useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    const res = await createUser.run(values);
    if (res) {
      message.success('新建成功');
      queryUserList.refresh();
      return true;
    }
  };
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
      }}
      submitter={{
        submitButtonProps: {
          loading: createUser.loading,
        },
      }}
      onFinish={onSubmit}
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
    </ModalForm>
  );
};

export default RewardRuleModal;
