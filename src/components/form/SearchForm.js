import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

function getFormItem(item) {
  const { type, placeholder = '请输入', ...ret } = item;
  switch (type) {
    case 'input':
      return <Input placeholder={placeholder} {...ret} />;
    default:
      break;
  }
  return <Input placeholder={placeholder} {...ret} />;
}

/**
 * 暴露给父组件调用如：
 * const formRef = useRef();
 * <SearchForm ref={formRef} onSearch={onSearch} />
 * 父组件调用 const values = formRef.current.getFieldsValue();
 *
 * 入参：props: {formItems, onSearch}
 * formItems: 对象数组 {type, label name, placeholder}
 * onSearch: 函数
 */
export default forwardRef((props, ref) => {
  const { formItems, onSearch } = props;
  const [form] = Form.useForm();
  function onReset() {
    form.resetFields();
    onSearch && onSearch();
  }
  useImperativeHandle(ref, () => ({
    getFieldsValue: () => form.getFieldsValue(),
  }));
  return (
    <div className="py-15">
      <Form name="search_form" form={form} onFinish={onSearch} layout="inline">
        {formItems.map(item => {
          const { label, name, rules, ...ret } = item;
          return (
            <FormItem key={name} label={label} name={name} rules={rules}>
              {getFormItem(ret)}
            </FormItem>
          );
        })}
        <FormItem>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button className="ml-8" onClick={onReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );
});
