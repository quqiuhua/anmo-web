import { USER_TYPE } from '@/constants/index';
import {
  giveCoupon,
  queryCouponPageList,
} from '@/services/yxdaojia/UserController';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Form, message } from 'antd';
import React, { type ReactElement, useState } from 'react';

interface Props {
  children: ReactElement;
  userId: number;
}

interface FormValues {
  couponIds: number[];
}

const RewardRuleModal: React.FC<Props> = ({ children, userId }) => {
  const [form] = Form.useForm<FormValues>();
  const [coupons, setCoupons] = useState([]);

  const queryCouponEnums = useRequest(queryCouponPageList, {
    manual: true,
  });

  const handOutCoupon = useRequest(giveCoupon, {
    manual: true,
  });

  const onOpen = async (open: boolean) => {
    if (open && !coupons.length) {
      const res = await queryCouponEnums.run({
        pageNum: 1,
        pageSize: 20,
        status: 1,
        classifyCode: 'CUSTOMER',
      });
      const data = res.list.map((item: API.CouponVO) => ({
        label: `${item.amount}元（${item.name}）`,
        value: item.id,
      }));
      setCoupons(data);
    }
  };

  const onSubmit = async (values: FormValues) => {
    const params = {
      ...values,
      userId,
      userType: USER_TYPE.CUSTOMER,
    };
    const res = await handOutCoupon.run(params as API.GiveCouponParams);
    if (res) {
      message.success('发放成功');
    }
    return true;
  };

  return (
    <ModalForm<FormValues>
      title="发放优惠券(无门槛)"
      trigger={children}
      form={form}
      labelCol={{ span: 6 }}
      width={390}
      layout="horizontal"
      onOpenChange={onOpen}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitter={{
        submitButtonProps: {
          loading: handOutCoupon.loading,
        },
      }}
      submitTimeout={2000}
      onFinish={onSubmit}
    >
      <ProFormSelect
        options={coupons}
        mode="multiple"
        width="lg"
        rules={[{ required: true, message: '请选择优惠券' }]}
        name="couponIds"
        placeholder="请选择优惠券"
      />
    </ModalForm>
  );
};

export default RewardRuleModal;
