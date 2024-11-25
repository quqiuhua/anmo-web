import { queryOrderDetail } from '@/services/yxdaojia/ProjectController';
import { ModalForm } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Form, message, Steps } from 'antd';
import React, { type ReactElement } from 'react';
import styles from './index.less';

interface Props {
  children: ReactElement;
  orderId: string;
}

interface FormValues {
  finishedCount: number;
  rewardAmount: number;
  limitDay: number;
}

const EditOrderModal: React.FC<Props> = ({ children, orderId }) => {
  const [form] = Form.useForm<FormValues>();

  const queryOrder = useRequest(queryOrderDetail, {
    manual: true,
  });

  const handleOpen = (open: boolean) => {
    if (open) {
      queryOrder.run({
        orderId,
      });
    }
  };

  const detail = queryOrder.data || {};
  const receiveTime = detail.logList?.find(
    (item) => item.orderStatus === 2,
  )?.createTime;
  const startOffTime = detail.logList?.find(
    (item) => item.orderStatus === 3,
  )?.createTime;
  const arrivTime = detail.logList?.find(
    (item) => item.orderStatus === 4,
  )?.createTime;
  const serveTime = detail.logList?.find(
    (item) => item.orderStatus === 5,
  )?.createTime;
  const finishTime = detail.logList?.find(
    (item) => item.orderStatus === 6,
  )?.createTime;

  const Location = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="12"
        height="12"
        filter="none"
      >
        <g>
          <path
            d="M16 27.867l6.6-6.6c1.689-1.689 2.733-4.022 2.733-6.599 0-5.155-4.179-9.333-9.333-9.333s-9.333 4.179-9.333 9.333c0 2.577 1.045 4.91 2.733 6.599l6.6 6.6zM16 31.637l-8.485-8.485c-2.172-2.172-3.515-5.172-3.515-8.485 0-6.627 5.373-12 12-12s12 5.373 12 12c0 3.314-1.343 6.314-3.515 8.485l-8.485 8.485zM16 17.333c1.473 0 2.667-1.194 2.667-2.667s-1.194-2.667-2.667-2.667v0c-1.473 0-2.667 1.194-2.667 2.667s1.194 2.667 2.667 2.667v0zM16 20c-2.946 0-5.333-2.388-5.333-5.333s2.388-5.333 5.333-5.333v0c2.946 0 5.333 2.388 5.333 5.333s-2.388 5.333-5.333 5.333v0z"
            fill="rgba(108,108,108,1)"
          ></path>
        </g>
      </svg>
    );
  };

  return (
    <ModalForm<FormValues>
      title="订单详情"
      trigger={children}
      form={form}
      width={580}
      layout="vertical"
      labelAlign="left"
      autoFocusFirstInput
      onOpenChange={handleOpen}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitter={false}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <div className={styles.label}>所属技师</div>
      <span className={styles.value}>{detail.masterNickName}</span>

      <div className={styles.label}>时间节点</div>
      <Steps
        direction="vertical"
        size="small"
        current={1}
        className={styles.steps}
        items={[
          {
            title: '我已接单',
            description: receiveTime ? `接单时间:${receiveTime}` : '--',
            status: detail.logList?.find((item) => item.orderStatus === 2)
              ? 'finish'
              : 'wait',
          },
          {
            title: (
              <>
                <div>
                  我已出发
                  <span style={{ marginLeft: 10, color: '#6C6C6C' }}>
                    <Location />
                    <span style={{ marginRight: 4 }}>
                      {detail.logList?.find((item) => item.orderStatus === 3)
                        ?.distance || '--'}
                    </span>
                    km
                  </span>
                </div>
              </>
            ),
            description: startOffTime ? `出发时间:${startOffTime}` : '--',
            status: detail.logList?.find((item) => item.orderStatus === 3)
              ? 'finish'
              : 'wait',
          },
          {
            title: '我已到达',
            description: arrivTime ? `到达时间:${arrivTime}` : '--',
            status: detail.logList?.find((item) => item.orderStatus === 4)
              ? 'finish'
              : 'wait',
          },
          {
            title: '开始服务',
            description: serveTime ? `开始服务:${serveTime}` : '--',
            status: detail.logList?.find((item) => item.orderStatus === 5)
              ? 'finish'
              : 'wait',
          },
          {
            title: '结束服务',
            description: finishTime ? `完成时间:${finishTime}` : '--',
            status: detail.logList?.find((item) => item.orderStatus === 6)
              ? 'finish'
              : 'wait',
          },
        ]}
      />
      <div className={styles.label}>订单金额</div>
      <span className={styles.value}>{detail.totalAmount}</span>
      <div className={styles.label}>技师所得金额</div>
      <span className={styles.value}>{detail.masterAmount}</span>
      <div className={styles.label}>可提现时间</div>
      <span className={styles.value}>{detail.withdrawTime || '--'}</span>
    </ModalForm>
  );
};

export default EditOrderModal;
