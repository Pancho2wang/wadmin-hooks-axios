import { get, post } from '../utils/request';
import { stringify } from 'querystring';
import config from '../config';

const { apiSys } = config;
let sys = {};

//----------------登录-----------------//
/**
 * 登录 - 获取验证码图片 返回的是图片地址
 * @param {*} body = {uuid: xxxxxx}
 */
sys.getCaptchaCode = body => {
  return `${apiSys}/captcha.jpg?${stringify(body)}`;
};

/**
 * 登录 - 后台登录
 * @param {*} body
 */
sys.fakeAccountLogin = body => {
  return post(`${apiSys}/sys/login`, body, { errorTips: true });
};

/**
 * 登录 - 后台登出
 * @param {*} body
 */
sys.fakeAccountLogout = _ => {
  return post(`${apiSys}/sys/logout`);
};

/**
 * 用户 - 授权列表
 * @param {*} body
 */
sys.fakeAuthorityList = _ => {
  return get(`${apiSys}/sys/menu/nav`);
};

/**
 * 用户 - 修改密码
 * @param {*} body
 */
sys.fakeResetPassword = body => {
  return post(`${apiSys}/sys/user/password`, body);
};

//----------------系统管理 begin-----------------//
/**
 * 系统管理 - 公司管理 - 列表
 * @param {*} body
 */
sys.fakeCompanyList = body => {
  return post(`${apiSys}/company/dataGrid`, body, {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  });
};

/**
 * 系统管理 - 公司管理 - 可用公司
 * @param {*} body
 */
// sys.fakeValidCompanys() {
//   return request(`${apiSys}/company/tree`, {
//     method,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//     },
//   });
// }

/**
 * 系统管理 - 公司管理 - 根据id获取公司
 * @param {*} body
 */
// sys.getCompanyById(body) {
//   return request(`${apiSys}/company/get`, {
//     method,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//     },
//     body: stringify(body),
//   });
// }

/**
 * 系统管理 - 公司管理 - 添加
 * @param {*} body
 */
// sys.addCompany(body) {
//   return request(`${apiSys}/company/add`, {
//     method,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//     },
//     body: body,
//   });
// }

/**
 * 系统管理 - 公司管理 - 更新
 * @param {*} body
 */
// sys.updateCompany(body) {
//   return request(`${apiSys}/company/edit`, {
//     method,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//     },
//     body: body,
//   });
// }

/**
 * 系统管理 - 公司管理 - 删除
 * @param {*} body
 */
// sys.deleteCompany(body) {
//   return request(`${apiSys}/company/delete`, {
//     method,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//     },
//     body: stringify(body),
//   });
// }

/**
 * 系统管理 - 公司管理 - 资源授权
 * @param {*} body
 */
// sys.grantCompany(body) {
//   return request(`${apiSys}/company/grant`, {
//     method,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//     },
//     body: body,
//   });
// }

/**
 * 系统管理 - 角色管理 - 列表
 * @param {*} body
 */
sys.fakeRoleList = body => {
  return get(`${apiSys}/sys/role/list?${stringify(body)}`);
};

/**
 * 系统管理 - 角色管理 - 能选的角色
 * @param {*} body
 */
sys.fakeRolesSelect = () => {
  return get(`${apiSys}/sys/role/select?t=${new Date().getTime()}`);
};

/**
 * 系统管理 - 角色管理 - 根据id获取角色
 * @param {*} body
 */
sys.getRoleById = body => {
  return get(`${apiSys}/sys/role/info/${body.id}`);
};

/**
 * 系统管理 - 角色管理 - 添加
 * @param {*} body
 */
sys.addRole = body => {
  return post(`${apiSys}/sys/role/save`, body);
};

/**
 * 系统管理 - 角色管理 - 更新
 * @param {*} body
 */
sys.updateRole = body => {
  return post(`${apiSys}/sys/role/update`, body);
};

/**
 * 系统管理 - 角色管理 - 删除
 * @param {*} body
 */
sys.deleteRole = body => {
  return post(`${apiSys}/sys/role/delete`, body);
};

export default sys;
