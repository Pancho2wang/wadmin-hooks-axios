import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

function getFormItem(item) {
  const { type, placeholder = '请输入' } = item;
  switch (type) {
    case 'input':
      return <Input placeholder={placeholder} />;
    default:
      break;
  }
  return null;
}

/**
 * 暴露给父组件调用如：
 * const formRef = useRef();
 * <SearchForm ref={formRef} onSearch={onSearch} />
 * 父组件调用 const values = formRef.current.getFieldsValue();
 */
export default forwardRef((props, ref) => {
  const { formItems, onSearch } = props;
  const [form] = Form.useForm();
  function onReset() {
    form.resetFields();
    onSearch && onSearch();
  }
  useImperativeHandle(ref, () => ({
    getFieldsValue: () => {
      return form.getFieldsValue();
    },
  }));
  return (
    <div className="py-15">
      <Form name="search_form" form={form} onFinish={onSearch} layout="inline">
        {formItems.map(item => {
          const { label, name, ...ret } = item;
          return (
            <FormItem key={name} label={label} name={name}>
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
