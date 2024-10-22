import GiveCoupon from '@/components/Modals/GiveCoupon';
import { WORKER_AND_CUSTOMER_STATUS } from '@/constants/index';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Avatar, Switch } from 'antd';
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
  url: string;
  userId: string;
  name: string;
  title: string;
  status: string;
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => {
  const actionRef = useRef<ActionType>();

  const onOfferDiscountCard = () => {};

  const gotoOrder = (record: GithubIssueItem) => {
    history.push({
      pathname: `/order?userId=${record.userId}`,
    });
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '用户昵称',
      dataIndex: 'name',
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
      title: '手机号',
      dataIndex: 'phoneNumber',
    },
    {
      title: '注册时间',
      key: 'registerTime',
      dataIndex: 'registerTime',
      valueType: 'dateRange',
    },
    {
      title: '消费金额',
      dataIndex: 'consumption',
      hideInSearch: true,
    },
    {
      title: '账户状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: WORKER_AND_CUSTOMER_STATUS,
      },
      render: () => {
        return <Switch checked={true} />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <GiveCoupon key="give-coupon" userId={record.userId}>
          <a key="editable" onClick={onOfferDiscountCard}>
            发放优惠券
          </a>
        </GiveCoupon>,
        <a
          onClick={() => gotoOrder(record)}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          查询订单
        </a>,
      ],
    },
  ];

  return (
    <PageContainer title="用户查询">
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          return {
            data: [{ name: 'xxx' }],
          };
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
        headerTitle="普通用户列表"
      />
    </PageContainer>
  );
};
