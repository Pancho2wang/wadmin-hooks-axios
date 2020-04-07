// import BlankLayout from '../layouts/BlankLayout';
import BackLayout from '../layouts/BackLayout';
import Index from '../pages';
import Login from '../pages/login';
import Demo from '../pages/demo';

// System
// import SystemCompany from '../pages/system/company';
import SystemRole from '../pages/system/role';
import SystemUser from '../pages/system/user';
import SystemResource from '../pages/system/resource';
import SystemSqlMonitor from '../pages/system/sqlmonitor';
import SystemJobSchedule from '../pages/system/jobschedule';
import SystemOtapa from '../pages/system/otapa';
// import SystemOss from '../pages/system/oss';
import SystemLogs from '../pages/system/logs';

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
          path: '/system',
          name: '系统管理',
          icon: 'SettingFilled',
          authority: ['sys'],
          // hideChilrenInMenu: true,
          routes: [
            // {
            //   path: '/system/company',
            //   name: '公司管理',
            //   component: SystemCompany,
            //   authority: ['sys:company:list'],
            // },
            {
              path: '/system/role',
              name: '角色管理',
              component: SystemRole,
              authority: ['sys:role:list'],
            },
            {
              path: '/system/user',
              name: '用户管理',
              component: SystemUser,
              authority: ['sys:user:list'],
            },
            {
              path: '/system/resource',
              name: '资源管理',
              component: SystemResource,
              authority: ['sys:menu:list'],
            },
            {
              path: '/system/sql-monitor',
              name: 'SQL监控',
              component: SystemSqlMonitor,
              // authority: ['sys:schedule:list'],
            },
            {
              path: '/system/job-schedule',
              name: '定时任务',
              component: SystemJobSchedule,
              authority: ['sys:schedule:list'],
            },
            {
              path: '/system/otapa',
              name: '参数管理',
              component: SystemOtapa,
              authority: ['sys:config:list'],
            },
            // {
            //   path: '/system/oss',
            //   name: '文件上传',
            //   component: SystemOss,
            //   authority: ['sys:oss:all'],
            // },
            {
              path: '/system/logs',
              name: '系统日志',
              component: SystemLogs,
              authority: ['sys:log:list'],
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
