import { getUploadDomain } from '@/common/env';
import { LIMIT_TYPES, PROJECT_LABEL, TARGET_USER } from '@/constants/index';
import {
  PageContainer,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import {
  history,
  Link,
  useModel,
  useParams,
  useSearchParams,
} from '@umijs/max';
import { Card, Form, message } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';

const ProjectInfo: React.FC = () => {
  const [form] = Form.useForm();
  const { mode } = useParams();
  const { addProject, queryDetail, editProject } = useModel('project');
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const uploadDomain = getUploadDomain();
  const isDetailPage = mode === 'detail';
  const isEditPage = mode === 'edit';
  const isAddPage = mode === 'add';
  document.title = isAddPage ? '新建项目' : '编辑项目';

  const getParams = (values: Record<string, any>) => {
    return {
      ...values,
      projectId,
      detailUrl:
        values.detailUrl[0]?.response?.data.file || values.detailUrl[0]?.url,
      headUrls: values.headUrls.map(
        (item: any) => item?.url || item?.response?.data.file,
      ),
    };
  };

  const onSubmit = async (values: any) => {
    const params = getParams(values);
    if (isAddPage) {
      const res = await addProject.run(params);
      if (res) {
        message.success('新建成功');
        history.go(-1);
      }
    } else {
      const res = await editProject.run(params);
      if (res) {
        message.success('修改成功');
        history.go(-1);
      }
    }
  };

  const initFormData = async () => {
    if (projectId) {
      const res = await queryDetail.run({ projectId });
      if (res) {
        form.setFieldsValue({
          name: res.name,
          limitSex: res.limitSex,
          labelList: res.labelList,
          price: res.price,
          time: res.time,
          sort: res.sort,
          suitCrowd: res.suitCrowd,
          headUrls: res.headUrls.map((item) => ({ url: item, status: 'done' })),
          detailUrl: res.detailUrl
            ? [{ url: res.detailUrl, status: 'done' }]
            : [],
        });
      }
    }
  };

  useEffect(() => {
    initFormData();
  }, [projectId]);

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
        disabled={isDetailPage}
        submitter={{
          searchConfig: {
            resetText: '取消',
            submitText: '提交',
          },
          submitButtonProps: {
            loading: addProject.loading || editProject.loading,
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
        name="project-form"
        onFinish={onSubmit}
      >
        <Card title="基本信息" style={{ marginBottom: 24 }}>
          <ProForm.Group>
            <ProFormText
              width="sm"
              name="name"
              label="项目名称"
              rules={[{ required: true, message: '请输入项目名称' }]}
              placeholder="请输入项目名称"
            />
            <ProFormText
              width="sm"
              name="price"
              label="项目标价"
              rules={[{ required: true, message: '请输入项目标价' }]}
              placeholder="请输入项目标价"
            />
            <ProFormDigit
              width="sm"
              name="time"
              label="项目服务时间"
              addonAfter="分钟"
              rules={[{ required: true, message: '请输入项目服务时间' }]}
              placeholder="请输入项目服务时间"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormDigit
              name="sort"
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
              name="headUrls"
              rules={[{ required: true, message: '请上传头图' }]}
              action={`${uploadDomain}/upload/1/upload`}
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
              name="limitSex"
              options={LIMIT_TYPES}
              rules={[{ required: true, message: '请选择性别限制' }]}
              label="性别限制"
              placeholder="请选择"
            />
            <ProFormSelect
              width="sm"
              options={TARGET_USER}
              rules={[{ required: true, message: '请选择适用人群' }]}
              name="suitCrowd"
              label="适用人群"
              placeholder="请选择"
            />
            <ProFormSelect
              width="sm"
              name="labelList"
              label="项目标签"
              options={PROJECT_LABEL}
              mode="multiple"
              placeholder="请选择"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormUploadButton
              width="lg"
              label="项目详情图"
              action={`${uploadDomain}/upload/1/upload`}
              rules={[{ required: true, message: '请上传项目详情页图片' }]}
              name="detailUrl"
              listType="picture-card"
              max={1}
            />
          </ProForm.Group>
        </Card>
      </ProForm>
    </PageContainer>
  );
};

export default ProjectInfo;
