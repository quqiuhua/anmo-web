import GiveCoupon from '@/components/Modals/GiveCoupon';
import { WORKER_AND_CUSTOMER_STATUS } from '@/constants/index';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history, useModel, useRouteData } from '@umijs/max';
import { Avatar, Switch } from 'antd';
import { useRef } from 'react';

export default () => {
  const { route } = useRouteData();
  document.title = route.name;
  const { queryCustomerData } = useModel('customer');
  const actionRef = useRef<ActionType>();

  const onRequest = async ({ current, ...rest }: Record<string, any>) => {
    const res =
      (await queryCustomerData.run({ ...rest, pageNum: current })) || {};
    return {
      data: res.list || {},
      total: res.total,
      success: true,
    };
  };

  const gotoOrder = (record: API.CustomerVO) => {
    history.push({
      pathname: `/order?nickName=${record.nickName}`,
    });
  };

  const columns: ProColumns<API.CustomerVO>[] = [
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      render: (_, { photo, nickName }) => {
        return (
          <>
            <Avatar src={photo} />
            <a style={{ marginLeft: 12 }}>{nickName}</a>
          </>
        );
      },
    },
    {
      disable: true,
      title: '手机号',
      dataIndex: 'phone',
      render: (_, { phone }) => {
        return phone || '未绑定';
      },
    },
    {
      title: '注册时间',
      key: 'regTime',
      dataIndex: 'regTime',
      valueType: 'dateRange',
      render: (_, { regTime }) => regTime,
    },
    {
      title: '消费金额',
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: '账户状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: WORKER_AND_CUSTOMER_STATUS,
      },
      render: (_, { status }) => {
        return (
          <Switch
            checkedChildren="正常"
            unCheckedChildren="冻结"
            checked={status === 1}
          />
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <GiveCoupon key="give-coupon" userId={record.customerId}>
          <a key="editable">发放优惠券</a>
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
      <ProTable<API.CustomerVO>
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
        headerTitle="普通用户列表"
      />
    </PageContainer>
  );
};
