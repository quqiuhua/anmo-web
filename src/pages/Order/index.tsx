import StarIcon from '@/components/StarIcon';
import { ORDER_STATUS, USER_RATING_ENMS } from '@/constants/index';
import { queryOrderPageList } from '@/services/yxdaojia/ProjectController';
import { urlParamsToObj } from '@/utils/common';
import useUrlState from '@ahooksjs/use-url-state';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
  type ProFormInstance,
} from '@ant-design/pro-components';
import { useLocation, useRequest, useRouteData } from '@umijs/max';
import { useRef } from 'react';
import Comments from './components/Comments';
import EditOrder from './components/EditOrder';
import styles from './index.less';

type GithubIssueItem = {
  orderId: string;
  masterNickName: string;
  customerNickName: string;
  orderStatus: number;
  state: string;
  phoneNumber: number;
  registerTime: number;
  comments: Record<string, any>[];
  createTime: string;
  orderStatusStr: string;
  score?: number;
};

export default () => {
  const { route } = useRouteData();
  document.title = route.name;
  const location = useLocation();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const query = urlParamsToObj(location.search);
  const [urlState, setUrlState] = useUrlState(query);

  const queryList = useRequest(queryOrderPageList, {
    manual: true,
  });

  const onReset = () => {
    formRef.current?.setFieldsValue({ customer: '' });
    formRef.current?.resetFields();
    setUrlState({
      nickName: '',
      customerId: '',
    });
    formRef.current?.submit();
  };

  const onRequest = async ({ current, ...rest }: Record<string, any>) => {
    const res =
      (await queryList.run({
        ...rest,
        pageNum: current,
        customerId: urlState.customerId,
      })) || {};
    return {
      data: res.list || {},
      total: res.total,
      success: true,
    };
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderId',
      fixed: 'left',
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatusList',
      valueType: 'select',
      fieldProps: () => {
        return {
          options: ORDER_STATUS,
          multiple: true,
          mode: 'multiple',
        };
      },
      render: (_, record) => {
        return record.orderStatusStr;
      },
    },
    {
      title: '技师昵称',
      dataIndex: 'master',
      fieldProps: {
        placeholder: '请输入昵称或手机号',
      },
      render: (_, { masterNickName }) => {
        return masterNickName;
      },
    },
    {
      title: '技师手机号',
      dataIndex: 'masterPhone',
      hideInSearch: true,
    },
    {
      title: '服务时间',
      key: 'useTime',
      dataIndex: 'useTime',
      hideInSearch: true,
    },
    {
      title: '客户昵称',
      dataIndex: 'customer',
      initialValue: urlState.nickName,
      fieldProps: {
        placeholder: '请输入昵称或手机号',
      },
      render: (_, { customerNickName }) => {
        return customerNickName;
      },
    },
    {
      title: '客户手机号',
      dataIndex: 'customerPhone',
      hideInSearch: true,
    },
    {
      title: '下单时间',
      key: 'createTime',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      search: {
        transform: (value) => {
          return {
            createTimeStart: value[0],
            createTimeEnd: value[1],
          };
        },
      },
      render: (_, record) => {
        return record.createTime;
      },
    },
    {
      title: '用户评分',
      dataIndex: 'score',
      valueType: 'select',
      hideInTable: true,
      fieldProps: () => {
        return {
          options: USER_RATING_ENMS,
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
      dataIndex: 'totalAmount',
      hideInSearch: true,
    },
    {
      title: '用户评价',
      dataIndex: 'userComments',
      hideInSearch: true,
      render: (_, record) => {
        const show = record.orderStatus === 7;
        return show ? (
          <>
            <span className={styles.score}>{record.score}</span>
            <StarIcon />
            <Comments orderId={record.orderId}>
              <a className={styles.view}>查看</a>
            </Comments>
          </>
        ) : (
          '--'
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      render: (text, record) => [
        <EditOrder key="edit" orderId={record.orderId}>
          <a>订单详情</a>
        </EditOrder>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={onRequest}
        formRef={formRef}
        rowKey="orderId"
        onReset={onReset}
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          defaultCollapsed: false,
        }}
        scroll={{
          x: 1600,
        }}
        options={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="订单列表"
      />
    </PageContainer>
  );
};
