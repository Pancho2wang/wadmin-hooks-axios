import React, { useEffect, useState, useRef } from 'react';
import { Tooltip } from 'antd';
import { fetch } from '../../../services';
import { PAGINATION } from '../../../config/constant';
import SearchForm from '../../../components/form/SearchForm';
import BasicTable from '../../../components/table/BasicTable';

export default props => {
  const searchFormRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState(PAGINATION);

  async function onSearch(values) {
    const params = {
      ...values,
      page: values?.page ?? PAGINATION.current,
      limit: values?.pageSize ?? PAGINATION.pageSize,
    };
    const { page: data } = await fetch('sys.fakeLogsList', params);
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

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <div>
      <SearchForm
        ref={searchFormRef}
        onSearch={onSearch}
        formItems={[{ type: 'input', label: '用户名', name: 'key' }]}
      />
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
            title: '用户名',
            dataIndex: 'username',
          },
          {
            title: '用户操作',
            dataIndex: 'operation',
          },
          {
            title: '请求方法',
            dataIndex: 'method',
            width: 300,
            render: text => {
              return (
                <Tooltip title={text}>
                  <div
                    style={{
                      width: '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {text}
                  </div>
                </Tooltip>
              );
            },
          },
          {
            title: '请求参数',
            dataIndex: 'params',
            width: 300,
            render: text => {
              return (
                <Tooltip title={text}>
                  <div
                    style={{
                      width: '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {text}
                  </div>
                </Tooltip>
              );
            },
          },
          {
            title: '执行时长（毫秒）',
            dataIndex: 'time',
          },
          {
            title: 'IP地址',
            dataIndex: 'ip',
          },
          {
            title: '创建时间',
            dataIndex: 'createDate',
          },
        ]}
      />
    </div>
  );
};
