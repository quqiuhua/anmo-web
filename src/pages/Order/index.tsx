import { ORDER_STATUS, USER_RATING_ENMS } from '@/constants/index';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useRouteData } from '@umijs/max';
import { Popconfirm, Rate } from 'antd';
import { useRef } from 'react';
import EditOrder from './components/EditOrder';

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
  const { route } = useRouteData();
  document.title = route.name;
  const actionRef = useRef<ActionType>();

  const cancelOrder = (record: GithubIssueItem) => {
    console.log('record>>>>>', record);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderId',
    },
    {
      title: '技师昵称',
      dataIndex: 'massager',
    },
    {
      title: '技师手机号',
      dataIndex: 'massagerPhone',
      hideInSearch: true,
    },
    {
      title: '下单时间',
      key: 'registerTime',
      dataIndex: 'registerTime',
      valueType: 'dateRange',
    },
    {
      title: '用户昵称',
      dataIndex: 'userName',
    },
    {
      title: '用户评分',
      dataIndex: 'userMark',
      valueType: 'select',
      hideInTable: true,
      fieldProps: () => {
        return {
          options: USER_RATING_ENMS,
        };
      },
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      hideInTable: true,
      fieldProps: () => {
        return {
          options: ORDER_STATUS,
        };
      },
    },
    {
      title: '按摩项目',
      dataIndex: 'projectName',
      hideInSearch: true,
    },
    {
      title: '订单金额',
      dataIndex: 'orderAmount',
      hideInSearch: true,
    },
    {
      title: '用户手机号',
      dataIndex: 'userPhone',
      hideInSearch: true,
    },
    {
      title: '用户评价',
      dataIndex: 'userComments',
      hideInSearch: true,
      render: () => {
        return <Rate defaultValue={4} />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <EditOrder key="edit">
          <a>编辑订单</a>
        </EditOrder>,
        <Popconfirm
          key="reslove"
          title="取消订单"
          description="您确定要取消此订单吗?"
          onConfirm={() => cancelOrder(record)}
          okText="确定"
          okButtonProps={{
            loading: true,
          }}
          cancelText="取消"
        >
          <a target="_blank" rel="noopener noreferrer" key="view">
            取消订单
          </a>
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
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          return {
            data: [{ orderId: 'xxxx' }],
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
        headerTitle="订单列表"
      />
    </PageContainer>
  );
};
