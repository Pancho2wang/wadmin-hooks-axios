import axios from 'axios';
import { notification, message } from 'antd';
import { stringify } from 'querystring';
import { getStorage, setStorage } from './storage';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // return config
    // if (config.data) {
    //   if (!config.data.body) {
    //     config.data = {body: {in: config.data}}
    //   }
    // }
    const appStorage = getStorage();
    window.g_dispatch({ type: 'updateState', payload: { spinning: true } });
    return { ...config, headers: { ...config.headers, token: appStorage?.token } };
  },
  function(error) {
    // 对请求错误做些什么
    window.g_dispatch({ type: 'updateState', payload: { spinning: false } });
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // console.log('response', response);
    window.g_dispatch({ type: 'updateState', payload: { spinning: false } });
    if (response.status >= 200 && response.status < 300) {
      const {
        data,
        config: { successTips },
      } = response;
      const { code, msg } = data || {};
      if (code != null && code !== 0) {
        message.error(msg);
      } else if (successTips) {
        message.success(msg);
      }
      if (code === 401) {
        const appStorage = getStorage();
        setStorage({ ...appStorage, isLogin: false }, undefined, -1);
        window.location.replace(
          `/login?${stringify({
            redirect: window.location.pathname,
          })}`,
        );
      }
      return data;
      // return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    return Promise.reject(error);
  },
  function(error) {
    // 对响应错误做点什么
    window.g_dispatch({ type: 'updateState', payload: { spinning: false } });
    return Promise.reject(error);
  },
);

export const get = axios.get;
export const post = axios.post;
export const put = axios.put;
export const all = axios.all;
export default axios;
