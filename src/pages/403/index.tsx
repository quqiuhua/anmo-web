import { Result } from 'antd';
import React from 'react';

const NoPermission: React.FC = () => (
  <Result status="403" title="403" subTitle="抱歉，您没有权限访问此页面" />
);

export default NoPermission;
