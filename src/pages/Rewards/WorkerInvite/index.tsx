import RewardRuleModal from '@/components/Modals/RewardRule';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
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
  inviteDate: number;
  comments: Record<string, any>[];
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => {
  const { queryWorkerInviteList } = useModel('worker');
  const actionRef = useRef<ActionType>();

  const onRequest = async ({
    current,
    ...rest
  }: Record<string, string | number>) => {
    const res =
      (await queryWorkerInviteList.run({ ...rest, pageNum: current })) || {};
    return {
      data: res.list || {},
      total: res.total,
      success: true,
    };
  };

  const unBind = (record: GithubIssueItem) => {
    console.log('record>>>>', record);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '技师昵称',
      dataIndex: 'inviterNickName',
      hideInTable: true,
    },
    {
      disable: true,
      title: '技师手机号',
      hideInTable: true,
      dataIndex: 'inviterPhone',
    },
    {
      title: '邀请人',
      dataIndex: 'inviterNickName',
      hideInSearch: true,
    },
    {
      disable: true,
      title: '邀请人手机号',
      hideInSearch: true,
      dataIndex: 'inviterPhone',
    },
    {
      title: '邀请时间',
      key: 'inviteDate',
      dataIndex: 'inviteDate',
      valueType: 'dateRange',
      search: {
        transform: (value) => {
          return {
            startDate: value[0],
            endDate: value[1],
          };
        },
      },
      render: (_, record) => {
        return record.inviteDate;
      },
    },
    {
      title: '剩余绑定天数',
      dataIndex: 'availableDays',
      hideInSearch: true,
    },
    {
      title: '受邀人',
      dataIndex: 'inviteeNickName',
      hideInSearch: true,
    },
    {
      title: '受邀人手机号',
      dataIndex: 'inviteePhone',
      hideInSearch: true,
    },
    {
      title: '完单数量',
      dataIndex: 'finishTimes',
      hideInSearch: true,
    },
    {
      title: '剩余天数结束前流水额',
      dataIndex: 'inviteeFlowAmount',
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
        request={onRequest}
        toolBarRender={() => [
          <RewardRuleModal key="button">
            <Button type="primary">配置奖励机制</Button>
          </RewardRuleModal>,
        ]}
        rowKey="masterId"
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
