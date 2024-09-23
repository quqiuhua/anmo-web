import CreateAccount from '@/components/Modals/CreateAccount';
import EditPassword from '@/components/Modals/EditPassword';
import { ACCOUNT_STATUS } from '@/constants/index';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { request } from '@umijs/max';
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
  registerTime: number;
  comments: Record<string, any>[];
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

export default () => {
  const actionRef = useRef<ActionType>();

  const deleteAccount = (record: GithubIssueItem) => {
    console.log('record>>>>>', record);
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '编号',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'accountName',
    },
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '账户状态',
      dataIndex: 'projectStatus',
      valueType: 'select',
      fieldProps: {
        options: ACCOUNT_STATUS,
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => [
        <Popconfirm
          key="delete"
          title="删除账号"
          description="您确定要删除此账号吗?"
          onConfirm={() => deleteAccount(record)}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>,
        <EditPassword key="eidt">
          <a>修改密码</a>
        </EditPassword>,
      ],
    },
  ];

  return (
    <PageContainer title="系统账户管理">
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
          <CreateAccount key="create">
            <Button icon={<PlusOutlined />} type="primary">
              新增账户
            </Button>
          </CreateAccount>,
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
