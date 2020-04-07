import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Button, Divider, Popconfirm, message } from 'antd';
import { PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { fetch } from '../../../services';
import { RESOURCE_TYPE } from '../../../config/constant';
import ModalForm from '../../../components/form/ModalForm';
import BasicTable from '../../../components/table/BasicTable';
import { dataChangeToTree } from '../../../utils/utils';

export default props => {
  const modalFormRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [title, setTitle] = useState();
  const [record, setRecord] = useState({});
  const [treeData, setTreeData] = useState([]);

  async function onSearch(values) {
    const response = await fetch('sys.fakeResourceList', values);
    setDataSource(dataChangeToTree(response));
  }

  async function getValidResource() {
    const { menuList } = await fetch('sys.fakeValidResources');
    const resources = dataChangeToTree(
      menuList.map(menu => {
        return { ...menu, value: menu.menuId, title: menu.name };
      }),
    );
    setTreeData(resources);
  }

  async function onOpenModal(title = '新建资源', record = {}) {
    setTitle(title);
    const { menuId } = record;
    if (menuId) {
      const { code, menu } = await fetch('sys.getResourceById', { id: menuId });
      if (code === 0) {
        record = { ...menu, type: `${menu.type}` };
      }
    }
    setRecord(record);
    modalFormRef.current.setVisible(true);
  }

  async function onDelete(record) {
    const { code, msg } = await fetch('sys.deleteResource', { id: record.menuId });
    if (code === 0) {
      message.success(msg);
      onSearch();
      getValidResource();
    }
  }

  async function handleOk(values) {
    const { menuId, parentId } = values;
    let key = 'sys.addResource';
    if (menuId) key = 'sys.updateResource';
    const { code, msg } = await fetch(key, { ...values, parentId: parentId || 0 });
    if (code === 0) {
      message.success(msg);
      onSearch();
      getValidResource();
      modalFormRef.current.setVisible(false);
    }
  }

  useEffect(() => {
    getValidResource();
    onSearch();
  }, []);

  return (
    <div>
      <div>
        <Button type="primary" icon={<SyncOutlined />} onClick={() => onSearch()}>
          刷新
        </Button>
        <Button
          icon={<PlusOutlined />}
          className="ml-8"
          type="primary"
          onClick={() => onOpenModal()}
        >
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
              label: '名称',
              name: 'name',
              rules: [{ required: true, message: '请输入名称！' }],
            },
            {
              type: 'radiogroup',
              label: '类型',
              name: 'type',
              rules: [{ required: true, message: '请选择状态！' }],
              list: Object.values(RESOURCE_TYPE),
            },
            { type: 'treeselect', label: '父节点', name: 'parentId', treeData },
            {
              type: 'inputnumber',
              label: '排序号',
              name: 'orderNum',
            },
            {
              type: 'input',
              label: '路径',
              name: 'url',
            },
            {
              type: 'input',
              label: '权限',
              name: 'perms',
            },
            // {
            //   type: 'input',
            //   label: '图标',
            //   name: 'icon',
            // },
            { type: 'textarea', label: '描述', name: 'desc' },
          ]}
        />
      </div>
      <div className="table-wrap">
        <BasicTable
          dataSource={dataSource}
          rowKey="menuId"
          pagination={false}
          columns={[
            {
              title: '名称',
              dataIndex: 'name',
            },
            {
              title: '路径',
              dataIndex: 'url',
              width: 300,
            },
            {
              title: '权限',
              dataIndex: 'perms',
              width: 300,
            },
            {
              title: '类型',
              dataIndex: 'type',
              width: 60,
              render: text => {
                let str = '';
                for (let item of RESOURCE_TYPE) {
                  if (`${text}` === item.key) {
                    str = item.value;
                    break;
                  }
                }
                return str;
              },
            },
            {
              title: '排序号',
              dataIndex: 'orderNum',
              width: 80,
              align: 'center',
            },
            {
              title: '操作',
              render: (text, record) => (
                <Fragment>
                  <Button type="link" onClick={_ => onOpenModal('编辑资源', record)}>
                    编辑
                  </Button>
                  <Divider type="vertical" />
                  <Popconfirm title="确定删除?" onConfirm={_ => onDelete(record)}>
                    <Button type="link">删除</Button>
                  </Popconfirm>
                </Fragment>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
