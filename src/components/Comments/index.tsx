import { ProList } from '@ant-design/pro-components';
import { Modal, Space, Tag } from 'antd';
import React from 'react';

interface Props {
  open: boolean;
  data: Record<string, any>[];
  onClose: () => void;
}

// const Comment = () => {};

const defaultData = [
  {
    id: '1',
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '2',
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '3',
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    id: '4',
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
];

type DataItem = (typeof defaultData)[number];
const CommentsModal: React.FC<Props> = ({ open, data }) => {
  const setDataSource = () => {};
  console.log('data>>>>', data);
  return (
    <Modal maskClosable closeIcon={false} open={open} footer={false}>
      <ProList<DataItem>
        rowKey="id"
        headerTitle={<div>总评分 4.5</div>}
        dataSource={defaultData}
        showActions="hover"
        editable={{
          onSave: async (key, record, originRow) => {
            console.log(key, record, originRow);
            return true;
          },
        }}
        onDataSourceChange={setDataSource}
        metas={{
          title: {
            dataIndex: 'name',
          },
          avatar: {
            dataIndex: 'image',
            editable: false,
          },
          description: {
            dataIndex: 'desc',
          },
          subTitle: {
            render: () => {
              return (
                <Space size={0}>
                  <Tag color="blue">Ant Design</Tag>
                  <Tag color="#5BD8A6">TechUI</Tag>
                </Space>
              );
            },
          },
          actions: {
            render: (text, row, index, action) => [
              <a
                onClick={() => {
                  action?.startEditable(row.id);
                }}
                key="link"
              >
                编辑
              </a>,
            ],
          },
        }}
      />
    </Modal>
  );
};

export default CommentsModal;
