import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history, useRouteData } from '@umijs/max';
import { Button, Popconfirm } from 'antd';
import React, { useRef } from 'react';

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

export default (): React.FC => {
  const { route } = useRouteData();
  document.title = route.name;
  const actionRef = useRef<ActionType>();

  const goEditPage = () => {
    history.push('/projects/edit');
  };

  const goProjectDetail = () => {
    history.push('/projects/detail');
  };

  const deleteProject = (record: GithubIssueItem) => {
    console.log('record>>>>>', record);
  };

  const goToCreatePage = () => {
    history.push('/projects/add');
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
        <a key="editable" onClick={goEditPage}>
          编辑项目
        </a>,
        <a key="detail" onClick={goProjectDetail}>
          项目详情
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
        toolBarRender={() => [
          <Button
            key="create"
            icon={<PlusOutlined />}
            type="primary"
            onClick={goToCreatePage}
          >
            新增项目
          </Button>,
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
        headerTitle="项目列表"
      />
    </PageContainer>
  );
};
