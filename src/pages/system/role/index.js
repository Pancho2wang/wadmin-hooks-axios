import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Button, Divider, Popconfirm } from 'antd';
import { fetch } from '../../../services';
import { PAGINATION } from '../../../config/constant';
import SearchForm from '../../../components/form/SearchForm';
import BasicTable from '../../../components/table/BasicTable';

export default props => {
  console.log(props);
  const formRef = useRef();
  const [data, setData] = useState({});

  async function onSearch(values) {
    const params = {
      ...values,
      page: values?.current ?? PAGINATION.current,
      limit: values?.pageSize ?? PAGINATION.pageSize,
      // sidx: 'createTime',
      // order: 'asc',
    };
    const { page: data } = await fetch('sys.fakeRoleList', params);
    setData({
      ...PAGINATION,
      ...values,
      ...data,
      current: values?.current ?? PAGINATION.current,
      pageSize: values?.pageSize ?? PAGINATION.pageSize,
      total: data?.totalCount ?? PAGINATION.total,
    });
  }

  function onTableChange(params) {
    const values = formRef.current.getFieldsValue();
    onSearch({
      ...params,
      ...values,
    });
  }

  function onEdit(flag, record) {}
  function onDelete(record) {}

  useEffect(() => {
    onSearch();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'roleId',
    },
    {
      title: '名称',
      dataIndex: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Button type="link" onClick={_ => onEdit(true, record)}>
            编辑
          </Button>
          <Divider type="vertical" />
          <Popconfirm
            title="确定删除?"
            okText="确定"
            cancelText="取消"
            onConfirm={_ => onDelete(record)}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </Fragment>
      ),
    },
  ];

  const formItems = [{ type: 'input', label: '角色名称', name: 'roleName' }];

  return (
    <div>
      <SearchForm ref={formRef} onSearch={onSearch} formItems={formItems} />
      <BasicTable data={data} columns={columns} onTableChange={onTableChange} />
    </div>
  );
};
