import React from 'react';
import { Table } from 'antd';
import { getValue } from '../../utils/utils';

export default props => {
  const { dataSource = [], pagination = false, columns, rowKey, onTableChange } = props;
  function onChange(pagination, filtersArg, sorter) {
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    onTableChange && onTableChange(params);
  }

  return (
    <Table
      className="py-15"
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      onChange={onChange}
      rowKey={rowKey}
    />
  );
};
