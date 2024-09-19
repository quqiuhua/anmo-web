import Comments from '@/components/Comments';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useSetState } from 'ahooks';
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

interface State {
  openComments: boolean;
  openMassagerInfoModal: boolean;
  openType?: 'detail' | 'audit';
  commentsData: Record<string, any>[];
}

export default () => {
  const actionRef = useRef<ActionType>();
  const [state, setState] = useSetState<State>({
    openComments: false,
    openMassagerInfoModal: false,
    commentsData: [],
  });
  const { openComments } = state;

  const showComments = () => {
    setState({
      openComments: true,
    });
  };

  const onClose = () => {
    setState({
      openComments: false,
      openMassagerInfoModal: false,
    });
  };

  const gotoOrder = (record: GithubIssueItem) => {
    history.push({
      pathname: `/order?userId=${record.userId}`,
    });
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '用户昵称',
      dataIndex: 'name',
      fixed: 'left',
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
      title: '接单数量',
      dataIndex: 'acceptOrderCount',
      hideInSearch: true,
    },
    {
      title: '完单数量',
      dataIndex: 'finishedOrderCount',
      hideInSearch: true,
    },
    {
      title: '账户状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInTable: true,
    },
    {
      title: '技师评分',
      dataIndex: 'massagerGrade',
      valueType: 'slider',
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
      dataIndex: 'status',
      hideInSearch: true,
      render: () => {
        return <Switch checked={true} />;
      },
    },
    {
      title: '是否有修改',
      dataIndex: 'status',
      hideInSearch: true,
      render: () => {
        return <Switch checked={true} />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <a key="editable" onClick={showComments}>
          查看评价
        </a>,
        <a
          onClick={() => gotoOrder(record)}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          查看基础信息
        </a>,
        <a key="audit" onClick={showComments}>
          资料修改审核
        </a>,
      ],
    },
  ];

  return (
    <PageContainer title="技师用户查询">
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          return {
            data: [{ id: '11', name: 'name' }],
            total: 10,
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
        scroll={{
          x: 1400,
        }}
        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="技师用户列表"
      />
      <Comments open={openComments} onClose={onClose} data={[]} />
    </PageContainer>
  );
};
