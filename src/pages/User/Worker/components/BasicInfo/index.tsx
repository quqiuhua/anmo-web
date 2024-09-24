import {
  ModalForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Form, message, Space } from 'antd';
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

const MassagerInfo: React.FC<Props> = ({ children }) => {
  const [form] = Form.useForm<FormValues>();

  return (
    <ModalForm<FormValues>
      title="技师信息"
      trigger={children}
      form={form}
      width={580}
      layout="horizontal"
      className={styles['modal-form']}
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
      <ProFormGroup title="个人信息">
        <Space>
          <ProFormText
            width="sm"
            name="name"
            label="姓名"
            placeholder="请输入姓名"
          />
          <ProFormText
            width="sm"
            name="nickName"
            label="昵称"
            placeholder="请输入昵称"
          />
        </Space>
        <Space>
          <ProFormRadio.Group
            width="md"
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ]}
            name="sex"
            label="性别"
          />
        </Space>
        <Space>
          <ProFormText
            width="sm"
            name="ID"
            label="身份证号"
            placeholder="请输入身份证号"
          />
          <ProFormText
            width="sm"
            name="merchantName"
            label="商家名称"
            placeholder="请输入商家名称"
          />
        </Space>
        <Space>
          <ProFormCascader
            width="sm"
            name="region"
            label="所在地区"
            placeholder="请输入所在地区"
          />
          <ProFormText
            width="sm"
            name="address"
            label="地址"
            placeholder="请输入地址"
          />
        </Space>
        <Space>
          <ProFormSelect
            width="sm"
            options={[
              { label: '选项1', value: '01' },
              { label: '选项2', value: '02' },
              { label: '选项3', value: '03' },
            ]}
            name="serviceProject"
            label="可服务项目"
          />
        </Space>
        <ProFormDatePicker width="sm" name="date" label="健康证到期日" />
        <ProFormUploadButton
          width="md"
          label="生活照"
          name="lifeImg"
          title="点击上传"
          rules={[{ required: true, message: '请上传生活照' }]}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
      </ProFormGroup>
      <ProFormGroup title="证件信息">
        <ProFormUploadButton
          width="md"
          label="营业执照"
          title="点击上传"
          name="businessLicense"
          rules={[{ required: true, message: '请上传营业执照' }]}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
        <ProFormUploadButton
          width="md"
          label="身份证照片"
          name="businessLicense"
          title="点击上传"
          rules={[{ required: true, message: '请上传营业身份证照片' }]}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
        <ProFormUploadButton
          width="md"
          label="健康证照片"
          title="点击上传"
          name="healthLicense"
          rules={[{ required: true, message: '请上传健康证' }]}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
        <ProFormUploadButton
          width="md"
          label="从业资格证"
          title="点击上传"
          name="qualificationLicense"
          rules={[{ required: true, message: '请上传从业资格证照片' }]}
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
        <ProFormUploadButton
          width="md"
          title="点击上传"
          label="其他证件照片"
          name="otherLicense"
          action="upload.do"
          onChange={() => {}}
          listType="picture-card"
        />
      </ProFormGroup>
    </ModalForm>
  );
};

export default MassagerInfo;
