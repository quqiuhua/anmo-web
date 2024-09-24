import { AUDIT_STATUS } from '@/constants/index';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Popconfirm } from 'antd';
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

  const goDetail = () => {};

  const handleDelete = () => {};

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '真实姓名',
      dataIndex: 'realName',
    },
    {
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
      title: '身份证号',
      dataIndex: 'IDNumber',
      hideInSearch: true,
    },
    {
      title: '资料提交状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        options: AUDIT_STATUS,
      },
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
        <a key="editable" onClick={() => goDetail()}>
          查看详情
        </a>,
        <Popconfirm
          key="audit"
          title="删除审核数据"
          description="您确定要删除此条数据吗?"
          onConfirm={handleDelete}
          okText="确定"
          cancelText="取消"
        >
          <a key="audit">删除</a>
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
        headerTitle="技师审核列表"
      />
    </PageContainer>
  );
};
