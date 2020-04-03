import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import { stringify } from 'querystring';
import { Layout, Spin } from 'antd';
import { getStorage } from '../utils/storage';
import { fetch } from '../services';
import { useStore } from '../utils/store';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import Breadcrumb from '../components/common/breadcrumb';
import SiderMenu from '../components/SiderMenu';

const { Content } = Layout;

export default props => {
  const {
    route: { routes },
    children,
    location: { pathname },
  } = props;
  const appStorage = getStorage();
  const [state, dispatch] = useStore('global');
  const {
    user: { isLogin },
  } = state;
  if (!appStorage || !appStorage.isLogin) {
    return (
      <Redirect
        to={`/login?${stringify({
          redirect: pathname,
        })}`}
      ></Redirect>
    );
  } else if (!isLogin) {
    dispatch({ type: 'updateState', payload: { user: appStorage } });
  }

  const { data } = useSWR('sys.fakeAuthorityList', fetch);
  const { menuList, permissions } = data || {};
  useEffect(() => {
    dispatch({ type: 'updateState', payload: { permissions } });
  }, [permissions, dispatch]);

  return (
    <Spin tip="Loading..." spinning={!isLogin}>
      <Layout style={{ minHeight: '100vh' }}>
        {SiderMenu({ routes, pathname, menuList })}
        <Layout className="site-layout">
          <Header {...props} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb {...props} />
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Spin>
  );
};
