import StarIcon from '@/components/StarIcon';
import { COMMENT_TAGS_MAP } from '@/constants';
import { queryEvaluatePageList } from '@/services/yxdaojia/UserController';
import { ProList } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Modal, Rate, Space, Tag } from 'antd';
import React, { type ReactElement, useEffect, useState } from 'react';
import styles from './index.less';

interface Props {
  children: ReactElement;
  masterId: number;
}

const CommentsModal: React.FC<Props> = ({ children, masterId }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageSize: 5,
    pageNum: 1,
  });

  const queryEvaluateData = useRequest(queryEvaluatePageList, {
    manual: true,
  });

  const onRequest = async () => {
    const res = await queryEvaluateData.run({
      masterId,
      ...pageInfo,
    });
    const newData = res.list?.map((item) => ({
      name: item.customerName,
      content: item.content,
      id: item.createTime,
      labelList: item.labelList,
      masterId: item.masterId,
      createTime: item.createTime,
      score: item.evaluateScore,
      averageScore: item.averageScore,
    }));
    setData(newData);
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPageInfo({
      pageNum: page,
      pageSize,
    });
  };

  useEffect(() => {
    if (open) {
      onRequest();
    }
  }, [open, pageInfo.pageNum, pageInfo.pageSize]);

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
              总评分 {data[0]?.averageScore || '--'}
              <span className={styles.icon}>
                <StarIcon />
              </span>
            </div>
          }
          dataSource={data}
          showActions="always"
          pagination={{
            pageSize: 5,
            defaultCurrent: 1,
            total: queryEvaluateData.data?.total,
            onChange: onPageChange,
          }}
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
              render: (_, record) => {
                return (
                  <Space size={0}>
                    <Rate value={record.score} disabled />
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
