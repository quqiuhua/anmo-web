import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRouteData } from '@umijs/max';
import { Popconfirm } from 'antd';
import { useRef } from 'react';

type GithubIssueItem = {
  userId: string;
  name: string;
  status: string;
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

  const handlePass = () => {};

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      hideInSearch: true,
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
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
      dataIndex: 'auditStatus',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: () => [
        <Popconfirm
          key="reslove"
          title="通过项目审核"
          description="您确定要通过此条项目申请吗?"
          onConfirm={handlePass}
          okText="确定"
          cancelText="取消"
        >
          <a key="editable">通过</a>
        </Popconfirm>,
        <Popconfirm
          key="reject"
          title="拒绝项目审核"
          description="您确定要拒绝此条项目申请吗?"
          onConfirm={handlePass}
          okText="确定"
          cancelText="取消"
        >
          <a key="audit">拒绝</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
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
