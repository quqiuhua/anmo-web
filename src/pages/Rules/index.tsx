import {
  PageContainer,
  ProForm,
  ProFormDigit,
} from '@ant-design/pro-components';
import { Card, Col, message, Row, Space } from 'antd';

export default () => {
  return (
    <PageContainer title="技师分成">
      <Card>
        <ProForm<{
          name: string;
          company?: string;
          useMode?: string;
        }>
          submitter={{
            render: (props, doms) => {
              return (
                <Row>
                  <Col span={14} offset={4}>
                    <Space>{doms[1]}</Space>
                  </Col>
                </Row>
              );
            },
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={async (values) => {
            console.log(values);
            message.success('提交成功');
          }}
        >
          <ProFormDigit
            width="md"
            name="ratio"
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
