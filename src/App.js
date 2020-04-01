import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import useSWR from 'swr';
import { LocaleContext } from './models/context';
import './App.less';
// import { fetch } from './services';
import RenderRoutes from './components/common/RenderRoutes';
import Loading from './components/common/loading';
import routerConfig from './config/router.config';
import { getStorage } from './utils/storage';

// const history = createBrowserHistory();

function App() {
  // const { data: demo } = useSWR('demo.getApiDemo', fetch);
  // console.log('app', demo);
  const { data } = useSWR('ws', getStorage);
  // console.log('data', data, data === undefined);
  // const [app, setApp] = useState({});
  // useEffect(_ => {
  //   const appStorage = getStorage();
  //   setApp(appStorage);
  //   console.log('e', app, appStorage);
  // });
  return (
    <LocaleContext.Provider value={{ router: routerConfig }}>
      <div className="font-size">
        <Loading active={data === undefined} />
        <BrowserRouter>
          <RenderRoutes routes={routerConfig.routes} />
        </BrowserRouter>
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
