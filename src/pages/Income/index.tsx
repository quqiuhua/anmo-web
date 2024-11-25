import { queryMasterAccountPageList } from '@/services/yxdaojia/ProjectController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRequest, useRouteData } from '@umijs/max';
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

  const queryList = useRequest(queryMasterAccountPageList, {
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

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '用户昵称',
      dataIndex: 'nickName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      hideInSearch: true,
    },
    {
      title: '待入账',
      dataIndex: 'waitAmount',
      hideInSearch: true,
    },
    {
      title: '可提现',
      dataIndex: 'allowOutAmount',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowKey="id"
        request={onRequest}
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
        headerTitle="技师收入列表"
      />
    </PageContainer>
  );
};
