import RewardRuleModal from '@/components/Modals/RewardRule';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Avatar, Button, Popconfirm } from 'antd';
import { useRef } from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

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
  const actionRef = useRef<ActionType>();

  const unBind = (record: GithubIssueItem) => {
    console.log('record>>>>', record);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '技师用户',
      dataIndex: 'name',
      hideInTable: true,
    },
    {
      disable: true,
      title: '技师手机号',
      hideInTable: true,
      dataIndex: 'phoneNumber',
    },
    {
      title: '邀请人',
      dataIndex: 'inviter',
      hideInSearch: true,
      render: () => {
        return (
          <>
            <Avatar />
            <a style={{ marginLeft: 12 }}>测试数据</a>
          </>
        );
      },
    },
    {
      disable: true,
      title: '邀请人手机号',
      hideInSearch: true,
      dataIndex: 'inviterPhone',
    },
    {
      title: '邀请时间',
      key: 'inviteTime',
      dataIndex: 'inviteTime',
      valueType: 'dateRange',
    },
    {
      title: '剩余天数',
      dataIndex: 'remainingDays',
      hideInSearch: true,
    },
    {
      title: '受邀人',
      dataIndex: 'invitee',
      hideInSearch: true,
    },
    {
      title: '受邀人手机号',
      dataIndex: 'inviteePhone',
      hideInSearch: true,
    },
    {
      title: '完单数量',
      dataIndex: 'finishedOrder',
      hideInSearch: true,
    },
    {
      title: '剩余天数结束前流水额',
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <Popconfirm
          key="unbind"
          title="解绑技师"
          description="您确定要解绑吗?"
          onConfirm={() => unBind(record)}
          okText="确定"
          cancelText="取消"
        >
          <a>解绑</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer title="技师邀请">
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          return request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        toolBarRender={() => [
          <RewardRuleModal key="button">
            <Button type="primary">配置奖励机制</Button>
          </RewardRuleModal>,
        ]}
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
      />
    </PageContainer>
  );
};
