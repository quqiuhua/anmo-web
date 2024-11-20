import RejectModal from '@/components/Modals/Reject';
import { WORKER_PROJECT_AUDIT_STATUS } from '@/constants/index';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRouteData } from '@umijs/max';
import { Badge, message, Popconfirm } from 'antd';
import { useRef, useState } from 'react';

type GithubIssueItem = {
  projectId: number;
  masterId: number;
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
  const [refreshId, setRefreshId] = useState(1);
  const { queryProjectAuditList, audit } = useModel('project');

  const onRequest = async ({
    current,
    refreshId,
    ...rest
  }: Record<string, any>) => {
    console.log('refreshId>>>>', refreshId);
    const res =
      (await queryProjectAuditList.run({ ...rest, pageNum: current })) || {};
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
      queryProjectAuditList.refresh();
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
      dataIndex: 'masterPhone',
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
        return (
          <Badge
            status={statusMap[status as keyof typeof statusMap]}
            text={text}
          />
        );
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
              <a>通过</a>
            </Popconfirm>,
            <RejectModal
              onRefresh={() => setRefreshId(refreshId + 1)}
              masterId={masterId}
              projectId={projectId}
              key="reject"
            >
              <a>拒绝</a>
            </RejectModal>,
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
        rowKey="projectId"
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          defaultCollapsed: false,
        }}
        options={false}
        params={{
          refreshId,
        }}
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
