import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Button, Divider, Popconfirm, message, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetch } from '../../../services';
import { PAGINATION, STATUS } from '../../../config/constant';
import SearchForm from '../../../components/form/SearchForm';
import ModalForm from '../../../components/form/ModalForm';
import BasicTable from '../../../components/table/BasicTable';
import { useStore } from '../../../utils/store';

export default props => {
  const searchFormRef = useRef();
  const modalFormRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState(PAGINATION);
  const [title, setTitle] = useState();
  const [record, setRecord] = useState({});
  const [roleList, setRoleList] = useState([]);
  const [state] = useStore('global');

  async function onSearch(values) {
    const params = {
      ...values,
      page: values?.page ?? PAGINATION.current,
      limit: values?.pageSize ?? PAGINATION.pageSize,
    };
    const { page: data } = await fetch('sys.fakeUserList', params);
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

  async function getRolesSelect() {
    const { list = [] } = await fetch('sys.fakeRolesSelect');
    setRoleList(list);
  }

  function onTableChange(params) {
    const values = searchFormRef.current.getFieldsValue();
    onSearch({
      ...params,
      ...values,
    });
  }

  async function onOpenModal(title = '新建用户', record = {}) {
    setTitle(title);
    const { userId } = record;
    if (userId) {
      const { code, user } = await fetch('sys.getUserById', { id: userId });
      if (code === 0) {
        record = { ...user, password: undefined, status: `${user.status}` };
      }
    }
    setRecord(record);
    modalFormRef.current.setVisible(true);
  }

  async function onDelete(userIds) {
    const { code, msg } = await fetch('sys.deleteUser', userIds);
    if (code === 0) {
      message.success(msg);
      onSearch({ ...pagination });
    }
  }

  async function handleOk(values) {
    const { userId } = values;
    let key = 'sys.addUser';
    if (userId) key = 'sys.updateUser';
    const { code, msg } = await fetch(key, values);
    if (code === 0) {
      message.success(msg);
      onSearch({ ...pagination });
      modalFormRef.current.setVisible(false);
    }
  }

  useEffect(() => {
    getRolesSelect();
    onSearch();
  }, []);

  return (
    <div>
      <SearchForm
        ref={searchFormRef}
        onSearch={onSearch}
        formItems={[{ type: 'input', label: '名称', name: 'username' }]}
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
              label: '账号',
              name: 'username',
              rules: [{ required: true, message: '请输入账号！' }],
            },
            {
              type: 'password',
              label: '密码',
              name: 'password',
              rules: [{ required: !record.userId, message: '请输入密码！' }],
            },
            // {
            //   type: 'input',
            //   label: '名称',
            //   name: 'name',
            // },
            {
              type: 'input',
              label: '手机号',
              name: 'mobile',
              rules: [{ required: true, message: '请输入手机号！' }],
            },
            {
              type: 'input',
              label: 'Email',
              name: 'email',
              rules: [{ required: true, message: '请输入Email！' }],
            },
            {
              type: 'radiogroup',
              label: '状态',
              name: 'status',
              rules: [{ required: true, message: '请选择状态！' }],
              list: Object.values(STATUS).map(obj => {
                const { key, value } = obj;
                return { key, value: value[0] };
              }),
            },
            {
              type: 'select',
              label: '角色',
              name: 'roleIdList',
              mode: 'multiple',
              list: roleList.map(obj => {
                const { roleId, roleName } = obj;
                return { key: roleId, value: roleId, name: roleName };
              }),
            },
            // {
            //   type: 'select',
            //   label: '公司',
            //   name: 'company_id',
            //   mode: 'multiple',
            //   list: [],
            // },
            // { type: 'textarea', label: '备注', name: 'remark' },
          ]}
        />
      </div>
      <BasicTable
        dataSource={dataSource}
        pagination={pagination}
        rowKey="userId"
        onTableChange={onTableChange}
        columns={[
          {
            title: 'ID',
            dataIndex: 'userId',
          },
          {
            title: '账号',
            dataIndex: 'username',
          },
          // {
          //   title: '名称',
          //   dataIndex: 'name',
          // },
          /* {
            title: '公司名称',
            dataIndex: 'company_name',
          }, */
          {
            title: '手机号',
            dataIndex: 'mobile',
          },
          {
            title: '邮箱',
            dataIndex: 'email',
          },
          {
            title: '角色',
            dataIndex: 'roleIdList',
          },
          {
            title: '状态',
            dataIndex: 'status',
            render(val) {
              let value = [];
              for (let item of STATUS) {
                if (`${val}` === item.key) {
                  value = item.value;
                  break;
                }
              }
              return <Badge status={value[1]} text={value[0]} />;
            },
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
          },
          {
            title: '操作',
            render: (text, record) => {
              if (record.userId === 1) {
                const { user } = state;
                if (user.userId !== 1) {
                  return '';
                } else {
                  return (
                    <Fragment>
                      <Button type="link" onClick={_ => onOpenModal('编辑用户', record)}>
                        编辑
                      </Button>
                    </Fragment>
                  );
                }
              }
              return (
                <Fragment>
                  <Button type="link" onClick={_ => onOpenModal('编辑用户', record)}>
                    编辑
                  </Button>
                  <Divider type="vertical" />
                  <Popconfirm title="确定删除?" onConfirm={_ => onDelete([record.userId])}>
                    <Button type="link">删除</Button>
                  </Popconfirm>
                </Fragment>
              );
            },
          },
        ]}
      />
    </div>
  );
};
