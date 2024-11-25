import StarIcon from '@/components/StarIcon';
import { COMMENT_TAGS_MAP } from '@/constants';
import { queryOrderEvaluateDetail } from '@/services/yxdaojia/ProjectController';
import { ProList } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Modal, Rate, Space, Tag } from 'antd';
import React, { type ReactElement, useEffect, useState } from 'react';
import styles from './index.less';

interface Props {
  children: ReactElement;
  orderId: string;
}

const CommentsModal: React.FC<Props> = ({ children, orderId }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const queryEvaluateData = useRequest(queryOrderEvaluateDetail, {
    manual: true,
  });
  const score = queryEvaluateData.data?.score || 0;

  const onRequest = async () => {
    const res = await queryEvaluateData.run({
      orderId,
    });
    console.log('res', res);
    const newData = [res]?.map((item) => ({
      name: item.customerName,
      content: item.content,
      id: item.createTime,
      labelList: item.labels,
      masterId: item.masterId,
      score: item.score,
      createTime: item.createTime,
    }));
    setData(newData);
  };

  useEffect(() => {
    if (open) {
      onRequest();
    }
  }, [open]);

  return (
    <>
      <span onClick={() => setOpen(true)}>{children && children}</span>
      <Modal
        onCancel={() => setOpen(false)}
        open={open}
        footer={false}
        onClose={() => setOpen(false)}
        maskClosable
      >
        <ProList
          rowKey="id"
          className={styles.comments}
          loading={queryEvaluateData.loading}
          headerTitle={
            <div>
              总评分 {score}
              <span className={styles.icon}>
                <StarIcon />
              </span>
            </div>
          }
          dataSource={data}
          showActions="always"
          editable={{
            onSave: async (key, record, originRow) => {
              console.log(key, record, originRow);
              return true;
            },
          }}
          pagination={false}
          metas={{
            title: {
              dataIndex: 'name',
            },
            avatar: () => null,
            description: {
              dataIndex: 'desc',
              render: (_, record) => {
                const { labelList = [] } = record;
                return (
                  <>
                    <div className={styles.content}>{record.content}</div>
                    <Space size={0}>
                      {labelList.map((item) => (
                        <Tag key={item} color="rgba(239,239,239,1)">
                          {
                            COMMENT_TAGS_MAP[
                              item as keyof typeof COMMENT_TAGS_MAP
                            ]
                          }
                        </Tag>
                      ))}
                    </Space>
                  </>
                );
              },
            },
            subTitle: {
              render: () => {
                return (
                  <Space size={0}>
                    <Rate value={score} disabled />
                  </Space>
                );
              },
            },
            actions: {
              render: (_, record) => [
                <span className={styles.time} key="time">
                  {record.createTime}
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
