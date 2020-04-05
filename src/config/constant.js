export const PAGINATION = {
  current: 1,
  pageSize: 20,
  total: 0,
  showTotal: total => `总共${total}条`,
};

export const EXEC_STATUS = [
  { key: '0', value: ['正常', 'success'] },
  { key: '1', value: ['暂停', 'warning'] },
];
export const STATUS = [
  { key: '1', value: ['正常', 'success'] },
  { key: '0', value: ['禁用', 'error'] },
];
export const RESOURCE_TYPE = [
  { key: '0', value: '目录' },
  { key: '1', value: '菜单' },
  { key: '2', value: '按钮' },
];
export const USER_TYPE = [
  { key: '0', value: '普通用户' },
  { key: '1', value: '管理员' },
];

export const CHART_COLOR = [
  '#8478FF',
  '#5FADFF',
  '#7724C4',
  '#17D9B9',
  '#FBCA34',
  '#FF8436',
  '#D82F2F',
  '#E329F4',
  '#1dc1ff',
  '#2e70e8',
  '#f18084',
  '#c96dd8',
  '#f0d95b',
  '#69c130',
  '#f04f70',
  '#38b3eb',
  '#f3833a',
  '#6e4afc',
  '#0db6d1',
  '#18d89e',
  '#f5c79f',
  '#8b80f3',
  '#f9fa85',
  '#b4ed50',
  '#fc80a4',
  '#88e9fa',
  '#f7a435',
  '#7a8afb',
];
