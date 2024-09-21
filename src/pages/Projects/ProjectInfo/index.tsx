import { LIMIT_TYPES } from '@/constants/index';
import {
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { history, Link, useParams } from '@umijs/max';
import { Card, Form } from 'antd';
import React from 'react';
import styles from './index.less';

const ProjectInfo: React.FC = () => {
  const [form] = Form.useForm();
  const { mode } = useParams();
  const isDetailPage = mode === 'detail';
  const isEditPage = mode === 'edit';
  const isAddPage = mode === 'add';
  console.log('mode', mode);

  const onSubmit = async (values: any) => {
    console.log('formValues>>>>>', values);
  };

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {
          items: [
            {
              path: '/projects',
              title: <Link to="/projects">项目管理</Link>,
            },
            isAddPage && {
              title: '新建项目',
            },
            isEditPage && {
              title: '编辑项目',
            },
            isDetailPage && {
              title: '项目详情',
            },
          ].filter(Boolean),
        },
      }}
    >
      <ProForm
        // @ts-ignore
        labelWidth="auto"
        form={form}
        submitter={{
          searchConfig: {
            resetText: '取消',
            submitText: '提交',
          },
          resetButtonProps: {
            title: '取消',
            onClick: () => history.go(-1),
          },
          render: (props, dom) => {
            return <div className={styles.footer}>{dom}</div>;
          },
        }}
        layout="horizontal"
        name="propagandize-form"
        onFinish={onSubmit}
      >
        <Card title="基本信息" style={{ marginBottom: 24 }}>
          <ProForm.Group>
            <ProFormText
              width="sm"
              name="projectName"
              label="项目名称"
              rules={[{ required: true, message: '请输入项目名称' }]}
              placeholder="请输入项目名称"
            />
            <ProFormText
              width="sm"
              name="projectPrice"
              label="项目标价"
              rules={[{ required: true, message: '请输入项目标价' }]}
              placeholder="请输入项目标价"
            />
            <ProFormDigit
              width="sm"
              name="serviceTime"
              label="项目服务时间"
              addonAfter="分钟"
              rules={[{ required: true, message: '请输入项目服务时间' }]}
              placeholder="请输入项目服务时间"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormDigit
              name="zIndex"
              width="sm"
              label="展示权重"
              rules={[{ required: true, message: '请输入展示权重' }]}
              placeholder="请输入"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormUploadButton
              width="lg"
              label="头图"
              name="logo"
              rules={[{ required: true, message: '请上传头图' }]}
              action="upload.do"
              onChange={() => {}}
              listType="picture-card"
              max={3}
              extra="建议尺寸375*246，最多上传3张"
            />
          </ProForm.Group>
        </Card>

        <Card title="宣传信息">
          <ProForm.Group>
            <ProFormSelect
              width="sm"
              name="sexLimit"
              options={LIMIT_TYPES}
              rules={[{ required: true, message: '请选择性别限制' }]}
              label="性别限制"
              placeholder="请选择"
            />
            <ProFormSelect
              width="sm"
              options={LIMIT_TYPES}
              rules={[{ required: true, message: '请选择适用人群' }]}
              name="targetUser"
              label="适用人群"
              placeholder="请选择"
            />
            <ProFormSelect
              width="sm"
              name="projectTags"
              label="项目标签"
              options={LIMIT_TYPES}
              rules={[{ required: true, message: '请选择项目标签' }]}
              placeholder="请选择"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormUploadButton
              width="lg"
              label="项目详情图"
              rules={[{ required: true, message: '请上传项目详情页图片' }]}
              name="detailImg"
              action="upload.do"
              onChange={() => {}}
              listType="picture-card"
              max={1}
              extra="建议宽度375"
            />
          </ProForm.Group>
        </Card>
      </ProForm>
    </PageContainer>
  );
};

export default ProjectInfo;
