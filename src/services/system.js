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
  return post(`${apiSys}/sys/login`, body);
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
// sys.fakeCompanyList = body => {
//   return post(`${apiSys}/company/dataGrid`, body, {
//     'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//   });
// };

/**
 * 系统管理 - 公司管理 - 可用公司
 * @param {*} body
 */
// sys.fakeValidCompanys() {
//   return get(`${apiSys}/company/tree`, {
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
// sys.getCompanyById = body => {
//   return get(`${apiSys}/company/get`, {
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
// sys.addCompany = body => {
//   return get(`${apiSys}/company/add`, {
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
// sys.updateCompany = body => {
//   return get(`${apiSys}/company/edit`, {
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
// sys.deleteCompany = body => {
//   return get(`${apiSys}/company/delete`, {
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
// sys.grantCompany = body => {
//   return get(`${apiSys}/company/grant`, {
//     method,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
//     },
//     body: body,
//   });
// }
/**
 * 系统管理 - 用户管理 - 列表
 * @param {*} body
 */
sys.fakeUserList = body => {
  return get(`${apiSys}/sys/user/list?${stringify(body)}`);
};

/**
 * 系统管理 - 用户管理 - 根据id获取用户
 * @param {*} body
 */
sys.getUserById = body => {
  return get(`${apiSys}/sys/user/info/${body.id}`);
};

/**
 * 系统管理 - 用户管理 - 添加
 * @param {*} body
 */
sys.addUser = body => {
  return post(`${apiSys}/sys/user/save`, body);
};

/**
 * 系统管理 - 用户管理 - 更新
 * @param {*} body
 */
sys.updateUser = body => {
  return post(`${apiSys}/sys/user/update`, body);
};

/**
 * 系统管理 - 用户管理 - 删除
 * @param {*} body
 */
sys.deleteUser = body => {
  return post(`${apiSys}/sys/user/delete`, body);
};

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

/**
 * 系统管理 - 资源管理 - 列表
 * @param {*} body
 */
sys.fakeResourceList = body => {
  return get(`${apiSys}/sys/menu/list`);
};

/**
 * 系统管理 - 资源管理 - 根据id获取资源
 * @param {*} body
 */
sys.getResourceById = body => {
  return get(`${apiSys}/sys/menu/info/${body.id}`);
};

/**
 * 系统管理 - 资源管理 - 添加
 * @param {*} body
 */
sys.addResource = body => {
  return post(`${apiSys}/sys/menu/save`, body);
};

/**
 * 系统管理 - 资源管理 - 更新
 * @param {*} body
 */
sys.updateResource = body => {
  return post(`${apiSys}/sys/menu/update`, body);
};

/**
 * 系统管理 - 资源管理 - 删除
 * @param {*} body
 */
sys.deleteResource = body => {
  return post(`${apiSys}/sys/menu/delete/${body.id}`, body);
};

/**
 * 系统管理 - 资源管理 - 列表(正常资源)
 * @param {*} body
 */
sys.fakeValidResources = () => {
  return get(`${apiSys}/sys/menu/select`);
};

/**
 * 系统管理 - 字典管理
 * @param {*} body
 */
/* sys.fakeDictionary = body => {
  return post(`${apiSys}/dictionary/combox?${stringify(body)}`, body);
} */

/**
 * 系统管理 - 定时任务 - 列表
 * @param {*} body
 */
sys.fakeJobScheduleList = body => {
  return get(`${apiSys}/sys/schedule/list?${stringify(body)}`);
};

/**
 * 系统管理 - 定时任务 - 根据id获取用户
 * @param {*} body
 */
sys.getJobScheduleById = body => {
  return get(`${apiSys}/sys/schedule/info/${body.id}`);
};

/**
 * 系统管理 - 定时任务 - 添加
 * @param {*} body
 */
sys.addJobSchedule = body => {
  return post(`${apiSys}/sys/schedule/save`, body);
};

/**
 * 系统管理 - 定时任务 - 更新
 * @param {*} body
 */
sys.updateJobSchedule = body => {
  return post(`${apiSys}/sys/schedule/update`, body);
};

/**
 * 系统管理 - 定时任务 - 删除
 * @param {*} body
 */
sys.deleteJobSchedule = body => {
  return post(`${apiSys}/sys/schedule/delete`, body);
};

/**
 * 系统管理 - 定时任务 - 暂停
 * @param {*} body
 */
sys.pauseJobSchedule = body => {
  return post(`${apiSys}/sys/schedule/pause`, body);
};

/**
 * 系统管理 - 定时任务 - 恢复
 * @param {*} body
 */
sys.resumeJobSchedule = body => {
  return post(`${apiSys}/sys/schedule/resume`, body);
};

/**
 * 系统管理 - 定时任务 - 执行
 * @param {*} body
 */
sys.runJobSchedule = body => {
  return post(`${apiSys}/sys/schedule/run`, body);
};

/**
 * 系统管理 - 参数管理 - 列表
 * @param {*} body
 */
sys.fakeOtapaList = body => {
  return get(`${apiSys}/sys/config/list?${stringify(body)}`);
};

/**
 * 系统管理 - 参数管理 - 根据id获取用户
 * @param {*} body
 */
sys.getOtapaById = body => {
  return get(`${apiSys}/sys/config/info/${body.id}`);
};

/**
 * 系统管理 - 参数管理 - 添加
 * @param {*} body
 */
sys.addOtapa = body => {
  return post(`${apiSys}/sys/config/save`, body);
};

/**
 * 系统管理 - 参数管理 - 更新
 * @param {*} body
 */
sys.updateOtapa = body => {
  return post(`${apiSys}/sys/config/update`, body);
};

/**
 * 系统管理 - 参数管理 - 删除
 * @param {*} body
 */
sys.deleteOtapa = body => {
  return post(`${apiSys}/sys/config/delete`, body);
};

/**
 * 系统管理 - 系统日志 - 列表
 * @param {*} body
 */
sys.fakeLogsList = body => {
  return get(`${apiSys}/sys/log/list?${stringify(body)}`);
};

/**
 * 系统管理 - 文件上传 - 列表
 * @param {*} body
 */
// sys.fakeOssList = body => {
//   return get(`${apiSys}/sys/oss/list?${stringify(body)}`);
// };

/**
 * 系统管理 - 文件上传 - 云配置
 * @param {*} body
 */
// sys.fakeOssConfig = body => {
//   return get(`${apiSys}/sys/oss/config?${stringify(body)}`);
// };

/**
 * 系统管理 - 文件上传 - 保存云配置
 * @param {*} body
 */
// sys.saveOssConfig = body => {
//   return post(`${apiSys}/sys/oss/saveConfig`, body);
// };

/**
 * 系统管理 - 文件上传 - 上传文件
 * @param {*} body
 */
// sys.uploadOss = body => {
//   return post(`${apiSys}/sys/oss/upload`, body);
// };

/**
 * 系统管理 - 文件上传 - 删除
 * @param {*} body
 */
// sys.deleteOss = body => {
//   return post(`${apiSys}/sys/oss/delete`, body);
// };

export default sys;
