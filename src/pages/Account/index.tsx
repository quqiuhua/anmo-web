import CreateAccount from '@/components/Modals/CreateAccount';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRouteData } from '@umijs/max';
import { Button, message, Popconfirm, Switch } from 'antd';
import { useRef } from 'react';

type GithubIssueItem = {
  id: string;
  name: string;
  status: number;
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
  const { queryUserList, deleteAccount, updateAccountStatus, resetPwd } =
    useModel('account');
  document.title = route.name;
  const actionRef = useRef<ActionType>();

  const onRequest = async ({ current, ...rest }: Record<string, any>) => {
    const res = (await queryUserList.run({ ...rest, pageNum: current })) || {};
    return {
      data: res.list || {},
      total: res.total,
      success: true,
    };
  };

  const onDelete = async (id: string) => {
    const res = await deleteAccount.run({ id });
    if (res) {
      message.success('删除成功');
      setTimeout(() => {
        queryUserList.refresh();
      }, 1000);
    }
  };

  const onStatusChange = async (value: boolean, id: number) => {
    console.log('value, ', value, id);
    const res = await updateAccountStatus.run({
      userId: id,
      status: value ? 0 : 1,
    });
    if (res) {
      message.success('账户状态更新成功');
      queryUserList.refresh();
    }
  };

  const onReset = async (id: string) => {
    const res = await resetPwd.run({
      userId: id,
    });
    if (res) {
      message.success('新密码已成功发送');
    }
  };

  console.log('queryUserList>>>>', queryUserList);

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '编号',
      valueType: 'indexBorder',
      hideInSearch: true,
    },
    {
      title: '账户名',
      dataIndex: 'userName',
    },
    {
      title: '账号',
      dataIndex: 'phone',
    },
    {
      title: '账户状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, { status, id }) => {
        const defaultChecked = status === 0;
        const unCheckedChildrenMap = {
          1: '停用',
          2: '注销',
        };
        return (
          <Switch
            checkedChildren="启用"
            disabled={status === 2}
            unCheckedChildren={unCheckedChildrenMap[status]}
            onChange={(value) => onStatusChange(value, id)}
            defaultChecked={defaultChecked}
          />
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record) => {
        const { id } = record;
        return [
          <Popconfirm
            key="delete"
            title="删除账号"
            description="您确定要删除此账号吗?"
            onConfirm={() => onDelete(id)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>,
          <Popconfirm
            key="delete"
            title="重置密码"
            description="您确定要重置此账号密码吗?"
            onConfirm={() => onReset(id)}
            okText="确定"
            cancelText="取消"
          >
            <a>重置密码</a>
          </Popconfirm>,
        ];
      },
    },
  ];

  return (
    <PageContainer title="系统账户管理">
      <ProTable<GithubIssueItem>
        columns={columns}
        loading={queryUserList.loading}
        actionRef={actionRef}
        request={onRequest}
        dataSource={queryUserList.data?.list || []}
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
