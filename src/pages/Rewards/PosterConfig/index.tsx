import {
  PageContainer,
  ProForm,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Card, Col, message, Row, Space } from 'antd';

export default () => {
  return (
    <PageContainer title="宣传海报配置">
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
                  <Col span={14} offset={0}>
                    <Space>{doms[1]}</Space>
                  </Col>
                </Row>
              );
            },
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          onFinish={async (values) => {
            console.log(values);
            message.success('提交成功');
          }}
        >
          <ProFormUploadButton
            width="md"
            name="posterImg"
            label="宣传海报"
            title="点击上传"
            extra="宣传海报规则：（建议尺寸：375*694）"
            listType="picture-card"
            max={1}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};
