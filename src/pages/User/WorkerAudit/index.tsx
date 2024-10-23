import { AUDIT_STATUS } from '@/constants/index';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel, useRouteData } from '@umijs/max';
import dayjs from 'dayjs';
import BasicInfo from '../Worker/components/BasicInfo';

type GithubIssueItem = {
  masterId: string;
  nickName: string;
  status: string;
  state: string;
  masterStatus: 1 | 2;
  phone: number;
  regTime: string;
  auditStatus: number;
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

  const onRequest = async ({ current, ...rest }: Record<string, any>) => {
    const res =
      (await queryWorkerData.run({ ...rest, pageNum: current })) || {};
    return {
      data: res.list || [],
      total: res.total,
      success: true,
    };
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      title: '真实姓名',
      dataIndex: 'masterName',
    },
    {
      title: '昵称',
      hideInSearch: true,
      dataIndex: 'nickName',
    },
    {
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
      title: '资料提交状态',
      dataIndex: 'auditStatus',
      valueType: 'select',
      valueEnum: {
        1: { text: '资料待提交', status: 'Processing' },
        2: {
          text: '待审核',
          status: 'Processing',
        },
        3: {
          text: '审核驳回',
          status: 'Error',
        },
        4: {
          text: '审核通过',
          status: 'Success',
        },
      },
      initialValue: 2,
      fieldProps: {
        options: AUDIT_STATUS,
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_, record) => {
        const masterId = record.masterId;
        const showAudit = record.auditStatus === 2;
        return [
          showAudit && (
            <BasicInfo key="audit" mode="audit" masterId={masterId}>
              <a>资料审核</a>
            </BasicInfo>
          ),
          <BasicInfo mode="detail" key="view" masterId={masterId}>
            <a>查看详情</a>
          </BasicInfo>,
        ];
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<GithubIssueItem>
        columns={columns}
        cardBordered
        request={onRequest}
        dataSource={queryWorkerData.data?.list || []}
        rowKey="masterId"
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          defaultCollapsed: false,
        }}
        options={false}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="技师审核列表"
      />
    </PageContainer>
  );
};
