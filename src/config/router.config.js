// import BlankLayout from '../layouts/BlankLayout';
import BackLayout from '../layouts/BackLayout';
import Index from '../pages';
import Login from '../pages/login';
import Demo from '../pages/demo';
import NotFound from '../components/exceptions/404';

export default {
  loginpath: '/login',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
    },
    {
      path: '/',
      component: BackLayout,
      // authority: ['admin'],
      routes: [
        { path: '/', redirect: '/index' },
        {
          path: '/index',
          name: '首页',
          icon: 'HomeOutlined',
          component: Index,
        },
        {
          path: '/sys',
          name: '系统管理',
          icon: 'SettingFilled',
          authority: ['sys'],
          // hideChilrenInMenu: true,
          routes: [
            {
              path: '/sys/role',
              name: '角色管理',
              authority: ['sys:role:list'],
              component: Demo,
            },
            {
              path: '/sys/user',
              name: '用户管理',
              // authority: ['sys:user'],
              component: Index,
            },
            {
              path: '/sys/resource',
              name: '资源管理',
              authority: ['sys:resource'],
              // hideInMenu: true,
              component: Demo,
            },
            {
              component: NotFound,
            },
          ],
        },
        {
          path: '/demo',
          name: 'Demo',
          icon: 'UserOutlined',
          component: Demo,
        },
        {
          component: NotFound,
        },
      ],
    },
    {
      component: NotFound,
    },
  ],
};
