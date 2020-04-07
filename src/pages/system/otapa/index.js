import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Button, Divider, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetch } from '../../../services';
import { PAGINATION } from '../../../config/constant';
import SearchForm from '../../../components/form/SearchForm';
import ModalForm from '../../../components/form/ModalForm';
import BasicTable from '../../../components/table/BasicTable';

export default props => {
  const searchFormRef = useRef();
  const modalFormRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState(PAGINATION);
  const [title, setTitle] = useState();
  const [record, setRecord] = useState({});

  async function onSearch(values) {
    const params = {
      ...values,
      page: values?.page ?? PAGINATION.current,
      limit: values?.pageSize ?? PAGINATION.pageSize,
    };
    const { page: data } = await fetch('sys.fakeOtapaList', params);
    const { list = [], ...pagi } = data;
    setDataSource(list);
    setPagination({
      ...PAGINATION,
      ...values,
      current: values?.page ?? PAGINATION.current,
      pageSize: values?.pageSize ?? PAGINATION.pageSize,
      total: pagi?.totalCount ?? PAGINATION.total,
    });
  }

  function onTableChange(params) {
    const values = searchFormRef.current.getFieldsValue();
    onSearch({
      ...params,
      ...values,
    });
  }

  async function onOpenModal(title = '新建参数', record = {}) {
    setTitle(title);
    const { id } = record;
    if (id) {
      const { code, config } = await fetch('sys.getOtapaById', { id });
      if (code === 0) {
        record = { ...config };
      }
    }
    setRecord(record);
    modalFormRef.current.setVisible(true);
  }

  async function onDelete(ids) {
    const { code, msg } = await fetch('sys.deleteOtapa', ids);
    if (code === 0) {
      message.success(msg);
      onSearch({ ...pagination });
    }
  }

  async function handleOk(values) {
    const { id } = values;
    let key = 'sys.addOtapa';
    if (id) key = 'sys.updateOtapa';
    const { code, msg } = await fetch(key, values);
    if (code === 0) {
      message.success(msg);
      onSearch({ ...pagination });
      modalFormRef.current.setVisible(false);
    }
  }

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <div>
      <SearchForm
        ref={searchFormRef}
        onSearch={onSearch}
        formItems={[{ type: 'input', label: '参数名', name: 'paramKey' }]}
      />
      <div className="pt-15">
        <Button icon={<PlusOutlined />} type="primary" onClick={() => onOpenModal()}>
          新建
        </Button>
        <ModalForm
          ref={modalFormRef}
          title={title}
          handleOk={handleOk}
          record={record}
          formItems={[
            {
              type: 'input',
              label: '参数名',
              name: 'paramKey',
              rules: [{ required: true, message: '请输入参数名！' }],
            },
            {
              type: 'input',
              label: '参数值',
              name: 'paramValue',
              rules: [{ required: true, message: '请输入参数值！' }],
            },
            { type: 'textarea', label: '备注', name: 'remark' },
          ]}
        />
      </div>
      <BasicTable
        dataSource={dataSource}
        pagination={pagination}
        rowKey="id"
        onTableChange={onTableChange}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
          },
          {
            title: '参数名',
            dataIndex: 'paramKey',
          },
          {
            title: '参数值',
            dataIndex: 'paramValue',
          },
          {
            title: '备注',
            dataIndex: 'remark',
          },
          {
            title: '操作',
            render: (text, record) => (
              <Fragment>
                <Button type="link" onClick={_ => onOpenModal('编辑参数', record)}>
                  编辑
                </Button>
                <Divider type="vertical" />
                <Popconfirm title="确定删除?" onConfirm={_ => onDelete([record.id])}>
                  <Button type="link">删除</Button>
                </Popconfirm>
              </Fragment>
            ),
          },
        ]}
      />
    </div>
  );
};
