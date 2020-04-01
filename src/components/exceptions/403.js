import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

export default props => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，你没有权限进入此页。"
      extra={
        <Button type="primary">
          <Link to="/">回首页</Link>
        </Button>
      }
    />
  );
};
