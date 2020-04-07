import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider, Spin } from 'antd';
// import { createBrowserHistory } from 'history';
import './App.less';
import RenderRoutes from './components/common/RenderRoutes';
import { useStore } from './utils/store';
import routerConfig from './config/router.config';
import './models/global';

// const history = createBrowserHistory();

function App(props) {
  const [state, dispatch] = useStore('global');
  window.g_dispatch = dispatch;
  return (
    <ConfigProvider locale={zhCN}>
      <Spin tip="Loading..." spinning={state?.spinning}>
        <div className="font-size bg-color">
          <BrowserRouter>
            <RenderRoutes routes={routerConfig.routes} />
          </BrowserRouter>
        </div>
      </Spin>
    </ConfigProvider>
  );
}

export default App;
