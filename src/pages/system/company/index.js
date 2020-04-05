import React from 'react';

import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

export default props => {
  async function onSearch(values) {}
  async function onReset(values) {}
  return (
    <div>
      <Form name="search_form" size="large" onFinish={onSearch} layout="inline">
        <FormItem label="公司名称" name="company_name">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
