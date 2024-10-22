import { WORKER_AND_CUSTOMER_STATUS } from '@/constants/index';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRouteData } from '@umijs/max';
import { Badge } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import BasicInfo from './components/BasicInfo';
import Comments from './components/Comments';

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
  masterId: string;
  nickName: string;
  status: string;
  state: string;
  masterStatus: 1 | 2;
  phone: number;
  regTime: string;
  repeatFlag: number;
  comments: Record<string, any>[];
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => {
  const { route } = useRouteData();
  document.title = route.name;
  const { queryWorkerData } = useModel('worker');
  const actionRef = useRef<ActionType>();

  const onRequest = async ({ current, ...rest }: Record<string, any>) => {
    const res =
      (await queryWorkerData.run({ ...rest, pageNum: current })) || {};
    return {
      data: res.list || {},
      total: res.total,
      success: true,
    };
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '技师昵称',
      dataIndex: 'nickName',
      width: 100,
      fixed: 'left',
    },
    {
      disable: true,
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      key: 'regTime',
      dataIndex: 'regTime',
      width: 160,
      search: {
        transform: (value) => {
          return {
            startDate: value[0],
            endDate: value[1],
          };
        },
      },
      valueType: 'dateRange',
      render: (_, record) => {
        return dayjs(record.regTime).format('YYYY-MM-DD HH:mm');
      },
    },
    {
      title: '接单数量',
      dataIndex: 'confirmOrderCount',
      hideInSearch: true,
    },
    {
      title: '完单数量',
      dataIndex: 'finishOrderCount',
      hideInSearch: true,
    },
    {
      title: '账户状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInTable: true,
      fieldProps: {
        options: WORKER_AND_CUSTOMER_STATUS,
      },
    },
    {
      title: '技师评分',
      dataIndex: 'evaluateAverageScore',
      valueType: 'slider',
      search: {
        transform: (value) => {
          return {
            evaluateScoreMin: value[0],
            evaluateScoreMax: value[1],
          };
        },
      },
      fieldProps: {
        defaultValue: [0, 5],
        min: 0,
        max: 5,
        range: {
          draggableTrack: true,
        },
      },
    },
    {
      title: '账户状态',
      dataIndex: 'masterStatusStr',
      hideInSearch: true,
      render: (text, record) => {
        const status = record.masterStatus;
        const propMap = {
          '1': {
            text: '正常',
            status: 'processing',
          },
          '2': {
            text: '冻结',
            status: 'default',
          },
        };
        return <Badge text={text} status={propMap[status]?.status} />;
      },
    },
    {
      title: '是否有修改',
      dataIndex: 'repeatFlag',
      hideInSearch: true,
      render: (repeatFlag) => {
        return repeatFlag === 1 ? '是' : '否';
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 300,
      fixed: 'right',
      render: (_, record) => {
        const { masterId = '', repeatFlag = '' } = record;
        return [
          <Comments key="comment" masterId={masterId}>
            <a>查看评价</a>
          </Comments>,
          <BasicInfo key="view" mode="detail" masterId={masterId}>
            <a>查看基础信息</a>
          </BasicInfo>,
          repeatFlag === 1 && (
            <BasicInfo masterId={masterId} mode="audit" key="audit">
              <a>资料修改审核</a>
            </BasicInfo>
          ),
        ];
      },
    },
  ];

  return (
    <PageContainer title="技师用户查询">
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={onRequest}
        editable={{
          type: 'multiple',
        }}
        rowKey="masterId"
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          defaultCollapsed: false,
        }}
        options={false}
        scroll={{
          x: 1300,
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="技师用户列表"
      />
    </PageContainer>
  );
};
