import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Button, Divider, Popconfirm, message, Badge } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetch } from '../../../services';
import { PAGINATION, EXEC_STATUS } from '../../../config/constant';
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
    const { page: data } = await fetch('sys.fakeJobScheduleList', params);
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

  async function onOpenModal(title = '新建定时任务', record = {}) {
    setTitle(title);
    const { jobId } = record;
    if (jobId) {
      const { code, schedule } = await fetch('sys.getJobScheduleById', { id: jobId });
      if (code === 0) {
        record = { ...schedule, status: `${schedule.status}` };
      }
    }
    setRecord(record);
    modalFormRef.current.setVisible(true);
  }

  async function onHandle(name, ids) {
    let key = 'sys.deleteJobSchedule';
    switch (name) {
      case 'delete':
        key = 'sys.deleteJobSchedule';
        break;
      case 'pause':
        key = 'sys.pauseJobSchedule';
        break;
      case 'resume':
        key = 'sys.resumeJobSchedule';
        break;
      case 'run':
        key = 'sys.runJobSchedule';
        break;
      default:
        break;
    }
    const { code, msg } = await fetch(key, ids);
    if (code === 0) {
      message.success(msg);
      onSearch({ ...pagination });
    }
  }

  async function handleOk(values) {
    const { jobId } = values;
    let key = 'sys.addJobSchedule';
    if (jobId) key = 'sys.updateJobSchedule';
    const { code, msg } = await fetch(key, { ...values, createTime: undefined });
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
        formItems={[{ type: 'input', label: 'bean名称', name: 'beanName' }]}
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
              label: 'bean名称',
              name: 'beanName',
              rules: [{ required: true, message: '请输入bean名称！' }],
            },
            {
              type: 'input',
              label: '参数',
              name: 'params',
            },
            {
              type: 'input',
              label: 'cron表达式',
              name: 'cronExpression',
              rules: [{ required: true, message: '请输入cron表达式！' }],
            },
            {
              type: 'radiogroup',
              label: '状态',
              name: 'status',
              rules: [{ required: true, message: '请选择状态！' }],
              list: Object.values(EXEC_STATUS).map(obj => {
                const { key, value } = obj;
                return { key, value: value[0] };
              }),
            },
            { type: 'textarea', label: '备注', name: 'remark' },
          ]}
        />
      </div>
      <BasicTable
        dataSource={dataSource}
        pagination={pagination}
        rowKey="jobId"
        onTableChange={onTableChange}
        columns={[
          {
            title: 'ID',
            dataIndex: 'jobId',
          },
          {
            title: 'bean名称',
            dataIndex: 'beanName',
          },
          {
            title: '参数',
            dataIndex: 'params',
          },
          {
            title: 'cron表达式',
            dataIndex: 'cronExpression',
          },
          {
            title: '备注',
            dataIndex: 'remark',
          },
          {
            title: '状态',
            dataIndex: 'status',
            render: text => {
              let obj = [];
              for (let item of EXEC_STATUS) {
                if (`${text}` === item.key) {
                  obj = item.value;
                  break;
                }
              }
              return <Badge status={obj[1]} text={obj[0]} />;
            },
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
          },
          {
            title: '操作',
            render: (text, record) => (
              <Fragment>
                <Button type="link" onClick={_ => onOpenModal('编辑定时任务', record)}>
                  编辑
                </Button>
                <Divider type="vertical" />
                <Popconfirm title="确定删除?" onConfirm={_ => onHandle('delete', [record.jobId])}>
                  <Button type="link">删除</Button>
                </Popconfirm>
                <Divider type="vertical" />
                <Popconfirm title="确定暂停?" onConfirm={_ => onHandle('pause', [record.jobId])}>
                  <Button type="link">暂停</Button>
                </Popconfirm>
                <Divider type="vertical" />
                <Popconfirm title="确定恢复?" onConfirm={_ => onHandle('resume', [record.jobId])}>
                  <Button type="link">恢复</Button>
                </Popconfirm>
                <Divider type="vertical" />
                <Popconfirm title="确定立即执行?" onConfirm={_ => onHandle('run', [record.jobId])}>
                  <Button type="link">立即执行</Button>
                </Popconfirm>
              </Fragment>
            ),
          },
        ]}
      />
    </div>
  );
};
