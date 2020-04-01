import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

export default props => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，页面不存在。"
      extra={
        <Button type="primary">
          <Link to="/">回首页</Link>
        </Button>
      }
    />
  );
};
