import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Button, Divider, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetch } from '../../../services';
import { PAGINATION } from '../../../config/constant';
import SearchForm from '../../../components/form/SearchForm';
import ModalForm from '../../../components/form/ModalForm';
import BasicTable from '../../../components/table/BasicTable';
import { dataChangeToTree, getCheckAndHalfCheck } from '../../../utils/utils';

export default props => {
  const searchFormRef = useRef();
  const modalFormRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState(PAGINATION);
  const [title, setTitle] = useState();
  const [record, setRecord] = useState({});
  const [treeData, setTreeData] = useState([]);

  async function onSearch(values) {
    const params = {
      ...values,
      page: values?.page ?? PAGINATION.current,
      limit: values?.pageSize ?? PAGINATION.pageSize,
    };
    const { page: data } = await fetch('sys.fakeRoleList', params);
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

  async function getResource() {
    const res = await fetch('sys.fakeResourceList');
    const resources = dataChangeToTree(res);
    setTreeData(resources);
  }

  function onTableChange(params) {
    const values = searchFormRef.current.getFieldsValue();
    onSearch({
      ...params,
      ...values,
    });
  }

  async function onOpenModal(title = '新建角色', record = {}) {
    setTitle(title);
    const { roleId } = record;
    if (roleId) {
      const { code, role } = await fetch('sys.getRoleById', { id: roleId });
      if (code === 0) {
        const checkedKeys = getCheckAndHalfCheck(treeData, role.menuIdList || []);
        record = { ...role, checkedKeys };
      }
    }
    setRecord(record);
    modalFormRef.current.setVisible(true);
  }

  async function onDelete(roleIds) {
    const { code, msg } = await fetch('sys.deleteRole', roleIds);
    if (code === 0) {
      message.success(msg);
      onSearch({ ...pagination });
    }
  }

  async function handleOk(values) {
    const { roleId, checkedKeys, ...ret } = values;
    let key = 'sys.addRole';
    if (roleId) key = 'sys.updateRole';
    const { checked, halfChecked } = checkedKeys;
    const { code, msg } = await fetch(key, {
      ...ret,
      roleId,
      menuIdList: [...checked, ...halfChecked],
    });
    if (code === 0) {
      message.success(msg);
      onSearch({ ...pagination });
      modalFormRef.current.setVisible(false);
    }
  }

  useEffect(() => {
    getResource();
    onSearch();
  }, []);

  return (
    <div>
      <SearchForm
        ref={searchFormRef}
        onSearch={onSearch}
        formItems={[{ type: 'input', label: '角色名称', name: 'roleName' }]}
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
              label: '角色名称',
              name: 'roleName',
              rules: [{ required: true, message: '请输入名称！' }],
            },
            { type: 'textarea', label: '备注', name: 'remark' },
            { type: 'tree', label: '权限设置', name: 'checkedKeys', treeData },
          ]}
        />
      </div>
      <BasicTable
        dataSource={dataSource}
        pagination={pagination}
        rowKey="roleId"
        onTableChange={onTableChange}
        columns={[
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
                <Button type="link" onClick={_ => onOpenModal('编辑角色', record)}>
                  编辑
                </Button>
                <Divider type="vertical" />
                <Popconfirm title="确定删除?" onConfirm={_ => onDelete([record.roleId])}>
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
