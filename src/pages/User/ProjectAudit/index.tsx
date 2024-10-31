import { WORKER_PROJECT_AUDIT_STATUS } from '@/constants/index';
import {
  auditProject,
  queryMasterProjectPageList,
} from '@/services/yxdaojia/ProjectController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRequest, useRouteData } from '@umijs/max';
import { Badge, message, Popconfirm } from 'antd';
import { useRef } from 'react';

type GithubIssueItem = {
  projectId: string;
  masterId: string;
  status: number;
  state: string;
  phoneNumber: number;
  registerTime: number;
  comments: Record<string, any>[];
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => {
  const { route } = useRouteData();
  document.title = route.name;
  const actionRef = useRef<ActionType>();

  const queryList = useRequest(queryMasterProjectPageList, {
    manual: true,
  });

  const audit = useRequest(auditProject, {
    manual: true,
  });

  const onRequest = async ({ current, ...rest }: Record<string, any>) => {
    const res = (await queryList.run({ ...rest, pageNum: current })) || {};
    return {
      data: res.list || {},
      total: res.total,
      success: true,
    };
  };

  const handlePass = async ({ masterId, projectId }) => {
    const res = await audit.run({
      masterId,
      projectId,
      auditStatus: 4,
    });
    if (res) {
      message.success('操作成功');
      queryList.refresh();
    }
  };

  const handleReject = async ({ masterId, projectId }) => {
    const res = await audit.run({
      masterId,
      projectId,
      auditStatus: 3,
    });
    if (res) {
      message.success('操作成功');
      queryList.refresh();
    }
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '用户昵称',
      dataIndex: 'masterNickName',
      hideInSearch: true,
    },
    {
      title: '真实姓名',
      dataIndex: 'masterName',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '申请项目',
      dataIndex: 'projectName',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: WORKER_PROJECT_AUDIT_STATUS,
      },
      render: (_, { status }) => {
        const statusMap = {
          2: 'processing',
          3: 'error',
          4: 'success',
        };
        const text = WORKER_PROJECT_AUDIT_STATUS.find(
          (item) => item.value === status,
        )?.label;
        return <Badge status={statusMap[status]} text={text} />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, { masterId, projectId, status }) => {
        const show = status === 2;
        return (
          show && [
            <Popconfirm
              key="reslove"
              title="通过项目审核"
              description="您确定要通过此条项目申请吗?"
              onConfirm={() => handlePass({ masterId, projectId })}
              okText="确定"
              cancelText="取消"
            >
              <a key="editable">通过</a>
            </Popconfirm>,
            <Popconfirm
              key="reject"
              title="拒绝项目审核"
              description="您确定要拒绝此条项目申请吗?"
              onConfirm={() => handleReject({ masterId, projectId })}
              okText="确定"
              cancelText="取消"
            >
              <a key="audit">拒绝</a>
            </Popconfirm>,
          ]
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={onRequest}
        cardBordered
        rowKey="id"
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          defaultCollapsed: false,
        }}
        options={false}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="项目审核列表"
      />
    </PageContainer>
  );
};
