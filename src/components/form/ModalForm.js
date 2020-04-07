import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Tree, Modal, Radio, Select, InputNumber, TreeSelect } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const { Option } = Select;

const CustomTree = props => {
  const { treeData, value = {}, onChange } = props;
  const [values, setValues] = useState({ ...value });

  const onCheck = (checkedKeys, { halfCheckedKeys }) => {
    setValues({ checked: checkedKeys, halfChecked: halfCheckedKeys });
    onChange &&
      onChange({ ...values, ...value, checked: checkedKeys, halfChecked: halfCheckedKeys });
  };

  return (
    <Tree
      checkable
      onCheck={onCheck}
      checkedKeys={values}
      treeData={treeData}
      style={{ maxHeight: 500, overflow: 'auto' }}
    />
  );
};

function getFormItem(item) {
  const { type, placeholder = '请输入', list, ...ret } = item;
  switch (type) {
    case 'input':
      return <Input placeholder={placeholder} {...ret} />;
    case 'password':
      return <Input.Password placeholder={placeholder} {...ret} />;
    case 'inputnumber':
      return <InputNumber placeholder={placeholder} {...ret} />;
    case 'textarea':
      return <TextArea placeholder={placeholder} {...ret} />;
    case 'tree':
      return <CustomTree {...ret} />;
    case 'radiogroup':
      return (
        <RadioGroup {...ret}>
          {list.map(obj => (
            <Radio value={obj.key} key={obj.key}>
              {obj.value}
            </Radio>
          ))}
        </RadioGroup>
      );
    case 'select':
      return (
        <Select {...ret}>
          {list.map(obj => (
            <Option value={obj.value} key={obj.key}>
              {obj.name}
            </Option>
          ))}
        </Select>
      );
    case 'treeselect':
      return (
        <TreeSelect
          allowClear
          style={{ width: 300 }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          {...ret}
          // treeDefaultExpandAll
        />
      );
    default:
      break;
  }
  return <Input placeholder={placeholder} {...ret} />;
}

export default forwardRef((props, ref) => {
  const { title, handleOk, record, formItems } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  function onOk() {
    form
      .validateFields()
      .then(values => {
        handleOk && handleOk({ ...record, ...values });
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  }

  const formLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 17 },
  };
  useImperativeHandle(ref, () => ({
    setVisible: flag => setVisible(flag),
  }));
  useEffect(() => {
    if (visible && form) {
      form.resetFields();
    }
  }, [visible, form]);
  return (
    <Modal
      getContainer={false}
      width={760}
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={_ => setVisible(false)}
    >
      <Form {...formLayout} form={form} initialValues={record}>
        {formItems.map(item => {
          const { label, name, rules, ...ret } = item;
          return (
            <FormItem key={name} label={label} name={name} rules={rules}>
              {getFormItem(ret)}
            </FormItem>
          );
        })}
      </Form>
    </Modal>
  );
});
