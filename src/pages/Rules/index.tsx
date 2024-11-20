import {
  configCommissionRate,
  queryCommissionRate,
} from '@/services/yxdaojia/ProjectController';
import {
  PageContainer,
  ProForm,
  ProFormDigit,
} from '@ant-design/pro-components';
import { useRequest, useRouteData } from '@umijs/max';
import { Card, Col, Form, message, Row, Space } from 'antd';
import { useEffect } from 'react';

interface FormValues {
  commissionRate: number;
}

export default () => {
  const { route } = useRouteData();
  document.title = route.name;
  const [form] = Form.useForm();

  const queryRule = useRequest(queryCommissionRate, {
    manual: true,
  });

  const configRule = useRequest(configCommissionRate, {
    manual: true,
  });

  const init = async () => {
    const rate = await queryRule.run();
    if (rate) {
      form.setFieldsValue({ commissionRate: rate });
    }
  };

  useEffect(() => {
    init();
  }, []);

  const onFinish = async (values: FormValues) => {
    const res = await configRule.run(values);
    if (res) {
      message.success('提交成功');
    }
  };

  return (
    <PageContainer title="技师分成">
      <Card>
        <ProForm<FormValues>
          submitter={{
            render: (props, doms) => {
              return (
                <Row>
                  <Col span={14} offset={0}>
                    <Space>{doms[1]}</Space>
                  </Col>
                </Row>
              );
            },
            submitButtonProps: {
              loading: configRule.loading,
            },
          }}
          loading={queryRule.loading}
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            commissionRate: queryRule.data,
          }}
        >
          <ProFormDigit
            width="md"
            name="commissionRate"
            label="分成比例"
            placeholder="请输入分成比例"
            extra="（分成商品总价的百分比）"
            addonAfter="%"
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};
