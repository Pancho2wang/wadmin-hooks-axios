import React from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import { stringify } from 'querystring';
import { Layout } from 'antd';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import Breadcrumb from '../components/common/breadcrumb';
import SiderMenu from '../components/SiderMenu';
import { getStorage } from '../utils/storage';
import { fetch } from '../services';
import { PermissionsContext } from '../models/context';

const { Content } = Layout;

export default props => {
  const {
    route: { routes },
    children,
    location: { pathname },
  } = props;
  const appStorage = getStorage();
  if (!appStorage || !appStorage.isLogin) {
    return (
      <Redirect
        to={`/login?${stringify({
          redirect: pathname,
        })}`}
      ></Redirect>
    );
  }

  const { data } = useSWR('sys.fakeAuthorityList', fetch);
  const { menuList, permissions } = data || {};
  console.log('app', data);

  return (
    <PermissionsContext.Provider value={{ permissions }}>
      <Layout style={{ minHeight: '100vh' }}>
        {SiderMenu({ routes, pathname, menuList, permissions })}
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
    </PermissionsContext.Provider>
  );
};
