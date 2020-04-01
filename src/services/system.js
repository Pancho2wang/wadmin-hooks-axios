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

export default sys;
