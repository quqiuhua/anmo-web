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

  const onOfferDiscountCard = () => {};

  const deleteProject = (record: GithubIssueItem) => {
    console.log('record>>>>>', record);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '项目名称',
      dataIndex: 'projectName',
    },
    {
      title: '项目标价',
      dataIndex: 'projectPrice',
    },
    {
      title: '项目时间',
      key: 'projectTimeConsuming',
      dataIndex: 'projectTimeConsuming',
      hideInSearch: true,
    },
    {
      title: '展示权重',
      dataIndex: 'showZIndex',
      hideInSearch: true,
    },
    {
      title: '项目状态',
      dataIndex: 'projectStatus',
      valueType: 'switch',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <a key="editable" onClick={onOfferDiscountCard}>
          编辑详情
        </a>,
        <Popconfirm
          key="delete"
          title="删除项目"
          description="您确定要删除此项目吗?"
          onConfirm={() => deleteProject(record)}
          okText="确定"
          cancelText="取消"
        >
          <a target="_blank" rel="noopener noreferrer" key="view">
            删除
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
        headerTitle="项目列表"
      />
    </PageContainer>
  );
};
