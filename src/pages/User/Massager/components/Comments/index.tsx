import StarIcon from '@/components/StarIcon';
import { ProList } from '@ant-design/pro-components';
import { Modal, Rate, Space, Tag } from 'antd';
import React, { type ReactElement, useState } from 'react';
import styles from './index.less';

interface Props {
  data: Record<string, any>[];
  onClose: () => void;
  children: ReactElement;
}

const defaultData = [
  {
    id: '1',
    name: '匿名',
    content: '很好',
    value: 5,
  },
  {
    id: '2',
    name: '匿名',
    content: '很好, 目瞪口呆吗看什么书',
    value: 5,
  },
  {
    id: '3',
    name: '测试账号',
    content: '很好, 吗的开明的是',
    value: 5,
  },
  {
    id: '4',
    name: '没什么',
    content: '很好, 吗的开明的是mmsmssjdndj',
    value: 5,
  },
];

type DataItem = (typeof defaultData)[number];
const CommentsModal: React.FC<Props> = ({ data, children }) => {
  const [open, setOpen] = useState(false);
  const setDataSource = () => {};
  console.log('data>>>>', data);
  return (
    <>
      <span onClick={() => setOpen(true)}>{children && children}</span>
      <Modal
        onCancel={() => setOpen(false)}
        closeIcon={false}
        open={open}
        footer={false}
        maskClosable
      >
        <ProList<DataItem>
          rowKey="id"
          className={styles.comments}
          headerTitle={
            <div>
              总评分 4.5
              <span className={styles.icon}>
                <StarIcon />
              </span>
            </div>
          }
          dataSource={defaultData}
          showActions="always"
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
            avatar: () => null,
            description: {
              dataIndex: 'desc',
              render: () => {
                return (
                  <>
                    <div className={styles.content}>评价内容</div>
                    <Space size={0}>
                      <Tag color="rgba(239,239,239,1)">服装整洁</Tag>
                      <Tag color="rgba(239,239,239,1)">热情礼貌</Tag>
                      <Tag color="rgba(239,239,239,1)">相当专业</Tag>
                    </Space>
                  </>
                );
              },
            },
            subTitle: {
              render: () => {
                return (
                  <Space size={0}>
                    <Rate defaultValue={5} disabled />
                  </Space>
                );
              },
            },
            actions: {
              render: () => [
                <span className={styles.time} key="time">
                  2024-10-23
                </span>,
              ],
            },
          }}
        />
      </Modal>
    </>
  );
};

export default CommentsModal;
