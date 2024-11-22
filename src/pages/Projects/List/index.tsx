import { PROJECT_LABEL, TARGET_USER } from '@/constants/index';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history, useModel, useRouteData } from '@umijs/max';
import { Button, Image, message, Popconfirm, Switch, Tag } from 'antd';
import React, { useRef } from 'react';

type GithubIssueItem = {
  projectId: string;
  name: string;
  price: string;
  time: number;
  phoneNumber: number;
  registerTime: number;
  labelList: number[];
  status: 1 | 2;
  headUrls: string[];
  closed_at?: string;
  type: number;
};

export default (): React.FC => {
  const { route } = useRouteData();
  document.title = route.name;
  const { queryProjectList, updateStatus, deletePro } = useModel('project');
  const actionRef = useRef<ActionType>();

  const goEditPage = (id: string) => {
    history.push(`/projects/edit?projectId=${id}`);
  };

  const onRequest = async ({ current, ...rest }: Record<string, any>) => {
    const res =
      (await queryProjectList.run({ ...rest, pageNum: current })) || {};
    return {
      data: res.list || {},
      total: res.total,
      success: true,
    };
  };

  const goProjectDetail = (id: string) => {
    history.push(`/projects/detail?projectId=${id}`);
  };

  const deleteProject = async (projectId: string) => {
    const res = await deletePro.run({ id: projectId });
    if (res) {
      message.success('删除成功～');
      queryProjectList.refresh();
    }
  };

  const goToCreatePage = () => {
    history.push('/projects/add');
  };

  const updateProjectStatus = async ({ value, id }) => {
    const status = value ? 1 : 2;
    const res = await updateStatus.run({
      status,
      id,
    });
    if (res) {
      message.success('项目状态更新成功～');
      queryProjectList.refresh();
    }
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '项目名称',
      dataIndex: 'name',
      render: (_, { name, headUrls }) => {
        return (
          <>
            <Image preview={false} src={headUrls[0]} width={40} height={40} />
            <a style={{ marginLeft: 6 }}>{name}</a>
          </>
        );
      },
    },
    {
      title: '项目标价',
      dataIndex: 'price',
      render: (_, { price }) => {
        return `${price}元`;
      },
    },
    {
      title: '项目时间',
      key: 'time',
      dataIndex: 'time',
      hideInSearch: true,
      render: (_, record) => {
        return `${record.time}分钟`;
      },
    },
    // {
    //   title: '项目类型',
    //   dataIndex: 'type',
    //   hideInSearch: true,
    //   render: (_, { type }) => {
    //     return type === 1 ? '调理项目' : '推荐按摩项目';
    //   },
    // },
    // {
    //   title: '项目描述',
    //   dataIndex: 'projectDesc',
    //   hideInSearch: true,
    // },
    {
      title: '适用人群',
      dataIndex: 'suitCrowd',
      valueType: 'select',
      hideInSearch: true,
      fieldProps: {
        options: TARGET_USER,
      },
    },
    {
      title: '项目标签',
      dataIndex: 'labelList',
      hideInSearch: true,
      valueType: 'select',
      fieldProps: {
        options: PROJECT_LABEL,
      },
      render: (_, { labelList }) => {
        const colorMap = {
          1: '#2db7f5',
          2: '#87d068',
          4: '#108ee9',
        };
        return (
          <>
            {labelList.map((item) => (
              <Tag color={colorMap[item]} key={item}>
                {PROJECT_LABEL.find((v) => v.value === item)?.label}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: '展示权重',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '项目状态',
      dataIndex: 'status',
      valueType: 'switch',
      hideInSearch: true,
      render: (_, { status, projectId }) => {
        const defaultChecked = status === 1;
        const unCheckedChildrenMap = {
          1: '启用',
          2: '停用',
        };
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren={unCheckedChildrenMap[status]}
            onChange={(value) => updateProjectStatus({ value, id: projectId })}
            defaultChecked={defaultChecked}
          />
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, { projectId }) => [
        <a key="editable" onClick={() => goEditPage(projectId)}>
          编辑项目
        </a>,
        <a key="detail" onClick={() => goProjectDetail(projectId)}>
          项目详情
        </a>,
        <Popconfirm
          key="delete"
          title="删除项目"
          description="您确定要删除此项目吗?"
          onConfirm={() => deleteProject(projectId)}
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
        request={onRequest}
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
        rowKey="projectId"
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
