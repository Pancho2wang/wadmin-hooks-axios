import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import useSWR from 'swr';
import './App.less';
// import { fetch } from './services';
import RenderRoutes from './components/common/RenderRoutes';

import routerConfig from './config/router.config';
import './models/global';

// const history = createBrowserHistory();

function App() {
  // const { data } = useSWR('ws', getStorage);
  return (
    <div className="font-size bg-color">
      <BrowserRouter>
        <RenderRoutes routes={routerConfig.routes} />
      </BrowserRouter>
    </div>
  );
}

export default App;
